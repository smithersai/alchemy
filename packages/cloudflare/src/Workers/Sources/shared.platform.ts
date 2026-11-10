import * as Effect from "effect/Effect";

export { fileURLToPath } from "node:url";

/** The host's current working directory, read when the Effect runs. */
export const currentWorkingDirectory: Effect.Effect<string> = Effect.sync(() => process.cwd());
