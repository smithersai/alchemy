import * as Effect from "effect/Effect";

/** Whether this process runs under Bun, read when the Effect runs. */
export const isBunRuntime: Effect.Effect<boolean> = Effect.sync(
  () => typeof process !== "undefined" && process.versions.bun !== undefined,
);
