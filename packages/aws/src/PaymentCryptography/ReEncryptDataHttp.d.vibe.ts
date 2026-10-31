import * as Layer from "effect/Layer";
import { ReEncryptData } from "./ReEncryptData.js";
/**
 * HTTP implementation of {@link ReEncryptData} — grants the host Function
 * `payment-cryptography:ReEncryptData` on both the incoming and outgoing
 * keys and calls the Payment Cryptography Data API at runtime.
 */
export declare const ReEncryptDataHttp: Layer.Layer<ReEncryptData, never, never>;
