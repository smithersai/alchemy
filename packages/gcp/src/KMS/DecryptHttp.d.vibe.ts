import * as Layer from "effect/Layer";
import { Decrypt } from "./Decrypt.vibe";
/**
 * HTTP implementation of {@link Decrypt}.
 *
 * @layer
 * @provides GCP.KMS.Decrypt
 */
export declare const DecryptHttp: Layer.Layer<Decrypt, never, never>;
