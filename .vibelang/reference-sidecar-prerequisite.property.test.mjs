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
  readFileSync(
    new URL("./corpus/alchemy-reference-sidecar-prerequisite.json", import.meta.url),
    "utf8",
  ),
);
const temp = mkdtempSync(join(tmpdir(), "alchemy-reference-prerequisite-"));
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
const Effect = await import(pathToFileURL(require.resolve("effect/Effect")).href);
const NodeServices = await import(
  pathToFileURL(require.resolve("@effect/platform-node/NodeServices")).href
);
const run = (program) => Effect.runPromise(Effect.provide(program, NodeServices.layer));
let serial = 0;
async function fixture(names, flat) {
  const directory = join(temp, "missing-" + serial++);
  for (const name of names) {
    mkdirSync(dirname(join(directory, "src", name)), { recursive: true });
    writeFileSync(join(directory, "src", name + ".vibe"), "export const value = 1\n");
  }
  const root = {
    srcRoot: "src",
    providerPrefix: flat ? "Provider" : "",
    sourceDisplayPrefix: "src",
  };
  const source = () => run(discoverFiles(directory, root));
  await assert.rejects(source, /Missing API declaration for .*\.vibe.*pnpm sidecars/);
  for (const name of names)
    writeFileSync(
      join(directory, "src", name + ".d.vibe.ts"),
      "/** @resource */\nexport declare const value: number;\n",
    );
  const found = await source();
  assert.equal(found.length, names.length);
  assert.deepEqual(
    found.map((entry) => entry.sourceDisplay).sort(),
    names.map((name) => "src/" + name + ".vibe").sort(),
  );
}
void test("reference discovery reports a missing native declaration before it can remove a public page", async () => {
  await fixture(corpus.flat, true);
  await fixture(corpus.nested, false);
});
void test("native declarations are required across flat and nested reference layouts", async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.array(fc.constantFrom(...corpus.names), { minLength: 1, maxLength: 12 }),
      fc.boolean(),
      async (names, flat) =>
        fixture(
          names.map((name, index) => "Group" + (index % 3) + "/" + name + index),
          flat,
        ),
    ),
    { seed: corpus.seed, numRuns: 64 },
  );
});
