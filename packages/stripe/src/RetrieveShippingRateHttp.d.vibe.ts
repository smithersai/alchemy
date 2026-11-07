import * as Layer from "effect/Layer";
import { RetrieveShippingRate } from "./RetrieveShippingRate.vibe";
/**
 * HTTP implementation of {@link RetrieveShippingRate}. Provide it on the
 * Function or Worker Effect.
 *
 * @layer
 * @product Product
 * @provides Stripe.RetrieveShippingRate
 */
export declare const RetrieveShippingRateHttp: Layer.Layer<RetrieveShippingRate, never, never>;
