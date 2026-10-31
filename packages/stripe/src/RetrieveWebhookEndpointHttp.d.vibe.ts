import * as Layer from "effect/Layer";
import { RetrieveWebhookEndpoint } from "./RetrieveWebhookEndpoint.js";
/**
 * HTTP implementation of {@link RetrieveWebhookEndpoint}. Provide it on the
 * Function or Worker Effect.
 *
 * @layer
 * @product Webhook
 * @provides Stripe.RetrieveWebhookEndpoint
 */
export declare const RetrieveWebhookEndpointHttp: Layer.Layer<RetrieveWebhookEndpoint, never, never>;
