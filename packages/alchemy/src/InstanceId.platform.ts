import * as Effect from "effect/Effect";

export const randomInstanceBytes = (): Effect.Effect<Uint8Array> =>
  Effect.sync(() => {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    return bytes;
  });
