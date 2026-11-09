import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { createRequire, stripTypeScriptTypes } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { after, test } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const sourceRoot = process.env.ALCHEMY_DOC_TOOLS_SOURCE_ROOT ?? root;
const require = createRequire(new URL("../scripts/package-build.ts", import.meta.url));
const testRequire = createRequire(
  new URL("../packages/alchemy-test/package.json", import.meta.url),
);
const fc = createRequire(testRequire.resolve("@effect/vitest"))("fast-check");
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-doc-source-selection.json", import.meta.url), "utf8"),
);
const temp = mkdtempSync(join(tmpdir(), "alchemy-doc-source-selection-"));
after(() => rmSync(temp, { recursive: true, force: true }));
symlinkSync(join(root, "scripts/node_modules"), join(temp, "node_modules"), "dir");
const imports = [
  'import * as Effect from "effect/Effect";',
  'import * as FileSystem from "effect/FileSystem";',
  'import * as Path from "effect/Path";',
].join("\n");
function load(name, start, end, exports) {
  const source = readFileSync(join(sourceRoot, "scripts", name + ".ts"), "utf8");
  const begin = source.indexOf(start),
    finish = source.indexOf(end, begin);
  assert.ok(begin >= 0 && finish > begin, name);
  const path = join(temp, name + ".mjs");
  writeFileSync(
    path,
    imports +
      "\n" +
      stripTypeScriptTypes(source.slice(begin, finish)) +
      "\nexport { " +
      exports +
      " };\n",
  );
  return import(pathToFileURL(path).href);
}
const { discoverFiles } = await load(
  "generate-api-reference",
  "const normalizeSlashes",
  "function getJsDocText",
  "discoverFiles",
);
const { sourceFiles } = await load(
  "fix-api-jsdocs",
  "const sourceFiles =",
  "const command =",
  "sourceFiles",
);
const Effect = await import(pathToFileURL(require.resolve("effect/Effect")).href);
const NodeServices = await import(
  pathToFileURL(require.resolve("@effect/platform-node/NodeServices")).href
);
const run = (program) => Effect.runPromise(Effect.provide(program, NodeServices.layer));
let serial = 0;
async function fixture(modules, flat) {
  const project = join(temp, "fixture-" + serial++),
    src = join(project, "src");
  mkdirSync(src, { recursive: true });
  const docs = [],
    authored = [];
  for (const { name, state } of modules) {
    const stem = "src/" + name;
    mkdirSync(dirname(join(project, stem)), { recursive: true });
    writeFileSync(
      join(project, stem + ".d.vibe.ts"),
      "/** @resource\n * @section Generated metadata\n */\nexport declare const value: number;\n",
    );
    if (state === "native") {
      writeFileSync(join(project, stem + ".vibe"), "export const value = 1;\n");
      docs.push(name + ".d.vibe.ts");
      authored.push(join(project, stem + ".vibe"));
    } else if (state === "restored") {
      writeFileSync(join(project, stem + ".ts"), "export const value = 1;\n");
      docs.push(name + ".ts");
      authored.push(join(project, stem + ".ts"));
    }
    writeFileSync(join(project, stem + ".d.ts"), "export declare const value: number;\n");
  }
  const discovered = await run(
    discoverFiles(project, {
      srcRoot: "src",
      providerPrefix: flat ? "Provider" : "",
      sourceDisplayPrefix: "src",
    }),
  );
  const prefix = flat ? "Provider/" : "";
  assert.deepEqual(
    discovered.map((entry) => entry.relativePath).sort(),
    docs.map((name) => prefix + name).sort(),
  );
  assert.equal(new Set(discovered.map((entry) => entry.sourceDisplay)).size, docs.length);
  assert.deepEqual((await run(sourceFiles(src))).sort(), authored.sort());
}
void test("restored modules do not duplicate reference anchors and generated declarations are never JSDoc inputs", async () => {
  await fixture(corpus.modules, true);
  await fixture(corpus.modules, false);
});
void test("mixed native, restored and orphan layouts preserve exactly the authored documentation inputs", async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.array(fc.constantFrom("native", "restored", "orphan"), { minLength: 1, maxLength: 16 }),
      fc.boolean(),
      async (states, flat) =>
        fixture(
          states.map((state, index) => ({ name: "Group" + (index % 3) + "/Entry" + index, state })),
          flat,
        ),
    ),
    { seed: 187302, numRuns: 64 },
  );
});
