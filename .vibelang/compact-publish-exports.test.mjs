import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { createRequire, stripTypeScriptTypes } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, test } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(new URL("../scripts/package-build.ts", import.meta.url));
const testRequire = createRequire(
  new URL("../packages/alchemy-test/package.json", import.meta.url),
);
const fc = createRequire(testRequire.resolve("@effect/vitest"))("fast-check");
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-redundant-publish-exports.json", import.meta.url), "utf8"),
);
const temp = mkdtempSync(join(tmpdir(), "alchemy-compact-exports-"));
after(() => rmSync(temp, { recursive: true, force: true }));
symlinkSync(join(root, "scripts/node_modules"), join(temp, "node_modules"), "dir");
const builderSource = stripTypeScriptTypes(
  readFileSync(
    process.env.ALCHEMY_PACKAGE_BUILD_SOURCE ?? join(root, "scripts/package-build.ts"),
    "utf8",
  ),
);
writeFileSync(
  join(temp, "package-build.mjs"),
  builderSource + "\nexport { syncPublishExports };\n",
);
writeFileSync(
  join(temp, "reference-build.mjs"),
  builderSource.replace("compactPublishExports(published)", "published") +
    "\nexport { syncPublishExports };\n",
);
const { syncPublishExports } = await import(pathToFileURL(join(temp, "package-build.mjs")).href);
const { syncPublishExports: referencePublish } = await import(
  pathToFileURL(join(temp, "reference-build.mjs")).href
);
const Effect = await import(pathToFileURL(require.resolve("effect/Effect")).href);
const NodeServices = await import(
  pathToFileURL(require.resolve("@effect/platform-node/NodeServices")).href
);
let fixtureId = 0;
async function publish(exports, reference = false) {
  const dir = join(temp, "fixture-" + fixtureId++);
  mkdirSync(dir);
  writeFileSync(
    join(dir, "tsconfig.json"),
    JSON.stringify({ compilerOptions: { outDir: "./lib" } }),
  );
  writeFileSync(join(dir, "package.json"), JSON.stringify({ name: "fixture", exports }));
  await Effect.runPromise(
    Effect.provide(
      (reference ? referencePublish : syncPublishExports)(dir, {}),
      NodeServices.layer,
    ),
  );
  return JSON.parse(readFileSync(join(dir, "package.json"), "utf8")).publishConfig.exports;
}

void test("a large equivalent exact map collapses to its wildcard", async () => {
  const entries = Object.fromEntries(
    Array.from({ length: corpus.largeMapEntries }, (_, i) => [
      "./Service" + i,
      "./src/Service" + i + ".ts",
    ]),
  );
  const map = await publish({ ".": "./src/index.ts", ...entries, "./*": "./src/*.ts" });
  assert.deepEqual(Object.keys(map), [".", "./*"]);
});

void test("aliases and null blocks retain their exact resolution", async () => {
  const map = await publish({
    "./Alias": "./src/Actual.ts",
    "./Secret": null,
    "./*": "./src/*.ts",
  });
  assert.equal(map["./Alias"].default, "./lib/Actual.js");
  assert.equal(map["./Secret"], null);
});

void test("the most specific wildcard decides whether an exact entry is redundant", async () => {
  const map = await publish({
    "./Scoped/Value": "./src/Scoped/Value.ts",
    "./Scoped/*": null,
    "./*": "./src/*.ts",
  });
  assert.equal(map["./Scoped/Value"].default, "./lib/Scoped/Value.js");
  assert.equal(map["./Scoped/*"], null);
});

void test("a different Bun condition keeps an otherwise matching compiled entry", async () => {
  const map = await publish({ "./Value": "./src/Value.vibe", "./*": "./src/*.ts" });
  assert.equal(map["./Value"].default, "./lib/Value.js");
  assert.equal(map["./Value"].bun, undefined);
  assert.equal(map["./*"].bun, "./src/*.ts");
});

async function compareResolvers(before, after, entries) {
  const dir = join(temp, "resolvers-" + fixtureId++);
  mkdirSync(dir);
  for (const [, source] of entries) {
    for (const target of [
      source,
      source.replace("./src/", "./lib/").replace(/\\.(ts|vibe)$/, ".js"),
      source.replace("./src/", "./lib/").replace(/\\.(ts|vibe)$/, ".d.ts"),
    ]) {
      const path = join(dir, target);
      mkdirSync(join(path, ".."), { recursive: true });
      writeFileSync(path, "export {};\n");
    }
  }
  const resolver = join(dir, "resolve.mjs");
  writeFileSync(
    resolver,
    'console.log(JSON.stringify(JSON.parse(process.argv[2]).map(s => { try { return ["ok", import.meta.resolve("compact-fixture/" + s.slice(2))]; } catch(e) { return ["error", e.code]; } })))',
  );
  const specs = JSON.stringify(entries.map(([key]) => key));
  for (const args of [["node"], ["node", "--conditions=types"], ["bun"]]) {
    const values = [];
    for (const exports of [before, after]) {
      writeFileSync(
        join(dir, "package.json"),
        JSON.stringify({ name: "compact-fixture", type: "module", exports }),
      );
      const result = spawnSync(args[0], [...args.slice(1), resolver, specs], {
        cwd: dir,
        encoding: "utf8",
        timeout: 10000,
      });
      assert.equal(result.status, 0, result.stderr);
      values.push(JSON.parse(result.stdout));
    }
    assert.deepEqual(values[1], values[0], args.join(" "));
  }
}

void test("Node, Bun and type resolution survive generated exact-map compaction", async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.array(
        fc.record({
          nested: fc.boolean(),
          migrated: fc.boolean(),
          name: fc.constantFrom("Value", "space name", "quote'name", "café", "dotted.name"),
        }),
        { minLength: 1, maxLength: 12 },
      ),
      fc.boolean(),
      fc.boolean(),
      async (files, migratedWildcard, blocked) => {
        const extension = migratedWildcard ? ".vibe" : ".ts";
        const entries = files.map((file, index) => {
          const stem = (file.nested ? "Nested/" : "") + file.name + index;
          return ["./" + stem, "./src/" + stem + (file.migrated ? ".vibe" : ".ts")];
        });
        const raw = {
          ...Object.fromEntries(entries),
          ...(blocked ? { "./Nested/*": null } : {}),
          "./*": "./src/*" + extension,
        };
        const before = await publish(raw, true);
        const after = await publish(raw);
        files.forEach((file, index) =>
          assert.equal(
            Object.hasOwn(after, entries[index][0]),
            (blocked && file.nested) || file.migrated !== migratedWildcard,
          ),
        );
        await compareResolvers(before, after, entries);
      },
    ),
    { seed: corpus.seed, numRuns: 40 },
  );
});
