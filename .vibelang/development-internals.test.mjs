import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
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
  readFileSync(new URL("./corpus/alchemy-development-internals.json", import.meta.url), "utf8"),
);
const temp = mkdtempSync(join(tmpdir(), "alchemy-dev-internals-"));
after(() => rmSync(temp, { recursive: true, force: true }));
symlinkSync(join(root, "scripts/node_modules"), join(temp, "node_modules"), "dir");
writeFileSync(
  join(temp, "builder.mjs"),
  stripTypeScriptTypes(readFileSync(join(root, "scripts/package-build.ts"), "utf8")) +
    "\nexport { syncPublishExports };\n",
);
const { syncPublishExports } = await import(pathToFileURL(join(temp, "builder.mjs")).href);
const Effect = await import(pathToFileURL(require.resolve("effect/Effect")).href);
const NodeServices = await import(
  pathToFileURL(require.resolve("@effect/platform-node/NodeServices")).href
);
let serial = 0;
async function resolves({ prefix = "Service/", bun = false, kind = "file" }) {
  const project = join(temp, "fixture-" + serial++);
  mkdirSync(join(project, "src", prefix), { recursive: true });
  mkdirSync(join(project, "lib", prefix), { recursive: true });
  const privateStem = prefix + (kind === "directory" ? "internal/Helper" : "internal");
  assert.equal(corpus.file, "internal.vibe");
  const sourcePrivate = "src/" + privateStem + ".vibe";
  mkdirSync(join(project, "src", prefix, "internal"), { recursive: true });
  const sourcePublic = "src/" + prefix + "Public.ts";
  for (const file of [
    "src/index.ts",
    sourcePrivate,
    sourcePrivate.replace(".vibe", ".d.vibe.ts"),
    sourcePublic,
    "lib/" + prefix + "Public.js",
  ])
    writeFileSync(join(project, file), "");
  writeFileSync(
    join(project, "tsconfig.json"),
    JSON.stringify({ compilerOptions: { outDir: "./lib" } }),
  );
  writeFileSync(
    join(project, "package.json"),
    JSON.stringify({ name: "fixture", type: "module", exports: {} }),
  );
  await Effect.runPromise(
    Effect.provide(
      syncPublishExports(project, { generate: true, worker: true }),
      NodeServices.layer,
    ),
  );
  const manifest = JSON.parse(readFileSync(join(project, "package.json"), "utf8"));
  for (const published of [false, true]) {
    writeFileSync(
      join(project, "package.json"),
      JSON.stringify({
        ...manifest,
        exports: published ? manifest.publishConfig.exports : manifest.exports,
      }),
    );
    const probe = join(project, "probe.mjs");
    const publicSpec = "fixture/" + prefix + "Public",
      privateSpec = "fixture/" + privateStem;
    writeFileSync(
      probe,
      "const result = { public: import.meta.resolve(" +
        JSON.stringify(publicSpec) +
        ") };\n" +
        "try { result.private = import.meta.resolve(" +
        JSON.stringify(privateSpec) +
        "); } catch (error) { result.error = error.code; }\n" +
        "console.log(JSON.stringify(result));",
    );
    const result = spawnSync(bun ? "bun" : process.execPath, [probe], {
      cwd: project,
      encoding: "utf8",
    });
    assert.equal(result.status, 0, result.stderr);
    const actual = JSON.parse(result.stdout);
    assert.equal(
      fileURLToPath(actual.public),
      join(project, published ? "lib/" + prefix + "Public.js" : sourcePublic),
    );
    if (published) {
      assert.equal(actual.private, undefined, privateSpec + " must not be published");
      assert.ok(actual.error);
    } else
      assert.equal(
        fileURLToPath(actual.private),
        join(project, sourcePrivate),
        privateSpec + " stays available to development tests",
      );
  }
}
void test("development tests resolve migrated internals while published consumers cannot", () =>
  resolves({}));
void test("root internals obey the same source/published split under Bun", () =>
  resolves({ prefix: "", bun: true }));
void test("source access and published privacy survive nesting and runtime changes", async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.record({
        prefix: fc.constantFrom("", "Service/", "Area/Service/", "Space service/"),
        kind: fc.constantFrom("file", "directory"),
        bun: fc.boolean(),
      }),
      resolves,
    ),
    { seed: 561113, numRuns: 40 },
  );
});

void test("members inside private directories remain source-accessible without being published", () =>
  resolves({ kind: "directory" }));
void test("hand-authored null blocks survive non-generated export maps", async () => {
  const project = join(temp, "manual-" + serial++);
  mkdirSync(join(project, "src"), { recursive: true });
  writeFileSync(join(project, "src/index.ts"), "");
  writeFileSync(
    join(project, "tsconfig.json"),
    JSON.stringify({ compilerOptions: { outDir: "./lib" } }),
  );
  writeFileSync(
    join(project, "package.json"),
    JSON.stringify({
      name: "fixture",
      exports: {
        ".": "./src/index.ts",
        "./internal": null,
        "./internal/*": null,
        "./*": "./src/*.ts",
      },
    }),
  );
  await Effect.runPromise(
    Effect.provide(syncPublishExports(project, { generate: false }), NodeServices.layer),
  );
  const manifest = JSON.parse(readFileSync(join(project, "package.json"), "utf8"));
  assert.equal(manifest.publishConfig.exports["./internal"], null);
  assert.equal(manifest.publishConfig.exports["./internal/*"], null);
});
