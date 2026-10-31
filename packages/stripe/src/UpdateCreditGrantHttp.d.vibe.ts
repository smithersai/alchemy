import * as Layer from "effect/Layer";
import { UpdateCreditGrant } from "./UpdateCreditGrant.js";
/**
 * HTTP implementation of {@link UpdateCreditGrant}. Provide it on the
 * Function or Worker Effect.
 *
 * @layer
 * @product Billing
 * @provides Stripe.UpdateCreditGrant
 */
export declare const UpdateCreditGrantHttp: Layer.Layer<UpdateCreditGrant, never, never>;
