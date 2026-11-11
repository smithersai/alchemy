import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
const root = dirname(dirname(fileURLToPath(import.meta.url)));
void test("collection heartbeat identifies active imports and clears completed files", () => {
  const program = [
    'import assert from "node:assert/strict";',
    'import * as Effect from "effect/Effect";',
    'import { PlainReporterLive } from "../src/PlainReporter.ts";',
    'import { Reporter } from "../src/Reporter.ts";',
    'import * as Registry from "../src/Registry.ts";',
    'let tick; let output = ""; let now = 100000;',
    "const originalInterval=globalThis.setInterval, originalNow=Date.now, originalWrite=process.stdout.write;",
    "globalThis.setInterval=(callback)=>{tick=callback;return {unref(){}}};",
    "Date.now=()=>now;",
    "process.stdout.write=(chunk)=>{output+=String(chunk);return true};",
    "try { for(let index=0;index<24;index++){",
    ' const completed="test/Completed"+index+".test.ts";',
    ' const active=["test/Auth/Pending","test/Nested/Long Pending","test/Unicode/é待機"][index%3]+index+(index%2?".spec.ts":".test.ts");',
    " await Effect.runPromise(Effect.gen(function*(){",
    "  const reporter=yield* Reporter;",
    '  yield* reporter.emit({_tag:"CollectStart",files:[completed,active]});',
    '  yield* reporter.emit({_tag:"FileCollected",file:completed});',
    "  yield* Effect.promise(()=>Registry.collect(active,async()=>{",
    '   output="";now+=6000;tick();',
    '   assert.ok(output.includes(active),"heartbeat must name active import: "+output);',
    '   assert.ok(!output.includes(completed),"completed import must not be blamed");',
    '   assert.ok(output.includes("collecting 1/2"),"completed count remains correct");',
    "  }));",
    '  output="";now+=6000;tick();',
    '  assert.ok(!output.includes(active)&&!output.includes(completed),"idle registry must not report stale import");',
    " }).pipe(Effect.provide(PlainReporterLive)));",
    "} } finally {globalThis.setInterval=originalInterval;Date.now=originalNow;process.stdout.write=originalWrite;}",
    'console.log("24 active/completed/idle collection cells passed");',
  ].join("\n");
  const packageRoot = join(root, "packages/alchemy-test");
  const dir = mkdtempSync(join(packageRoot, ".collection-progress-"));
  try {
    const file = join(dir, "program.mjs");
    writeFileSync(file, program);
    const result = spawnSync("bun", ["--preload", "vibelang/bun", file], {
      cwd: packageRoot,
      encoding: "utf8",
      timeout: 30000,
    });
    assert.equal(result.status, 0, (result.stdout ?? "") + (result.stderr ?? ""));
    assert.match(result.stdout, /24 active.completed.idle collection cells passed/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
