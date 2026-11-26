import { expect, test } from "bun:test";
import { fc } from "../../type-consumers-helper.mjs";
import { decodeVisits } from "../src/visits.ts";
import corpus from "./corpus/alchemy-octane-visits.json";

test("visits responses require a numeric or null visits field", () => {
  for (const body of corpus.valid) expect(decodeVisits(body)).toEqual(body);
  for (const body of corpus.invalid) expect(() => decodeVisits(body)).toThrow();
});

test("generated valid counts preserve their value", () => {
  fc.assert(
    fc.property(
      fc.option(fc.double({ noNaN: true, noDefaultInfinity: true }), { nil: null }),
      (visits) => {
        expect(decodeVisits({ visits })).toEqual({ visits });
      },
    ),
    { seed: 77138, numRuns: 128 },
  );
});

test("generated nonnumeric visits cannot reach the UI state", () => {
  fc.assert(
    fc.property(
      fc.jsonValue().filter((value) => value !== null && typeof value !== "number"),
      (visits) => {
        expect(() => decodeVisits({ visits })).toThrow();
      },
    ),
    { seed: 77139, numRuns: 128 },
  );
});
