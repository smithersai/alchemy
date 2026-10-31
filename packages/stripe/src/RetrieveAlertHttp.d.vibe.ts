import * as Layer from "effect/Layer";
import { RetrieveAlert } from "./RetrieveAlert.vibe";
/**
 * HTTP implementation of {@link RetrieveAlert}.
 *
 * @layer
 * @product Billing
 * @provides Stripe.RetrieveAlert
 */
export declare const RetrieveAlertHttp: Layer.Layer<RetrieveAlert, never, never>;
