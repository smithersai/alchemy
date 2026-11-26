import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const probe = fileURLToPath(
  new URL("./corpus/alchemy-pkg-sql-callback.probe.mjs", import.meta.url),
);
for (const mode of ["typed-failure", "success-replay", "synchronous-defect"]) {
  void test("registry SQL factories preserve " + mode, () => {
    const result = spawnSync("bun", ["--preload", "vibelang/bun", probe, mode], {
      cwd: root,
      encoding: "utf8",
      timeout: 120000,
    });
    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.equal(JSON.parse(result.stdout.trim()).passed, true);
  });
}
