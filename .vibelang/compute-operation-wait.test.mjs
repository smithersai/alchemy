import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";
const root = process.env.ALCHEMY_WAIT_SOURCE_ROOT ?? fileURLToPath(new URL("../", import.meta.url));
const deps = process.env.ALCHEMY_WAIT_DEPENDENCIES ?? join(root, "scripts");
const require = createRequire(join(deps, "package.json"));
const fc = process.env.ALCHEMY_WAIT_FAST_CHECK
  ? require(process.env.ALCHEMY_WAIT_FAST_CHECK)
  : createRequire(
      createRequire(join(root, "packages/alchemy-test/package.json")).resolve("@effect/vitest"),
    )("fast-check");
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-compute-discarded-wait.json", import.meta.url), "utf8"),
);
void test("Compute waiters poll and preserve operation failures and explicit ignores", async () => {
  const dir = mkdtempSync(join(tmpdir(), "alchemy-compute-wait-"));
  try {
    symlinkSync(join(deps, "node_modules"), join(dir, "node_modules"), "dir");
    writeFileSync(join(dir, "package.json"), '{"type":"module"}');
    const source = readFileSync(
      process.env.ALCHEMY_WAIT_OPERATION_FILE ?? join(root, corpus.source),
      "utf8",
    );
    const start = source.indexOf("/**"),
      end = source.indexOf("/** Wait for a zonal Compute operation.");
    assert.ok(start > 0 && end > start, "extract the actual shared Compute implementation");
    writeFileSync(
      join(dir, "probe.vibe"),
      'import * as Effect from "effect/Effect"\nimport type * as compute from "./compute.ts"\nimport {waitForOperation} from "./Operation.ts"\n' +
        source.slice(start, end) +
        "\nexport {settle};\n",
    );
    writeFileSync(join(dir, "Operation.ts"), readFileSync(join(root, corpus.operation), "utf8"));
    writeFileSync(
      join(dir, "compute.ts"),
      'export type Operation=import("./Operation.ts").LongRunningOperation;\n',
    );
    writeFileSync(
      join(dir, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: {
          target: "ESNext",
          module: "NodeNext",
          moduleResolution: "NodeNext",
          strict: true,
          skipLibCheck: true,
          types: [],
          outDir: "./out",
          rewriteRelativeImportExtensions: true,
        },
        files: ["probe.vibe"],
      }),
    );
    const native =
      process.env.ALCHEMY_WAIT_NATIVE ?? join(root, "node_modules/vibelang/native/vibelang");
    const compiled = spawnSync(
      native,
      ["-p", join(dir, "tsconfig.json"), "--pretty", "false", "--singleThreaded"],
      {
        encoding: "utf8",
        timeout: 120000,
        maxBuffer: 16 * 1024 * 1024,
        env: { ...process.env, GOMAXPROCS: "2", GOMEMLIMIT: "4GiB" },
      },
    );
    assert.equal(compiled.status, 0, compiled.stdout + compiled.stderr);
    const { settle } = await import(pathToFileURL(join(dir, "out/probe.js")).href);
    const Effect = await import(pathToFileURL(require.resolve("effect/Effect")).href);
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          initialDone: fc.boolean(),
          statusMode: fc.boolean(),
          failed: fc.boolean(),
          ignored: fc.boolean(),
          code: fc.constantFrom("RESOURCE_ALREADY_EXISTS", "RESOURCE_NOT_FOUND", "UNEXPECTED"),
          name: fc.constantFrom("ops/1", "ops/with spaces", "ops/unicode λ"),
        }),
        async (c) => {
          const finished = {
            name: c.name,
            ...(c.statusMode ? { status: "DONE" } : { done: true }),
            ...(c.failed
              ? { error: { errors: [{ code: c.code, message: "operation fixture" }] } }
              : {}),
          };
          const initial = c.initialDone ? finished : { name: c.name };
          let gets = 0;
          const get = () => {
            gets++;
            return Effect.succeed(finished);
          };
          const program = settle(initial, get, { ignore: c.ignored ? [c.code] : [] });
          if (c.failed && !c.ignored) {
            const error = await Effect.runPromise(Effect.flip(program));
            assert.equal(error._tag, "GCP.OperationFailed");
            assert.equal(error.reason, c.code);
          } else assert.deepEqual(await Effect.runPromise(program), finished);
          assert.equal(
            gets,
            c.initialDone ? 0 : 1,
            "a pending operation must be polled before settle returns",
          );
        },
      ),
      { seed: corpus.seed, numRuns: corpus.samples },
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
