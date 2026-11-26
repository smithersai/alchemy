import { expect, test } from "bun:test";
import { createRequire } from "node:module";
import * as Cause from "effect/Cause";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import { parseEvents } from "../src/parse-events.vibe";
import corpus from "./corpus/alchemy-pubsub-json-batch.json";

const require = createRequire(import.meta.url);
const testRequire = createRequire(require.resolve("@alchemy.run/test/package.json"));
const fc = createRequire(testRequire.resolve("@effect/vitest"))("fast-check");

test("a pulled batch decodes in order, including an empty batch", () => {
  for (const texts of corpus.valid) {
    expect(Effect.runSync(parseEvents(texts.map((text) => ({ text }))))).toEqual(
      texts.map((text) => JSON.parse(text)),
    );
  }
});

test("invalid JSON remains a defect and prevents downstream insertion and acknowledgement", () => {
  for (const text of corpus.invalid) {
    let inserted = false;
    let acknowledged = false;
    const exit = Effect.runSyncExit(
      parseEvents([{ text }]).pipe(
        Effect.tap(() =>
          Effect.sync(() => {
            inserted = true;
          }),
        ),
        Effect.tap(() =>
          Effect.sync(() => {
            acknowledged = true;
          }),
        ),
      ),
    );
    expect(Exit.isFailure(exit)).toBe(true);
    if (Exit.isFailure(exit)) {
      expect(Cause.hasDies(exit.cause)).toBe(true);
      expect(Cause.hasFails(exit.cause)).toBe(false);
    }
    expect(inserted).toBe(false);
    expect(acknowledged).toBe(false);
  }
});

test("generated batches preserve JSON values and input order", () => {
  fc.assert(
    fc.property(fc.array(fc.jsonValue(), { maxLength: 30 }), (values) => {
      const messages = values.map((value) => ({ text: JSON.stringify(value) }));
      expect(Effect.runSync(parseEvents(messages))).toEqual(values);
    }),
    { seed: 77131, numRuns: 128 },
  );
});

test("a malformed message at any position fails the entire generated batch", () => {
  fc.assert(
    fc.property(
      fc.array(fc.jsonValue(), { maxLength: 20 }),
      fc.nat(),
      fc.constantFrom(...corpus.invalid),
      (values, offset, invalid) => {
        const messages = values.map((value) => ({ text: JSON.stringify(value) }));
        messages.splice(offset % (messages.length + 1), 0, { text: invalid });
        const exit = Effect.runSyncExit(parseEvents(messages));
        expect(Exit.isFailure(exit)).toBe(true);
        if (Exit.isFailure(exit)) {
          expect(Cause.hasDies(exit.cause)).toBe(true);
          expect(Cause.hasFails(exit.cause)).toBe(false);
        }
      },
    ),
    { seed: 77132, numRuns: 128 },
  );
});
