import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));

test("owned synchronous factories and predicates are callable from effect code", () => {
  const result = spawnSync(
    process.execPath,
    [
      "node_modules/vibelang/bin/vibelang",
      "--noEmit",
      "--pretty",
      "false",
      "-p",
      ".vibelang/corpus/foreign-contracts/tsconfig.json",
    ],
    { cwd: root, encoding: "utf8", maxBuffer: 16 * 1024 * 1024 },
  );
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stdout + result.stderr);
});
