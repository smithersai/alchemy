import * as Layer from "effect/Layer";
import { VerifyCardValidationData } from "./VerifyCardValidationData.js";
/**
 * HTTP implementation of {@link VerifyCardValidationData} — grants the host
 * Function `payment-cryptography:VerifyCardValidationData` on the CVK and
 * calls the Payment Cryptography Data API at runtime. A mismatch fails with
 * the typed `VerificationFailedException`.
 */
export declare const VerifyCardValidationDataHttp: Layer.Layer<VerifyCardValidationData, never, never>;
