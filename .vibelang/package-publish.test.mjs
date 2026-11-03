import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
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
  readFileSync(
    new URL("./corpus/alchemy-published-source-conditions.json", import.meta.url),
    "utf8",
  ),
);
const temp = mkdtempSync(join(tmpdir(), "alchemy-publish-"));
after(() => rmSync(temp, { recursive: true, force: true }));
symlinkSync(join(root, "scripts/node_modules"), join(temp, "node_modules"), "dir");
const source = readFileSync(join(root, "scripts/package-build.ts"), "utf8");
writeFileSync(
  join(temp, "package-build.mjs"),
  stripTypeScriptTypes(source) + "\nexport { syncPublishExports };\n",
);
const { syncPublishExports } = await import(pathToFileURL(join(temp, "package-build.mjs")).href);
const Effect = await import(pathToFileURL(require.resolve("effect/Effect")).href);
const NodeServices = await import(
  pathToFileURL(require.resolve("@effect/platform-node/NodeServices")).href
);
let fixtureId = 0;
async function publish(files) {
  const dir = join(temp, "fixture-" + fixtureId++);
  mkdirSync(join(dir, "src"), { recursive: true });
  for (const file of ["index.ts", ...files]) {
    const target = join(dir, "src", file);
    mkdirSync(join(target, ".."), { recursive: true });
    writeFileSync(target, file === "index.ts" ? corpus.barrel : "export const value: number = 1;");
  }
  writeFileSync(
    join(dir, "tsconfig.json"),
    JSON.stringify({ compilerOptions: { outDir: "./lib" } }),
  );
  writeFileSync(
    join(dir, "package.json"),
    JSON.stringify({ name: "fixture", exports: {}, publishConfig: {} }),
  );
  await Effect.runPromise(
    Effect.provide(syncPublishExports(dir, { generate: true, worker: true }), NodeServices.layer),
  );
  return JSON.parse(readFileSync(join(dir, "package.json"), "utf8"));
}
function compiled(manifest) {
  for (const [key, entry] of Object.entries(manifest.publishConfig.exports))
    if (entry && typeof entry === "object" && !key.endsWith("package.json")) {
      assert.equal(entry.bun, undefined, key);
      assert.equal(entry.worker, undefined, key);
      assert.ok(entry.default.startsWith("./lib/"), key);
    }
}
void test("TypeScript-only packages retain source conditions", async () => {
  const manifest = await publish(["value.ts"]);
  assert.equal(manifest.publishConfig.exports["."].bun, "./src/index.ts");
  assert.equal(manifest.publishConfig.exports["."].worker, "./src/index.ts");
});
void test("a TypeScript barrel over a migrated module publishes compiled runtime entries", async () => {
  compiled(await publish(["value.vibe"]));
});
void test("migrated internal files do not outrank the internal wildcard block", async () => {
  const manifest = await publish(corpus.files);
  assert.equal(manifest.exports["./Feature/internal"], "./src/Feature/internal.vibe");
  assert.equal(manifest.publishConfig.exports["./Feature/internal"], undefined);
  assert.equal(manifest.publishConfig.exports["./*/internal"], null);
});
void test("source conditions follow package contents across nested migration layouts", async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.array(fc.record({ migrated: fc.boolean(), nested: fc.boolean() }), {
        minLength: 1,
        maxLength: 10,
      }),
      async (entries) => {
        const files = entries.map(
          (entry, i) =>
            (entry.nested ? "Feature/" : "") + "Value" + i + (entry.migrated ? ".vibe" : ".ts"),
        );
        const manifest = await publish(files);
        if (entries.some((entry) => entry.migrated)) compiled(manifest);
        else assert.equal(manifest.publishConfig.exports["."].bun, "./src/index.ts");
      },
    ),
    { seed: 561108, numRuns: 40 },
  );
});
