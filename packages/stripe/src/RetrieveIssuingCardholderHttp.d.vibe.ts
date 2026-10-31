import * as Layer from "effect/Layer";
import { RetrieveIssuingCardholder } from "./RetrieveIssuingCardholder.js";
/**
 * HTTP implementation of {@link RetrieveIssuingCardholder}. Provide it on
 * the Function or Worker Effect.
 *
 * @layer
 * @product Issuing
 * @provides Stripe.RetrieveIssuingCardholder
 */
export declare const RetrieveIssuingCardholderHttp: Layer.Layer<RetrieveIssuingCardholder, never, never>;
