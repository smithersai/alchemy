import * as Effect from "effect/Effect";

/** Fresh environment-config map key for a generated domain, from the host's Web Crypto. */
export const newDomainKey = Effect.sync(() => crypto.randomUUID());
