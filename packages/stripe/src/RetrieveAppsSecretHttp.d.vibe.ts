import * as Layer from "effect/Layer";
import { RetrieveAppsSecret } from "./RetrieveAppsSecret.js";
/**
 * HTTP implementation of {@link RetrieveAppsSecret}. Find is keyed by
 * `name` and `scope`.
 *
 * @layer
 * @product Secrets
 * @provides Stripe.RetrieveAppsSecret
 */
export declare const RetrieveAppsSecretHttp: Layer.Layer<RetrieveAppsSecret, never, never>;
