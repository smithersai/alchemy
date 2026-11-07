import * as Layer from "effect/Layer";
import { WriteSecret } from "./WriteSecret.vibe";
/**
 * HTTP implementation of {@link WriteSecret} over the Secret Manager REST API.
 *
 * @layer
 * @provides GCP.SecretManager.WriteSecret
 * @category SecretManager
 */
export declare const WriteSecretHttp: Layer.Layer<WriteSecret, never, never>;
