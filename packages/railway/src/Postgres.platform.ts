import { randomBytes } from "node:crypto";
import * as Effect from "effect/Effect";

/** Hex password from 16 bytes of the host's CSPRNG, generated when the Effect runs. */
export const generatePassword = Effect.sync(() => {
  const bytes = randomBytes(16);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
});
