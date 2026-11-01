import * as Layer from "effect/Layer";
import { GetPublicKeyCertificate } from "./GetPublicKeyCertificate.vibe";
/**
 * HTTP implementation of {@link GetPublicKeyCertificate} — grants the host
 * Function `payment-cryptography:GetPublicKeyCertificate` on the key and
 * calls the Payment Cryptography control-plane API at runtime.
 */
export declare const GetPublicKeyCertificateHttp: Layer.Layer<GetPublicKeyCertificate, never, never>;
