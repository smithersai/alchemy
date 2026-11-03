import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { editsFor, strip } from "./strip-noop-mutable.mjs";

const testRequire = createRequire(
  new URL("../packages/alchemy-test/package.json", import.meta.url),
);
const fc = createRequire(testRequire.resolve("@effect/vitest"))("fast-check");

const script = fileURLToPath(new URL("./strip-noop-mutable.mjs", import.meta.url));
const compiler = resolve(
  process.env.VIBELANG_BINARY ??
    fileURLToPath(new URL("../node_modules/vibelang/native/vibelang", import.meta.url)),
);
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-strip-explicit-tree.json", import.meta.url), "utf8"),
);
const options = { skip: !existsSync(compiler) && "install vibelang or set VIBELANG_BINARY" };

function witness({
  name = "selected",
  check = false,
  compilerFirst = false,
  explicitCompiler = false,
  checkFirst = false,
}) {
  const temp = mkdtempSync(join(tmpdir(), "alchemy-strip-root-"));
  try {
    const cwd = join(temp, "cwd"),
      selected = join(temp, name);
    for (const root of [cwd, selected]) {
      mkdirSync(join(root, "node_modules/vibelang/native"), { recursive: true });
      symlinkSync(compiler, join(root, "node_modules/vibelang/native/vibelang"));
    }
    writeFileSync(join(cwd, "control.vibe"), corpus.control);
    writeFileSync(join(selected, "selected.vibe"), corpus.selected);
    const args = [selected];
    if (explicitCompiler) args[compilerFirst ? "unshift" : "push"]("--compiler", compiler);
    if (check) args[checkFirst ? "unshift" : "push"]("--check");
    const result = spawnSync(process.execPath, [script, ...args], { cwd, encoding: "utf8" });
    assert.equal(result.status, 0, result.stderr);
    assert.equal(
      readFileSync(join(cwd, "control.vibe"), "utf8"),
      corpus.control,
      "cwd must stay untouched",
    );
    assert.match(result.stdout, /(?:removed|would remove) 1 mutable modifiers in 1 files/);
    assert.equal(
      readFileSync(join(selected, "selected.vibe"), "utf8"),
      check ? corpus.selected : corpus.expected,
    );
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
}

void test("an explicit tree without --compiler never edits cwd", options, () => witness({}));

void test(
  "explicit-tree selection preserves cwd across generated path and flag layouts",
  options,
  () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.constantFrom("selected", "selected tree", "quoted ' tree", "unicode λ tree"),
          check: fc.boolean(),
          explicitCompiler: fc.boolean(),
          compilerFirst: fc.boolean(),
          checkFirst: fc.boolean(),
        }),
        witness,
      ),
      { seed: 561103, numRuns: 40 },
    );
  },
);

const run = (s) => strip(s, editsFor(compiler, s, "a.vibe"));
void test("interface and type-literal members lose the modifier", options, () => {
  assert.equal(
    run("export interface A { mutable x: string; y: number }\n"),
    "export interface A { x: string; y: number }\n",
  );
  assert.equal(
    run("export type T = { mutable a: { mutable b?: string } }\n"),
    "export type T = { a: { b?: string } }\n",
  );
  assert.equal(
    run("export interface I { mutable [k: string]: unknown }\n"),
    "export interface I { [k: string]: unknown }\n",
  );
});
void test("a heritage type argument and a parameter type count as type literals", options, () => {
  assert.equal(
    run("export const f = (p: { mutable a: string }) => p.a\n"),
    "export const f = (p: { a: string }) => p.a\n",
  );
});
void test("error, schema and data bodies stay", options, () => {
  for (const s of [
    "error Bad { mutable message: string }\n",
    "schema S { mutable a: string }\n",
    "data D { V { mutable a: string } }\n",
  ])
    assert.equal(run(s), s);
  const nested = "error Bad { mutable details: { mutable a: string } }\n";
  assert.equal(run(nested), nested);
});
void test("names, strings and comments stay", options, () => {
  for (const s of [
    "export interface A { mutable?: boolean }\n",
    "const a = { mutable: true }\nexport const b = a.mutable\n",
    '// mutable x: string\nexport const s = "mutable x"\n',
    "export interface A { [mutable: string]: unknown }\n",
  ])
    assert.equal(run(s), s);
});
void test("idempotent", options, () => {
  const once = run("export interface A { mutable x: string }\n");
  assert.equal(run(once), once);
});
