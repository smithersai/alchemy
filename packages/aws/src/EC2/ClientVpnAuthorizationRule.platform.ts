import * as Effect from "effect/Effect";

/** A fresh idempotency token for one Client VPN request. */
export const newClientToken = (): Effect.Effect<string> => Effect.sync(() => crypto.randomUUID());
