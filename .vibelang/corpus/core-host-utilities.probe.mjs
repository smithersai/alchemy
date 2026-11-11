import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const require = createRequire(new URL("../../packages/alchemy/package.json", import.meta.url));
const fc = createRequire(new URL("../../scripts/package.json", import.meta.url))("fast-check");
const Effect = await import(pathToFileURL(require.resolve("effect/Effect")).href);
const Exit = await import(pathToFileURL(require.resolve("effect/Exit")).href);
const Cause = await import(pathToFileURL(require.resolve("effect/Cause")).href);
const mode = process.argv[2];
const outcome = (kind, value) =>
  kind === "success"
    ? Effect.succeed(value)
    : kind === "failure"
      ? Effect.fail(value)
      : Effect.die(value);
const assertOutcome = (exit, kind, value) => {
  if (kind === "success") {
    assert.ok(Exit.isSuccess(exit));
    assert.equal(exit.value, value);
  } else {
    assert.ok(Exit.isFailure(exit));
    assert.equal(Cause.squash(exit.cause), value);
    assert.equal(Cause.hasDies(exit.cause), kind === "defect");
  }
};
if (mode === "metrics" || mode === "shutdown") {
  const wrap =
    mode === "metrics"
      ? (await import("../../packages/alchemy/src/Telemetry/Metrics.vibe")).recordResourceOp
      : (await import("../../packages/alchemy/src/Util/Shutdown.vibe")).logShutdown;
  fc.assert(
    fc.property(
      fc.string({ maxLength: 64 }),
      fc.constantFrom("success", "failure", "defect"),
      fc.constantFrom("observe", "precreate", "create", "update", "delete", "read"),
      (name, kind, operation) => {
        const before = {
          SIGINT: process.rawListeners("SIGINT"),
          SIGTERM: process.rawListeners("SIGTERM"),
        };
        const value = new Error(name);
        let runs = 0;
        const original = Effect.suspend(() => {
          runs++;
          if (mode === "shutdown") {
            for (const signal of ["SIGINT", "SIGTERM"]) {
              assert.equal(process.listenerCount(signal), before[signal].length + 1);
            }
            process.listeners("SIGINT")[0]("SIGINT");
            process.listeners("SIGTERM")[0]("SIGTERM");
          }
          return outcome(kind, value);
        });
        const program = mode === "metrics" ? wrap(name, operation)(original) : wrap(name)(original);
        assert.equal(runs, 0);
        for (const signal of ["SIGINT", "SIGTERM"])
          assert.deepEqual(process.rawListeners(signal), before[signal]);
        for (let repeat = 1; repeat <= 2; repeat++) {
          assertOutcome(Effect.runSyncExit(program), kind, value);
          assert.equal(runs, repeat);
          for (const signal of ["SIGINT", "SIGTERM"])
            assert.deepEqual(process.rawListeners(signal), before[signal]);
        }
      },
    ),
    { seed: 26783, numRuns: 64 },
  );
} else if (mode === "http1") {
  const { Http1FetchHttpClient } =
    await import("../../packages/alchemy/src/Util/Http1Dispatcher.vibe");
  const Context = await import(pathToFileURL(require.resolve("effect/Context")).href);
  const Layer = await import(pathToFileURL(require.resolve("effect/Layer")).href);
  const HttpClient = await import(pathToFileURL(require.resolve("effect/http/HttpClient")).href);
  const client = HttpClient.make(() => Effect.die("unexpected request"));
  const context = await Effect.runPromise(
    Effect.scoped(
      Layer.build(
        Http1FetchHttpClient.pipe(Layer.provide(Layer.succeed(HttpClient.HttpClient, client))),
      ),
    ),
  );
  assert.equal(Context.get(context, HttpClient.HttpClient), client);
} else {
  throw new Error("Unknown probe mode");
}
console.log(JSON.stringify({ mode, passed: true }));
