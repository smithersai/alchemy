import * as Layer from "effect/Layer";
import { DecryptData } from "./DecryptData.vibe";
/**
 * HTTP implementation of {@link DecryptData} — grants the host Function
 * `payment-cryptography:DecryptData` on the key and calls the
 * Payment Cryptography Data API at runtime.
 * @example Provide on a Lambda Function
 * ```typescript
 * Effect.gen(function* () {
 *   const key = yield* PaymentCryptography.Key("DataKey", { ... });
 *   const decrypt = yield* PaymentCryptography.DecryptData(key);
 *
 *   return {
 *     fetch: Effect.gen(function* () {
 *       const decrypted = yield* decrypt({
 *         CipherText: cipherTextHex,
 *         DecryptionAttributes: {
 *           Symmetric: { Mode: "CBC", InitializationVector: iv },
 *         },
 *       });
 *       // ...
 *     }),
 *   };
 * }).pipe(Effect.provide(PaymentCryptography.DecryptDataHttp))
 * ```
 */
export declare const DecryptDataHttp: Layer.Layer<DecryptData, never, never>;
