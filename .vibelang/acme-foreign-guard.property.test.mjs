import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const probe = fileURLToPath(
  new URL("./corpus/alchemy-acme-foreign-guard.probe.mjs", import.meta.url),
);
for (const name of ["Account", "Certificate"]) {
  for (const [mode, cases] of [
    ["order", 5],
    ["primitive", 4],
    ["property", 128],
  ]) {
    void test(name + " diff preserves foreign guard " + mode, () => {
      const result = spawnSync("bun", ["--preload", "vibelang/bun", probe, name, mode], {
        cwd: root,
        encoding: "utf8",
        timeout: 120000,
      });
      assert.ifError(result.error);
      assert.equal(result.signal, null, result.stderr);
      assert.equal(result.status, 0, result.stdout + result.stderr);
      assert.deepEqual(JSON.parse(result.stdout.trim().split("\n").at(-1)), {
        name,
        mode,
        cases,
        passed: true,
      });
    });
  }
}
