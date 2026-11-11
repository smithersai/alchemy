import * as Effect from "effect/Effect";

/** Base62 so codes stay short and URL-safe. */
const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const newCode = () =>
  Effect.sync(() =>
    Array.from(
      crypto.getRandomValues(new Uint8Array(7)),
      (byte) => ALPHABET[byte % ALPHABET.length],
    ).join(""),
  );
