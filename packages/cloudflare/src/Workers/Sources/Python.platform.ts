import * as Effect from "effect/Effect";

/** The host's current working directory, read when the Effect runs. */
export const currentWorkingDirectory: Effect.Effect<string> = Effect.sync(() => process.cwd());

/** Whether the host platform is Windows, read when the Effect runs. */
export const isWindows: Effect.Effect<boolean> = Effect.sync(() => process.platform === "win32");
