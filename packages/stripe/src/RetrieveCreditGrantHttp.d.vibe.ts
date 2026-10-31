import * as Layer from "effect/Layer";
import { RetrieveCreditGrant } from "./RetrieveCreditGrant.js";
/**
 * HTTP implementation of {@link RetrieveCreditGrant}. Provide it on the
 * Function or Worker Effect.
 *
 * @layer
 * @product Billing
 * @provides Stripe.RetrieveCreditGrant
 */
export declare const RetrieveCreditGrantHttp: Layer.Layer<RetrieveCreditGrant, never, never>;
