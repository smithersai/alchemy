import assert from "node:assert/strict";
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
const temporary = mkdtempSync(join(tmpdir(), "alchemy-preserved-exports-"));
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
let nextFixture = 0;

async function publish(entries, names = ["Held"]) {
  const directory = join(temporary, "fixture-" + nextFixture++);
  mkdirSync(join(directory, "src"), { recursive: true });
  writeFileSync(join(directory, "src/index.ts"), "export {};\n");
  writeFileSync(join(directory, "src/Native.vibe"), "export const value = 1\n");
  for (const name of names)
    writeFileSync(join(directory, "src", name + ".ts"), "export const value = 1;\n");
  writeFileSync(
    join(directory, "package.json"),
    JSON.stringify({ name: "fixture", exports: entries }),
  );
  writeFileSync(
    join(directory, "tsconfig.json"),
    JSON.stringify({ compilerOptions: { outDir: "./lib" } }),
  );
  await Effect.runPromise(
    Effect.provide(syncPublishExports(directory, { generate: true }), NodeServices.layer),
  );
  const first = JSON.parse(readFileSync(join(directory, "package.json"), "utf8"));
  await Effect.runPromise(
    Effect.provide(syncPublishExports(directory, { generate: true }), NodeServices.layer),
  );
  assert.deepEqual(JSON.parse(readFileSync(join(directory, "package.json"), "utf8")), first);
  return first;
}

void test("generated exports retain live TypeScript entries and aliases", async () => {
  const manifest = await publish({
    ".": "./src/index.ts",
    "./Held": "./src/Held.ts",
    "./Alias": "./src/Held.ts",
    "./*": "./src/*.ts",
  });
  assert.equal(manifest.exports["./Held"], "./src/Held.ts");
  assert.equal(manifest.exports["./Alias"], "./src/Held.ts");
  assert.equal(manifest.publishConfig.exports["./Alias"].default, "./lib/Held.js");
});

void test("generated exports retain private source blocks", async () => {
  const manifest = await publish({
    "./Held": "./src/Held.ts",
    "./Held.ts.platform": null,
    "./Private/*": null,
    "./*": "./src/*.ts",
  });
  assert.equal(manifest.exports["./Held.ts.platform"], null);
  assert.equal(manifest.exports["./Private/*"], null);
  assert.equal(manifest.publishConfig.exports["./Held.ts.platform"], null);
  assert.equal(manifest.publishConfig.exports["./Private/*"], null);
});

void test("native source generation replaces old TypeScript routes and drops absent aliases", async () => {
  const manifest = await publish({
    "./Native": "./src/Native.ts",
    "./Deleted": "./src/Deleted.ts",
    "./*": "./src/*.ts",
  });
  assert.equal(manifest.exports["./Native"], "./src/Native.vibe");
  assert.equal(Object.hasOwn(manifest.exports, "./Deleted"), false);
});

void test("mixed source exports preserve TypeScript boundaries and private blocks across regeneration", async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.shuffledSubarray(
        ["Held", "ScheduleEventSource", "Compile", "Source Boundary", "Δelta", "日本語"],
        {
          minLength: 1,
          maxLength: 4,
        },
      ),
      async (names) => {
        const retained = Object.fromEntries(
          names.flatMap((name) => [
            ["./" + name, "./src/" + name + ".ts"],
            ["./" + name + ".ts.platform", null],
          ]),
        );
        const manifest = await publish({ ...retained, "./*": "./src/*.ts" }, names);
        for (const [key, target] of Object.entries(retained))
          assert.equal(manifest.exports[key], target, key);
        for (const name of names)
          assert.equal(manifest.publishConfig.exports["./" + name + ".ts.platform"], null);
        assert.equal(manifest.exports["./Native"], "./src/Native.vibe");
      },
    ),
    { seed: 20261107, numRuns: 64 },
  );
});
