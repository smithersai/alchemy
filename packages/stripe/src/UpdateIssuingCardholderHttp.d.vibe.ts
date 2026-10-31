import * as Layer from "effect/Layer";
import { UpdateIssuingCardholder } from "./UpdateIssuingCardholder.js";
/**
 * HTTP implementation of {@link UpdateIssuingCardholder}. Provide it on
 * the Function or Worker Effect.
 *
 * @layer
 * @product Issuing
 * @provides Stripe.UpdateIssuingCardholder
 */
export declare const UpdateIssuingCardholderHttp: Layer.Layer<UpdateIssuingCardholder, never, never>;
