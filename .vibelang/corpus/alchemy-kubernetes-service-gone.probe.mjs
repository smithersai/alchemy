import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { KubernetesNotFound } from "../../packages/kubernetes/src/Client.ts";

const pkg = fileURLToPath(new URL("../../packages/kubernetes/", import.meta.url));
const require = createRequire(new URL("../../packages/kubernetes/package.json", import.meta.url));
const fc = createRequire(new URL("../../scripts/package.json", import.meta.url))("fast-check");
const Effect = await import(pathToFileURL(require.resolve("effect/Effect")).href);
const Exit = await import(pathToFileURL(require.resolve("effect/Exit")).href);
const Cause = await import(pathToFileURL(require.resolve("effect/Cause")).href);
const source = readFileSync(join(pkg, "src/Deployment.vibe"), "utf8");
const classStart = source.indexOf("class ServiceStillExists ");
const start = source.lastIndexOf("// @vibelang-diagnostics-next-line", classStart);
const end = source.indexOf("\n\nexport const DeploymentProvider", classStart);
assert.ok(start >= 0 && end > classStart);
const schedule = source.match(/^const loadBalancerRetrySchedule = .+$/m)?.[0];
assert.ok(schedule);
const helper = source
  .slice(start, end)
  .replace("const waitForServiceGone =", "export const waitForServiceGone =");
const fixture = join(pkg, "src/__service_gone_probe_" + randomUUID().replaceAll("-", "") + ".vibe");
const prefix = [
  'import * as Effect from "effect/Effect"',
  'import * as Data from "effect/Data"',
  'import * as Schedule from "effect/Schedule"',
  'import { readObject } from "./Client.ts"',
  'import type { ClusterTransport } from "./ClusterAdapter.ts"',
  'import type { KubernetesObjectRef } from "./Objects.ts"',
  schedule,
].join("\n");
try {
  writeFileSync(fixture, prefix + "\n" + helper + "\n");
  const { waitForServiceGone } = await import(pathToFileURL(fixture).href);
  const rows = fc.sample(
    fc.record({
      name: fc.stringMatching(/^[a-z][a-z0-9]{0,10}$/),
      namespace: fc.stringMatching(/^[a-z][a-z0-9]{0,10}$/),
    }),
    { seed: 817633, numRuns: 128 },
  );
  let executions = 0;
  for (const [index, row] of rows.entries()) {
    const mode = index < 2 ? (index === 0 ? "other-failure" : "defect") : "missing";
    const marker =
      mode === "missing"
        ? new KubernetesNotFound({ method: "GET", path: "/service", body: "" })
        : new Error("header failure");
    let reads = 0;
    const transport = {
      endpoint: "https://unit.invalid",
      headers: Effect.suspend(() => {
        reads++;
        return mode === "defect" ? Effect.die(marker) : Effect.fail(marker);
      }),
    };
    const program = waitForServiceGone(transport, { apiVersion: "v1", kind: "Service", ...row });
    assert.equal(reads, 0, "constructing the wait must not read transport headers");
    for (let pass = 1; pass <= 2; pass++) {
      if (mode === "missing") {
        const result = await Effect.runPromiseExit(program);
        assert.ok(Exit.isSuccess(result), "a missing Service is already gone");
        assert.equal(result.value, undefined);
      } else if (mode === "other-failure") {
        const result = await Effect.runPromise(
          Effect.match(program, {
            onFailure: (error) => ({ error }),
            onSuccess: (value) => ({ value }),
          }),
        );
        assert.equal(result.error, marker, "unrelated typed failures remain failures");
      } else {
        const result = await Effect.runPromiseExit(program);
        assert.ok(Exit.isFailure(result));
        assert.equal(Cause.squash(result.cause), marker);
      }
      assert.equal(
        reads,
        pass,
        "each replay reads headers once; failing headers prevent network requests",
      );
      executions++;
    }
  }
  console.log(
    JSON.stringify({ executions, generated: rows.length, noNetworkRequests: true, passed: true }),
  );
} finally {
  rmSync(fixture, { force: true });
  rmSync(fixture.replace(/\.vibe$/, ".d.vibe.ts"), { force: true });
}
