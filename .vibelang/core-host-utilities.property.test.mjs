import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const probe = fileURLToPath(new URL("./corpus/core-host-utilities.probe.mjs", import.meta.url));
for (const mode of ["metrics", "shutdown", "http1"]) {
  void test(mode + " preserves coldness, results and cleanup across host boundaries", () => {
    const result = spawnSync("bun", ["--preload", "vibelang/bun", probe, mode], {
      cwd: root,
      encoding: "utf8",
      timeout: 120000,
    });
    assert.ifError(result.error);
    assert.equal(result.signal, null, result.stderr);
    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.deepEqual(JSON.parse(result.stdout.trim().split("\n").at(-1)), { mode, passed: true });
  });
}
