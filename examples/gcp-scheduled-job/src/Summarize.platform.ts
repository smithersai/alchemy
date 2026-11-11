import * as Effect from "effect/Effect";

export const executionName = Effect.sync(() => process.env.CLOUD_RUN_EXECUTION ?? null);
