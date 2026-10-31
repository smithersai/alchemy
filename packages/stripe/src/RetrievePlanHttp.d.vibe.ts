import * as Layer from "effect/Layer";
import { RetrievePlan } from "./RetrievePlan.js";
/**
 * HTTP implementation of {@link RetrievePlan}. Provide it on the
 * Function or Worker Effect.
 *
 * @layer
 * @product Product
 * @provides Stripe.RetrievePlan
 */
export declare const RetrievePlanHttp: Layer.Layer<RetrievePlan, never, never>;
