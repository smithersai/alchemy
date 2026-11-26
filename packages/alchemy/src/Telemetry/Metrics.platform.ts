import * as Effect from "effect/Effect";

export const monotonicNanoseconds = Effect.sync(() => process.hrtime.bigint());
