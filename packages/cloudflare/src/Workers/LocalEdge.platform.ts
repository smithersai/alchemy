import * as Effect from "effect/Effect";

/** A random UUID from the host's Web Crypto, made when the Effect runs. */
export const randomUUID: Effect.Effect<string> = Effect.sync(() => crypto.randomUUID());
