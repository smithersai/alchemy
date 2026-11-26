import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const probe = fileURLToPath(
  new URL("./corpus/alchemy-exec-foreign-guard.probe.mjs", import.meta.url),
);
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-exec-foreign-guard.json", import.meta.url), "utf8"),
);
function run(mode, cases) {
  const result = spawnSync("bun", ["--preload", "vibelang/bun", probe, mode], {
    cwd: root,
    encoding: "utf8",
    timeout: 120000,
  });
  assert.ifError(result.error);
  assert.equal(result.signal, null, result.stderr);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  const lines = result.stdout.trim().split("\n");
  assert.deepEqual(JSON.parse(lines.at(-1)), { mode, cases, passed: true });
}
void test("Exec diff keeps throwing guards cold and short-circuits absent output", () =>
  run("throw", 2));
void test("Exec diff distinguishes unresolved input from resolved props", () => run("resolved", 2));
void test("Exec diff preserves guard behavior across generated props and output states", () =>
  run("property", corpus.runs));

void test("Exec diff distinguishes resolved falsy values from unresolved input", () =>
  run("primitive", 5));
