import * as Layer from "effect/Layer";
import { UpdateCustomer } from "./UpdateCustomer.js";
/**
 * HTTP implementation of {@link UpdateCustomer}. Provide it on the
 * Function or Worker Effect.
 *
 * @layer
 * @product Customer
 * @provides Stripe.UpdateCustomer
 */
export declare const UpdateCustomerHttp: Layer.Layer<UpdateCustomer, never, never>;
