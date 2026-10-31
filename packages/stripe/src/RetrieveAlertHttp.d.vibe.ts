import * as Layer from "effect/Layer";
import { RetrieveAlert } from "./RetrieveAlert.js";
/**
 * HTTP implementation of {@link RetrieveAlert}.
 *
 * @layer
 * @product Billing
 * @provides Stripe.RetrieveAlert
 */
export declare const RetrieveAlertHttp: Layer.Layer<RetrieveAlert, never, never>;
