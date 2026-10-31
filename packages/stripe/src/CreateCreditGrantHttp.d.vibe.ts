import * as Layer from "effect/Layer";
import { CreateCreditGrant } from "./CreateCreditGrant.js";
/**
 * HTTP implementation of {@link CreateCreditGrant}. Provide it on the
 * Function or Worker Effect.
 *
 * @layer
 * @product Billing
 * @provides Stripe.CreateCreditGrant
 */
export declare const CreateCreditGrantHttp: Layer.Layer<CreateCreditGrant, never, never>;
