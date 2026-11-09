import * as Effect from "effect/Effect";

export const temporaryPath = (filePath: string): Effect.Effect<string> =>
  Effect.sync(() => `${filePath}.${process.pid}.${Math.random().toString(36).slice(2)}.tmp`);
