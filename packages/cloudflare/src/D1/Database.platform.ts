import * as Effect from "effect/Effect";

/** The host's current working directory, read when the Effect runs. */
export const rootDir = Effect.sync(() => process.cwd());
