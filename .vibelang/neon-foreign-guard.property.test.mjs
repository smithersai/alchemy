import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const probe = fileURLToPath(
  new URL("./corpus/alchemy-neon-foreign-guard.probe.mjs", import.meta.url),
);
for (const name of ["Auth", "CustomDomain", "FunctionTrigger", "ProjectVPCEndpoint", "Role"]) {
  for (const [mode, cases] of [
    ["order", 4],
    ["property", 96],
  ]) {
    void test(name + " preserves the foreign guard " + mode, () => {
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
