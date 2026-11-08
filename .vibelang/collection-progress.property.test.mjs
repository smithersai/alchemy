import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-collection-progress.json", import.meta.url), "utf8"),
);

async function exercise(Effect, Reporter, Registry, PlainReporterLive, fc, examples) {
  const originalInterval = globalThis.setInterval,
    originalNow = Date.now,
    originalWrite = Object.getOwnPropertyDescriptor(process.stdout, "write");
  let tick,
    output = "",
    now = 100000;
  globalThis.setInterval = (callback) => {
    tick = callback;
    return { unref() {} };
  };
  Date.now = () => now;
  process.stdout.write = (chunk) => {
    output += String(chunk);
    return true;
  };
  try {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          segments: fc.array(fc.constantFrom(...examples.segments), { minLength: 1, maxLength: 4 }),
          suffix: fc.integer({ min: 0, max: 1000000 }),
          extension: fc.constantFrom(".test.ts", ".spec.ts"),
          completedCount: fc.integer({ min: 0, max: 12 }),
          elapsed: fc.integer({ min: 6000, max: 60000 }),
        }),
        async (sample) => {
          const completed = Array.from(
            { length: sample.completedCount },
            (_, index) => "test/Completed-" + sample.suffix + "-" + index + ".test.ts",
          );
          const active =
            "test/" + sample.segments.join("/") + "/" + sample.suffix + sample.extension;
          await Effect.runPromise(
            Effect.gen(function* () {
              const reporter = yield* Reporter;
              yield* reporter.emit({ _tag: "CollectStart", files: [...completed, active] });
              for (const file of completed) yield* reporter.emit({ _tag: "FileCollected", file });
              yield* Effect.promise(() =>
                Registry.collect(active, async () => {
                  output = "";
                  now += sample.elapsed;
                  tick();
                  assert.ok(output.includes(active), "heartbeat must identify the active import");
                  assert.ok(
                    completed.every((file) => !output.includes(file)),
                    "heartbeat must omit completed imports",
                  );
                  assert.ok(
                    output.includes(
                      "collecting " + completed.length + "/" + (completed.length + 1),
                    ),
                    "completed count remains accurate",
                  );
                }),
              );
              output = "";
              now += sample.elapsed;
              tick();
              assert.ok(
                !output.includes(active) && completed.every((file) => !output.includes(file)),
                "idle registry must omit stale filenames",
              );
            }).pipe(Effect.provide(PlainReporterLive)),
          );
        },
      ),
      { numRuns: 128, examples: examples.examples.map((value) => [value]) },
    );
  } finally {
    globalThis.setInterval = originalInterval;
    Date.now = originalNow;
    if (originalWrite === undefined) delete process.stdout.write;
    else Object.defineProperty(process.stdout, "write", originalWrite);
  }
}

void test("collection progress follows the active registry across generated paths and counts", () => {
  assert.ok(
    readFileSync(join(root, "packages/alchemy-test/src/Registry.ts"), "utf8").includes(corpus.rule),
  );
  const packageRoot = join(root, "packages/alchemy-test");
  const dir = mkdtempSync(join(packageRoot, ".collection-progress-property-"));
  try {
    const file = join(dir, "program.mjs");
    const program = [
      'import assert from "node:assert/strict";',
      'import { createRequire } from "node:module";',
      'import * as Effect from "effect/Effect";',
      'import { PlainReporterLive } from "../src/PlainReporter.ts";',
      'import { Reporter } from "../src/Reporter.ts";',
      'import * as Registry from "../src/Registry.ts";',
      'const require=createRequire(new URL("../package.json",import.meta.url));',
      'const fc=createRequire(require.resolve("@effect/vitest"))("fast-check");',
      "await (" +
        exercise.toString() +
        ")(Effect,Reporter,Registry,PlainReporterLive,fc," +
        JSON.stringify(corpus) +
        ");",
      'console.log("128 generated collection-progress cases passed");',
    ].join("\n");
    writeFileSync(file, program);
    const result = spawnSync("bun", ["--preload", "vibelang/bun", file], {
      cwd: packageRoot,
      encoding: "utf8",
      timeout: 60000,
    });
    assert.equal(result.status, 0, (result.stdout ?? "") + (result.stderr ?? ""));
    assert.match(result.stdout, /128 generated collection-progress cases passed/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
