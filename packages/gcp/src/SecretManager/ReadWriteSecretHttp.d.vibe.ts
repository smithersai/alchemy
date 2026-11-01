import * as Layer from "effect/Layer";
import { ReadWriteSecret } from "./ReadWriteSecret.vibe";
/**
 * HTTP implementation of {@link ReadWriteSecret} over the Secret Manager REST API.
 *
 * @layer
 * @provides GCP.SecretManager.ReadWriteSecret
 * @category SecretManager
 */
export declare const ReadWriteSecretHttp: Layer.Layer<ReadWriteSecret, never, never>;
