import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const probe = fileURLToPath(
  new URL("./corpus/alchemy-fly-lifecycle-guards.probe.mjs", import.meta.url),
);
function run(name, mode, cases) {
  const p = spawnSync("bun", ["--preload", "vibelang/bun", probe, name, mode], {
    cwd: root,
    encoding: "utf8",
    timeout: 120000,
  });
  assert.ifError(p.error);
  assert.equal(p.signal, null, p.stderr);
  assert.equal(p.status, 0, p.stdout + p.stderr);
  assert.deepEqual(JSON.parse(p.stdout.trim().split("\n").at(-1)), {
    name,
    mode,
    cases,
    passed: true,
  });
}
for (const name of [
  "App",
  "Certificate",
  "IpAssignment",
  "Machine",
  "Redis",
  "Service",
  "Sprite",
  "VolumeSnapshot",
]) {
  for (const [mode, cases] of [
    ["order", 4],
    ["property", 64],
  ])
    void test(name + " lifecycle guard " + mode, () => run(name, mode, cases));
}
void test("Service precreate preserves selective guards and getter order", () =>
  run("Service", "precreate", 4));
