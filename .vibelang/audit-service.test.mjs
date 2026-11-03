import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync, mkdirSync } from "node:fs";
import { createRequire, stripTypeScriptTypes } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, test } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const testRequire = createRequire(
  new URL("../packages/alchemy-test/package.json", import.meta.url),
);
const fc = createRequire(testRequire.resolve("@effect/vitest"))("fast-check");
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-audit-service.json", import.meta.url), "utf8"),
);
const temp = mkdtempSync(join(tmpdir(), "alchemy-audit-"));
after(() => rmSync(temp, { recursive: true, force: true }));
symlinkSync(join(root, "scripts/node_modules"), join(temp, "node_modules"), "dir");
// Load the real script helpers, leaving the CLI entry point out of this test process.
const script = readFileSync(join(root, "scripts/audit-service.ts"), "utf8");
const boundary = script.indexOf("// ============ CLI ============");
assert.ok(boundary > 0);
writeFileSync(
  join(temp, "audit.mjs"),
  stripTypeScriptTypes(script.slice(0, boundary)) +
    "\nexport { getAlchemyFiles, getIndexExports, inferImplementedResourceArity, getLeastPrivilegeWarnings };\n",
);
const audit = await import(pathToFileURL(join(temp, "audit.mjs")).href);
const require = createRequire(new URL("../scripts/audit-service.ts", import.meta.url));
const Effect = await import(pathToFileURL(require.resolve("effect/Effect")).href);
const NodeServices = await import(
  pathToFileURL(require.resolve("@effect/platform-node/NodeServices")).href
);
const run = (effect) => Effect.runPromise(Effect.provide(effect, NodeServices.layer));
let fixtureId = 0;
function fixture() {
  const dir = join(temp, "fixture-" + fixtureId++);
  mkdirSync(dir);
  return dir;
}
const signature = (parameters) =>
  'export declare const Binding: Binding.Service<"Binding", (' +
  parameters +
  ") => Effect.Effect<void>>;";
test("missing implementation directory stays empty", async () => {
  assert.deepEqual([...(await run(audit.getAlchemyFiles(join(temp, "missing"))))], []);
});
test("migrated modules and sidecars count once and exclude the index", async () => {
  const dir = fixture();
  for (const name of [
    "GetObject.vibe",
    "GetObject.d.vibe.ts",
    "CopyObject.ts",
    "index.ts",
    "index.vibe",
    "index.d.vibe.ts",
  ])
    writeFileSync(join(dir, name), "");
  assert.deepEqual([...(await run(audit.getAlchemyFiles(dir)))].sort(), [
    "CopyObject",
    "GetObject",
  ]);
});
test("index registrations accept migrated specifiers", async () => {
  const dir = fixture(),
    file = join(dir, "index.ts");
  writeFileSync(
    file,
    ["ts", "js", "vibe"].map((ext) => 'export * from "./GetObject.' + ext + '";').join("\n"),
  );
  assert.deepEqual([...(await run(audit.getIndexExports(file)))], ["GetObject"]);
});
test("resource arity comes from the migrated declaration sidecar", async () => {
  const dir = fixture();
  for (const entry of corpus.cases) {
    writeFileSync(join(dir, entry.name + ".vibe"), "export const value = effect { return 1 }");
    writeFileSync(join(dir, entry.name + ".d.vibe.ts"), signature(entry.parameters));
    assert.equal(
      await run(audit.inferImplementedResourceArity(dir, entry.name, 99)),
      entry.arity,
      entry.name,
    );
  }
});
test("least-privilege warnings inspect the migrated source", async () => {
  const dir = fixture();
  writeFileSync(join(dir, "GetObject.vibe"), 'export const policy = { Resource: ["*"] };');
  const result = await run(
    audit.getLeastPrivilegeWarnings(dir, [
      { implemented: true, resourceArity: 1, category: "binding", pascalCase: "GetObject" },
    ]),
  );
  assert.equal(result.length, 1);
  assert.equal(result[0].file, join(dir, "GetObject.vibe"));
});
test("mixed source layouts preserve implementation names and declaration arities", async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.array(
        fc.record({
          migrated: fc.boolean(),
          sidecar: fc.boolean(),
          kind: fc.integer({ min: 0, max: 3 }),
        }),
        { minLength: 1, maxLength: 12 },
      ),
      async (entries) => {
        const dir = fixture();
        for (const [i, entry] of entries.entries()) {
          const name = "Binding" + i,
            shape = corpus.cases[entry.kind];
          writeFileSync(
            join(dir, name + (entry.migrated ? ".vibe" : ".ts")),
            entry.migrated
              ? "export const value = effect { return 1 }"
              : signature(shape.parameters),
          );
          if (entry.migrated || entry.sidecar)
            writeFileSync(join(dir, name + ".d.vibe.ts"), signature(shape.parameters));
          assert.equal(await run(audit.inferImplementedResourceArity(dir, name, 99)), shape.arity);
        }
        assert.deepEqual(
          [...(await run(audit.getAlchemyFiles(dir)))].sort(),
          entries.map((_, i) => "Binding" + i).sort(),
        );
      },
    ),
    { seed: 561105, numRuns: 40 },
  );
});
