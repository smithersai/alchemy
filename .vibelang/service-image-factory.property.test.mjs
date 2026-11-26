import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-service-image-factory.json", import.meta.url), "utf8"),
);
const probe = fileURLToPath(
  new URL("./corpus/alchemy-service-image-factory.probe.mjs", import.meta.url),
);
for (const mode of corpus.modes) {
  void test(
    "Service image factory keeps coldness, failure identity and branch order: " + mode,
    () => {
      const result = spawnSync("bun", ["--preload", "vibelang/bun", probe, mode], {
        cwd: root,
        encoding: "utf8",
        timeout: 120000,
      });
      assert.ifError(result.error);
      assert.equal(result.signal, null, result.stderr);
      assert.equal(result.status, 0, result.stdout + result.stderr);
      assert.deepEqual(JSON.parse(result.stdout.trim().split("\n").at(-1)), {
        mode,
        cases: corpus.runs,
        replays: corpus.runs * 2,
        noDockerOrNetwork: true,
        passed: true,
      });
    },
  );
}
