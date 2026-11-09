import * as Effect from "effect/Effect";

/** Working directory of the host process, read when the Effect runs; `importFiles` resolve from it. */
export const rootDir = Effect.sync(() => process.cwd());
