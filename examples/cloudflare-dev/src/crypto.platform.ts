import * as Effect from "effect/Effect";

/** Signs `data` with an HMAC `key` through Web Crypto. */
export const signHmac = (key: CryptoKey, data: BufferSource) =>
  Effect.promise(() => crypto.subtle.sign("HMAC", key, data));

/** Verifies an HMAC `signature` over `data` through Web Crypto. */
export const verifyHmac = (key: CryptoKey, signature: BufferSource, data: BufferSource) =>
  Effect.promise(() => crypto.subtle.verify("HMAC", key, signature, data));
