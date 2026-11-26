import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import * as Effect from "effect/Effect";
import { waitForDeletion } from "./fixtures/alchemy-aws-poll-deletion.vibe";
import { listProfiles } from "./fixtures/alchemy-aws-profile-pagination.vibe";

const require = createRequire(new URL("../../../scripts/package.json", import.meta.url));
const fc = require("fast-check");
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-aws-profile-pagination.json", import.meta.url), "utf8"),
);

fc.assert(
  fc.property(
    fc.record({
      id: fc.option(fc.string(), { nil: undefined }),
      pages: fc.array(fc.record({ Items: fc.option(fc.array(fc.string()), { nil: undefined }) })),
      missing: fc.boolean(),
    }),
    ({ id, pages, missing }) => {
      let calls = 0;
      const effect = listProfiles({ Id: id }, (actualId) => {
        calls++;
        assert.equal(actualId, id);
        return missing
          ? Effect.fail({ _tag: "ResourceNotFoundException" as const })
          : Effect.succeed(pages);
      });
      assert.equal(calls, 0);
      const result = Effect.runSync(effect);
      assert.deepEqual(
        result,
        id === undefined || missing ? [] : pages.flatMap((page) => page.Items ?? []),
      );
      assert.equal(calls, id === undefined ? 0 : 1);
    },
  ),
  { seed: 913014, numRuns: 128, examples: corpus.map((value) => [value]) },
);

const denied = { _tag: "AccessDeniedException" as const };
assert.deepEqual(
  Effect.runSync(Effect.flip(listProfiles({ Id: "app" }, () => Effect.fail(denied)))),
  denied,
);
console.log(
  "AWS pagination: 128 generated cases, named corpus, lazy execution and unexpected failure propagation pass",
);

const programSource = new URL("../src/StepFunctions/Asl/Program.ts", import.meta.url);
const { make } = await import(
  existsSync(programSource)
    ? programSource.href
    : new URL("../src/StepFunctions/Asl/Program.vibe", import.meta.url).href
);
fc.assert(
  fc.property(fc.array(fc.integer({ min: -10, max: 10 }), { maxLength: 12 }), (steps) => {
    const program = make({ kind: "succeed", value: 1 });
    assert.equal(program.pipe(), program);
    assert.equal(
      program.pipe(() => 0, ...steps.map((n) => (value: number) => value + n)),
      steps.reduce((sum, n) => sum + n, 0),
    );
  }),
  { seed: 913015, numRuns: 128, examples: [[[]], [[1, -1]], [[1, 2, 3, 4, 5, 6]]] },
);
console.log("Step Functions pipe: 128 generated argument lists preserve order and identity");

const pollCorpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-aws-poll-deletion.json", import.meta.url), "utf8"),
);
fc.assert(
  fc.property(fc.integer({ min: 0, max: 20 }), (successfulReads) => {
    let calls = 0;
    Effect.runSync(
      waitForDeletion(() =>
        ++calls <= successfulReads ? Effect.void : Effect.fail({ _tag: "Missing" as const }),
      ),
    );
    assert.equal(calls, Math.min(successfulReads + 1, 4));
  }),
  { seed: 913016, numRuns: 128, examples: pollCorpus.map((value) => [value]) },
);
const deniedPoll = { _tag: "Denied" as const };
assert.deepEqual(
  Effect.runSync(Effect.flip(waitForDeletion(() => Effect.fail(deniedPoll)))),
  deniedPoll,
);
console.log(
  "AWS deletion poll: 128 generated read sequences preserve retry limits and typed failures",
);
