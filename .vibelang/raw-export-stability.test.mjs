import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { createRequire, stripTypeScriptTypes } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { after, test } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(new URL("../scripts/package-build.ts", import.meta.url));
const testRequire = createRequire(
  new URL("../packages/alchemy-test/package.json", import.meta.url),
);
const fc = createRequire(testRequire.resolve("@effect/vitest"))("fast-check");
const temporary = mkdtempSync(join(tmpdir(), "alchemy-raw-export-stability-"));
after(() => rmSync(temporary, { recursive: true, force: true }));
symlinkSync(join(root, "scripts/node_modules"), join(temporary, "node_modules"), "dir");
const source = stripTypeScriptTypes(
  readFileSync(
    process.env.ALCHEMY_PACKAGE_BUILD_SOURCE ?? join(root, "scripts/package-build.ts"),
    "utf8",
  ),
);
writeFileSync(join(temporary, "package-build.mjs"), source + "\nexport { syncPublishExports };\n");
const { syncPublishExports } = await import(
  pathToFileURL(join(temporary, "package-build.mjs")).href
);
const Effect = await import(pathToFileURL(require.resolve("effect/Effect")).href);
const NodeServices = await import(
  pathToFileURL(require.resolve("@effect/platform-node/NodeServices")).href
);

const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-native-raw-exports.json", import.meta.url), "utf8"),
);
let nextFixture = 0;
function put(directory, name, text) {
  const file = join(directory, name);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, text);
}
function fixture(stems = ["Native"], existingRaw = false, rawValue = null) {
  const directory = join(temporary, "fixture-" + nextFixture++);
  mkdirSync(directory);
  put(directory, "src/index.ts", "export {};\n");
  put(directory, "src/Held.ts", "export const value = 1;\n");
  for (const name of ["index", "Held", ...stems]) {
    put(directory, "lib/" + name + ".js", "export {};\n");
    put(directory, "lib/" + name + ".d.ts", "export {};\n");
  }
  put(directory, "asset.js", "export {};\n");
  for (const stem of stems) put(directory, "src/" + stem + ".vibe", "export const value = 1\n");
  put(directory, "tsconfig.json", JSON.stringify({ compilerOptions: { outDir: "./lib" } }));
  put(
    directory,
    "package.json",
    JSON.stringify({
      name: "raw-export-fixture",
      exports: {
        ".": "./src/index.ts",
        "./Alias": "./src/Held.ts",
        ...(existingRaw ? { "./*.vibe.raw": rawValue } : {}),
        "./*": "./src/*.ts",
        "./Hidden/*": null,
      },
    }),
  );
  return directory;
}
async function sync(directory, generate = true) {
  await Effect.runPromise(
    Effect.provide(syncPublishExports(directory, { generate }), NodeServices.layer),
  );
  return readFileSync(join(directory, "package.json"), "utf8");
}
void test("native export generation preserves package bytes after its first write", async () => {
  const directory = fixture();
  const first = await sync(directory);
  assert.equal(
    await sync(directory),
    first,
    "a second generation must preserve bytes, including key order",
  );
  assert.equal(
    await sync(directory),
    first,
    "later build and export-only generations share the fixed point",
  );
});
void test("wildcard privacy blocks keep stable bytes in generated and retained export maps", async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.shuffledSubarray(corpus.stems, { minLength: 1, maxLength: 3 }),
      fc.boolean(),
      fc.constantFrom(null, "./asset.js"),
      fc.boolean(),
      async (stems, existingRaw, rawValue, generate) => {
        const directory = fixture(stems, existingRaw, rawValue);
        const first = await sync(directory, generate);
        const manifest = JSON.parse(first);
        const keys = Object.keys(manifest.exports);
        for (const key of keys.filter((key) => key.endsWith("*")))
          assert.equal(
            keys.indexOf(key + ".vibe.raw") + 1,
            keys.indexOf(key),
            "raw blocks stand immediately before their wildcard",
          );
        assert.equal(manifest.exports["./*.vibe.raw"], existingRaw && !generate ? rawValue : null);
        assert.equal(manifest.exports["./Hidden/*"], null);
        assert.equal(manifest.exports["./Alias"], "./src/Held.ts");
        assert.equal(await sync(directory, generate), first);
        assert.equal(await sync(directory, generate), first);
      },
    ),
    { seed: corpus.seed, numRuns: 128 },
  );
});
function resolveEntries(directory, exports, conditions) {
  const manifest = JSON.parse(readFileSync(join(directory, "package.json"), "utf8"));
  writeFileSync(join(directory, "package.json"), JSON.stringify({ ...manifest, exports }));
  put(
    directory,
    "resolve.mjs",
    'console.log(JSON.stringify(["raw-export-fixture/Native","raw-export-fixture/Alias","raw-export-fixture/Native.vibe.raw","raw-export-fixture/Hidden/Nope"].map(name=>{try{return ["ok",import.meta.resolve(name)]}catch(error){return ["error",error.code]}})))',
  );
  const result = spawnSync(process.execPath, [...conditions, join(directory, "resolve.mjs")], {
    encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}
void test("privacy-block placement preserves source and published Node resolution", async () => {
  const directory = fixture();
  const before = JSON.parse(await sync(directory));
  const after = JSON.parse(await sync(directory));
  for (const section of ["source", "published"]) {
    const left = section === "source" ? before.exports : before.publishConfig.exports;
    const right = section === "source" ? after.exports : after.publishConfig.exports;
    for (const conditions of [[], ["--conditions=types"]]) {
      const resolved = resolveEntries(directory, left, conditions);
      assert.deepEqual(resolveEntries(directory, right, conditions), resolved);
      assert.equal(resolved[0][0], "ok");
      assert.equal(resolved[2][1], "ERR_PACKAGE_PATH_NOT_EXPORTED");
      assert.equal(resolved[3][1], "ERR_PACKAGE_PATH_NOT_EXPORTED");
    }
  }
});
