import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const probe = fileURLToPath(
  new URL("./corpus/alchemy-network-foreign-guard.probe.mjs", import.meta.url),
);
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-network-foreign-guard.json", import.meta.url), "utf8"),
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
void test("Network diff inspects props before checking absent output", () => run("order", 3));
void test("Network diff distinguishes unresolved input from resolved props", () =>
  run("states", 2));
void test("Network diff preserves guard behavior across generated props and output states", () =>
  run("property", corpus.runs));

void test("Network diff distinguishes resolved falsy values from unresolved input", () =>
  run("primitive", 5));
