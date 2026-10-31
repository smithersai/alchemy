import * as Layer from "effect/Layer";
import { UpdateAccount } from "./UpdateAccount.js";
/**
 * HTTP implementation of {@link UpdateAccount}. Provide it on the
 * Function or Worker Effect.
 *
 * @layer
 * @product Account
 * @provides Stripe.UpdateAccount
 */
export declare const UpdateAccountHttp: Layer.Layer<UpdateAccount, never, never>;
