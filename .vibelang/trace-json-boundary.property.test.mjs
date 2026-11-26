import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const source = fileURLToPath(new URL("../scripts/analyze-type-trace.vibe", import.meta.url));
const require = createRequire(new URL("../scripts/package.json", import.meta.url));
const fc = require("fast-check");
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-trace-json-boundary.json", import.meta.url), "utf8"),
);
function run(text, valid) {
  const directory = mkdtempSync(join(tmpdir(), "alchemy-trace-json-"));
  try {
    writeFileSync(join(directory, "trace.json"), text);
    writeFileSync(join(directory, "types.json"), "[]\n");
    const result = spawnSync(
      process.execPath,
      ["--import", "vibelang/register", source, directory],
      { cwd: root, encoding: "utf8", timeout: 120000 },
    );
    assert.ifError(result.error);
    assert.equal(result.signal, null, result.stderr);
    if (valid) {
      assert.equal(result.status, 0, result.stdout + result.stderr);
      assert.match(result.stdout, /Top 30 files by check self-time/);
      assert.match(result.stdout, /0 types total/);
      assert.equal(
        readFileSync(join(directory, "attribution.txt"), "utf8").trim(),
        result.stdout.trim(),
      );
    } else {
      assert.notEqual(result.status, 0);
      assert.doesNotMatch(result.stdout + result.stderr, /EK0403/);
      assert.match(result.stdout + result.stderr, /SyntaxError/);
    }
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}
void test("the trace command reads and attributes an empty JSON trace", () =>
  run(JSON.stringify(corpus.valid), true));
void test("malformed trace JSON remains a parsing defect", () => run(corpus.invalid, false));
void test("trace JSON boundary accepts generated inert events and whitespace", () => {
  fc.assert(
    fc.property(
      fc.array(
        fc.record({
          name: fc.constantFrom("ignored", "parse", "other"),
          ts: fc.integer({ min: 0, max: 1000000 }),
          label: fc.string({ maxLength: 40 }),
        }),
        { maxLength: 12 },
      ),
      fc.constantFrom("", " ", "\n", "\t"),
      (events, whitespace) => run(whitespace + JSON.stringify(events) + whitespace, true),
    ),
    { seed: corpus.seed, numRuns: corpus.runs },
  );
});
