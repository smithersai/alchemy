import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { clientToken } from "../src/AppRegistry/internal.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const require = createRequire(resolve(root, "scripts/package.json"));
const fc = require("fast-check");
let diagnostics;
const errors = () => {
  if (diagnostics === undefined) {
    const result = spawnSync(
      resolve(root, "node_modules/.bin/vibelang"),
      ["-p", "packages/aws/tsconfig.json", "--noEmit", "--pretty", "false"],
      { cwd: root, encoding: "utf8", timeout: 180000, maxBuffer: 16 * 1024 * 1024 },
    );
    assert.ifError(result.error);
    assert.ok(result.status === 0 || result.status === 2, result.stderr);
    diagnostics = result.stdout + result.stderr;
  }
  return diagnostics.split("\n").filter((line) => /: error [A-Z]+\d+:/.test(line));
};
const absent = (path, codes) => {
  const failures = errors().filter(
    (line) =>
      line.startsWith("packages/aws/src/" + path + "(") &&
      codes.some((code) => line.includes(": error " + code + ":")),
  );
  assert.deepEqual(failures, []);
};

for (const path of [
  "AppConfig/ConfigurationProfile.vibe",
  "AppConfig/Environment.vibe",
  "Backup/BackupPlan.vibe",
  "Backup/BackupVault.vibe",
  "BedrockDataAutomation/Blueprint.vibe",
  "CloudMap/Service.vibe",
  "CodeBuild/Project.vibe",
  "FIS/TargetAccountConfiguration.vibe",
  "GlobalAccelerator/Accelerator.vibe",
  "GreengrassV2/ComponentVersion.vibe",
  "Logs/reapLogGroups.vibe",
  "OpenSearchServerless/Collection.vibe",
  "RDS/Migrations.vibe",
  "Route53/Records.vibe",
  "SQS/Queue.vibe",
]) {
  test("AWS catch preserves the Effect operand in " + path, { timeout: 180000 }, () => {
    absent(path, [
      "EK0506",
      "TS18046",
      "TS18048",
      "TS2339",
      "TS2322",
      "TS2345",
      "EK0106",
      "EK3101",
    ]);
  });
}
test("Scheduler resolves the schedule builder source", () => {
  absent("Scheduler/ScheduleEventSource.ts", ["TS2307"]);
});
test("Step Functions pipe uses permitted parameters", () => {
  absent("StepFunctions/Asl/Program.vibe", ["EK0107"]);
});
test("CloudWatch resolves each alarm name accessor", () => {
  absent("CloudWatch/DescribeAlarmsHttp.vibe", ["TS2322"]);
});
test("Route53 catches a rejected delete without running its array", () => {
  absent("Route53/RecordList.vibe", ["EK0502"]);
});
for (const path of ["CloudControl/Resource.vibe", "SQS/Queue.vibe"]) {
  test("AWS JSON parsing runs inside its Effect in " + path, () => {
    absent(path, ["EK0401"]);
  });
}
test("AppRegistry tokens stay deterministic, bounded and nonempty", () => {
  fc.assert(
    fc.property(fc.string(), (input) => {
      const token = clientToken(input);
      assert.match(token, /^[a-zA-Z0-9]{1,64}$/);
      assert.equal(token, clientToken(input));
      assert.equal(clientToken(token), token);
    }),
    {
      seed: 913013,
      numRuns: 256,
      examples: JSON.parse(
        readFileSync(new URL("./corpus/alchemy-aws-client-token.json", import.meta.url), "utf8"),
      ).map((value) => [value]),
    },
  );
});

test(
  "AWS foreign helper boundaries compile with their failure contracts",
  { timeout: 180000 },
  () => {
    const result = spawnSync(
      resolve(root, "node_modules/.bin/vibelang"),
      ["-p", "packages/aws/test/tsconfig.json", "--noEmit", "--pretty", "false"],
      { cwd: root, encoding: "utf8", timeout: 180000, maxBuffer: 16 * 1024 * 1024 },
    );
    assert.ifError(result.error);
    assert.ok(result.status === 0 || result.status === 2, result.stderr);
    const lines = (result.stdout + result.stderr)
      .split("\n")
      .filter(
        (line) => line.includes("fixtures/foreign-contracts.vibe(") && line.includes(": error "),
      );
    assert.deepEqual(lines, []);
  },
);

test(
  "AWS pagination preserves lazy calls and typed failures across generated pages",
  { timeout: 180000 },
  () => {
    const result = spawnSync(
      "bun",
      ["--preload", "vibelang/bun", "packages/aws/test/native-migration.property.ts"],
      { cwd: root, encoding: "utf8", timeout: 180000, maxBuffer: 8 * 1024 * 1024 },
    );
    assert.ifError(result.error);
    assert.equal(result.status, 0, result.stdout + result.stderr);
  },
);

test("AWS sources have no TypeScript errors", { timeout: 180000 }, () => {
  assert.deepEqual(
    errors().filter((line) => line.startsWith("packages/aws/") && /: error TS[0-9]+:/.test(line)),
    [],
  );
});

test("LoadBalancer retries the typed poll Effect before handling completion", () => {
  absent("ELBv2/LoadBalancer.vibe", ["TS18046", "EK0506"]);
});

test("Foldkit typechecks imported JSX library components", { timeout: 180000 }, () => {
  const result = spawnSync(
    resolve(root, "node_modules/.bin/vibelang"),
    ["-p", "examples/aws-website-foldkit/tsconfig.json", "--noEmit", "--pretty", "false"],
    { cwd: root, encoding: "utf8", timeout: 180000, maxBuffer: 16 * 1024 * 1024 },
  );
  assert.ifError(result.error);
  assert.ok(result.status === 0 || result.status === 2, result.stderr);
  assert.deepEqual(
    (result.stdout + result.stderr).split("\n").filter((line) => line.includes(": error TS6142:")),
    [],
  );
});

for (const path of [
  "Kinesis/Stream.vibe",
  "Kinesis/StreamConsumer.vibe",
  "LakeFormation/Resource.vibe",
]) {
  test("AWS deletion catches stay installed while polling in " + path, () => {
    errors();
    assert.deepEqual(
      diagnostics
        .split("\n")
        .filter(
          (line) =>
            line.startsWith("packages/aws/src/" + path + "(") && line.includes(": warning EK9204:"),
        ),
      [],
    );
  });
}

test(
  "AWS resolved guards preserve getter defects across generated data",
  { timeout: 180000 },
  () => {
    const result = spawnSync(
      process.execPath,
      ["--import", "vibelang/register", "packages/aws/test/native-migration.guard.property.ts"],
      { cwd: root, encoding: "utf8", timeout: 180000, maxBuffer: 8 * 1024 * 1024 },
    );
    assert.ifError(result.error);
    assert.equal(result.status, 0, result.stdout + result.stderr);
  },
);
