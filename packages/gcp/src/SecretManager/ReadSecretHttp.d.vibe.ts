import * as Layer from "effect/Layer";
import { ReadSecret } from "./ReadSecret.js";
/**
 * HTTP implementation of {@link ReadSecret} over the Secret Manager REST API.
 *
 * @layer
 * @provides GCP.SecretManager.ReadSecret
 * @category SecretManager
 */
export declare const ReadSecretHttp: Layer.Layer<ReadSecret, never, never>;
