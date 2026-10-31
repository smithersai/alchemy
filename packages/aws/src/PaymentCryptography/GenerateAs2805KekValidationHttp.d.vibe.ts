import * as Layer from "effect/Layer";
import { GenerateAs2805KekValidation } from "./GenerateAs2805KekValidation.js";
/**
 * HTTP implementation of {@link GenerateAs2805KekValidation} — grants the
 * host Function `payment-cryptography:GenerateAs2805KekValidation` on the
 * KEK and calls the Payment Cryptography Data API at runtime.
 */
export declare const GenerateAs2805KekValidationHttp: Layer.Layer<GenerateAs2805KekValidation, never, never>;
