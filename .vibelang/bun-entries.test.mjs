import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, test } from "node:test";
import { pathToFileURL } from "node:url";

const { buildBunEntries } = await import(
  new URL("../scripts/bun-entries.ts", import.meta.url).href
);
const require = createRequire(new URL("../packages/alchemy-test/package.json", import.meta.url));
const fc = createRequire(require.resolve("@effect/vitest"))("fast-check");
const temp = mkdtempSync(join(tmpdir(), "alchemy-bun-entries-"));
after(() => rmSync(temp, { recursive: true, force: true }));
let n = 0;
async function fixture(name) {
  const dir = join(temp, "case" + n++);
  mkdirSync(join(dir, "src", name), { recursive: true });
  mkdirSync(join(dir, "lib", name), { recursive: true });
  writeFileSync(join(dir, "package.json"), '{"type":"module"}\n');
  const source =
    'import code from "./Worker.ts?worker";\nimport { Token } from "./Token.ts";\nimport * as Hidden from "./Hidden.ts";\nexport interface Props { hidden: Hidden.Contract }\nexport { Token };\nexport const create = (options = {}) => new Token();\nexport const workerSource = code;\n';
  writeFileSync(join(dir, "src", name, "Entry.ts"), source);
  writeFileSync(
    join(dir, "src", name, "Worker.ts"),
    'import { value } from "./Value.vibe";\nexport default { value };\n',
  );
  writeFileSync(join(dir, "src", name, "Value.vibe"), "export const value = 42\n");
  writeFileSync(join(dir, "src", name, "Token.ts"), "export class Token {}\n");
  writeFileSync(
    join(dir, "src", name, "Hidden.ts"),
    'throw new Error("type-only namespace was initialized");\nexport interface Contract {}\n',
  );
  writeFileSync(join(dir, "lib", name, "Value.js"), "export const value = 42;\n");
  writeFileSync(join(dir, "lib", name, "Token.js"), "export class Token {}\n");
  writeFileSync(
    join(dir, "lib", name, "Hidden.js"),
    'throw new Error("type-only namespace was initialized");\n',
  );
  const entry = (name ? name + "/" : "") + "Entry";
  const before = readFileSync(join(dir, "src", name, "Entry.ts"), "utf8");
  await buildBunEntries(dir, [entry]);
  assert.equal(readFileSync(join(dir, "src", name, "Entry.ts"), "utf8"), before);
  const output = join(dir, "lib-bun", name, "Entry.js");
  const driver = join(dir, "load.mjs");
  writeFileSync(
    driver,
    'const m=await import(process.argv[2]);const t=await import(process.argv[3]);const w=await import("data:text/javascript;base64,"+Buffer.from(m.workerSource).toString("base64"));console.log(JSON.stringify({same:m.Token===t.Token,instance:m.create() instanceof t.Token,name:m.create.name,length:m.create.length,value:w.default.value}));',
  );
  const result = spawnSync(
    "bun",
    [driver, pathToFileURL(output).href, pathToFileURL(join(dir, "lib", name, "Token.js")).href],
    {
      cwd: dir,
      encoding: "utf8",
      env: { ...process.env, BUN_OPTIONS: undefined, NODE_OPTIONS: undefined },
    },
  );
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), {
    same: true,
    instance: true,
    name: "create",
    length: 0,
    value: 42,
  });
}
void test("a source bundle keeps class identity and type elision and builds its worker", async () => {
  await fixture("");
});
void test("source bundles preserve native dependency identity across generated paths", async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.constantFrom("Nested", "space name", "quote'name", "café", "deeper/child"),
      fixture,
    ),
    { seed: 561119, numRuns: 40 },
  );
});
void test("source entry paths cannot escape the package", async () => {
  await assert.rejects(buildBunEntries(temp, ["../Other"]), /package-relative source path/);
});
