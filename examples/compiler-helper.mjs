import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));

export function checkExample(project) {
  const result = spawnSync(
    join(root, "node_modules/.bin/vibelang"),
    ["-p", "examples/" + project + "/tsconfig.json", "--noEmit", "--pretty", "false"],
    { cwd: root, encoding: "utf8", timeout: 110000, maxBuffer: 16 * 1024 * 1024 },
  );
  assert.ifError(result.error);
  const output = (result.stdout ?? "") + (result.stderr ?? "");
  assert.ok(result.status === 0 || result.status === 2, output);
  const errors = output.split("\n").filter((line) => /: error [A-Z]+\d+:/.test(line));
  assert.ok(result.status === 0 || errors.length > 0, output);
  const local = errors.filter((line) => line.startsWith("examples/" + project + "/"));
  assert.deepEqual(local, [], local.join("\n"));
  // Dependency diagnostics belong to their own projects; preserve them in test output.
  if (errors.length)
    process.stderr.write(project + ": " + errors.length + " dependency diagnostics\n");
  assert.ok(
    errors.every((line) => /^packages\//.test(line)),
    output,
  );
}
