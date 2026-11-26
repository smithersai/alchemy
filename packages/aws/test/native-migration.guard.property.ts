import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import * as Effect from "effect/Effect";
const require = createRequire(new URL("../../../scripts/package.json", import.meta.url));
const fc = require("fast-check");
const { resolvedGuard } = await import("./fixtures/alchemy-aws-resolved-guard.vibe");
const { isResolved } = await import("alchemy/Diff");
const guardCorpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-aws-resolved-guard.json", import.meta.url), "utf8"),
);
fc.assert(
  fc.property(fc.jsonValue(), (value) => {
    assert.equal(Effect.runSync(resolvedGuard(value)), isResolved(value));
  }),
  { seed: 913017, numRuns: 128, examples: guardCorpus.map((value) => [value]) },
);
const getterError = new Error("resource getter");
let getterReads = 0;
const getterValue = Object.defineProperty({}, "value", {
  enumerable: true,
  get() {
    getterReads++;
    throw getterError;
  },
});
const guarded = resolvedGuard(getterValue);
assert.equal(getterReads, 0);
const guardExit = Effect.runSyncExit(guarded);
const Cause = await import("effect/Cause");
const Exit = await import("effect/Exit");
assert.equal(Exit.isFailure(guardExit), true);
if (Exit.isFailure(guardExit)) {
  assert.equal(Cause.hasDies(guardExit.cause), true);
  const reason = guardExit.cause.reasons.find(Cause.isDieReason);
  assert.equal(reason && Cause.isDieReason(reason) ? reason.defect : undefined, getterError);
}
assert.equal(getterReads, 1);
console.log(
  "AWS resolved guard: 128 generated values preserve results; getter exceptions remain lazy defects",
);
