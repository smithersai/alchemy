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
  readFileSync(new URL("./corpus/alchemy-source-only-sidecars.json", import.meta.url), "utf8"),
);
const temp = mkdtempSync(join(tmpdir(), "alchemy-source-only-"));
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
async function resolves({ nested = false, stem = "Entry", bun = false }) {
  const project = join(temp, "fixture-" + serial++);
  const prefix = "Bootstrap/" + (nested ? "Nested/" : "");
  mkdirSync(join(project, "src", prefix), { recursive: true });
  const sidecar = "src/" + prefix + stem + ".d.vibe.ts";
  const control = "src/" + prefix + "Control.ts";
  for (const file of ["src/index.ts", "src/" + prefix + stem + ".vibe", sidecar, control])
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
      syncPublishExports(project, {
        generate: true,
        worker: true,
        sourceOnly: [corpus.sourceOnly],
      }),
      NodeServices.layer,
    ),
  );
  const manifest = JSON.parse(readFileSync(join(project, "package.json"), "utf8"));
  writeFileSync(
    join(project, "package.json"),
    JSON.stringify({ ...manifest, exports: manifest.publishConfig.exports }),
  );
  const probe = join(project, "probe.mjs");
  const controlSpec = "fixture/" + prefix + "Control",
    sidecarSpec = "fixture/" + prefix + stem + ".d.vibe";
  writeFileSync(
    probe,
    "const result = { control: import.meta.resolve(" +
      JSON.stringify(controlSpec) +
      ") };\n" +
      "try { result.sidecar = import.meta.resolve(" +
      JSON.stringify(sidecarSpec) +
      "); } catch (error) { result.error = error.code; }\n" +
      "console.log(JSON.stringify(result));",
  );
  const result = spawnSync(bun ? "bun" : process.execPath, [probe], {
    cwd: project,
    encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stderr);
  const actual = JSON.parse(result.stdout);
  assert.equal(actual.control, pathToFileURL(join(project, control)).href);
  assert.equal(actual.sidecar, undefined, sidecarSpec + " must be private");
  assert.ok(actual.error, "a generated sidecar must be rejected by the runtime resolver");
}
void test("source-only wildcard excludes a generated sidecar under Node", () => resolves({}));
void test("the same private wildcard holds under Bun and for nested source paths", () =>
  resolves({ nested: true, bun: true }));
void test("reserved declaration suffixes stay private across source names and runtimes", async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.record({
        nested: fc.boolean(),
        bun: fc.boolean(),
        stem: fc.constantFrom("Entry", "Handler", "source with spaces", "unicode λ"),
      }),
      resolves,
    ),
    { seed: 561111, numRuns: 40 },
  );
});
