import { createRequire } from "node:module";
import { describe, expect, test } from "@alchemy.run/test";
import * as Effect from "effect/Effect";

const testRequire = createRequire(new URL("../../alchemy-test/package.json", import.meta.url));
const fc = createRequire(testRequire.resolve("@effect/vitest"))("fast-check");
import { isResolved } from "@/Diff";

describe("foreign predicate contracts", { tags: ["unit", "local"] }, () => {
  test("accepts generated JSON inputs and detects an unresolved sibling", () => {
    fc.assert(
      fc.property(fc.jsonValue(), (value: unknown) => {
        expect(isResolved(value)).toBe(true);
        expect(isResolved({ value, pending: Effect.succeed(value) })).toBe(false);
      }),
      { seed: 1337, numRuns: 512 },
    );
  });

  test("recognizes nested plain inputs and terminates on shared and cyclic inputs", () => {
    for (let seed = 0; seed < 256; seed++) {
      let value: unknown = seed;
      for (let depth = 0; depth < seed % 12; depth++) {
        value = depth % 2 === 0 ? { value, other: null } : [value, false, "value"];
      }
      expect(isResolved(value)).toBe(true);
      expect(isResolved({ value, pending: Effect.succeed(seed) })).toBe(false);
      const shared = { value };
      const cyclic: { left: unknown; right: unknown; self?: unknown } = {
        left: shared,
        right: shared,
      };
      cyclic.self = cyclic;
      expect(isResolved(cyclic)).toBe(true);
    }
  });
});
