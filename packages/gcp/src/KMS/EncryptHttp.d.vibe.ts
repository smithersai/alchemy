import * as Layer from "effect/Layer";
import { Encrypt } from "./Encrypt.vibe";
/**
 * HTTP implementation of {@link Encrypt}.
 *
 * @layer
 * @provides GCP.KMS.Encrypt
 */
export declare const EncryptHttp: Layer.Layer<Encrypt, never, never>;
