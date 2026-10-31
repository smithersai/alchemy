import * as Layer from "effect/Layer";
import { RetrieveBillingMeter } from "./RetrieveBillingMeter.js";
/**
 * HTTP implementation of {@link RetrieveBillingMeter}.
 *
 * @layer
 * @product Billing
 * @provides Stripe.RetrieveBillingMeter
 */
export declare const RetrieveBillingMeterHttp: Layer.Layer<RetrieveBillingMeter, never, never>;
