import * as Layer from "effect/Layer";
import { CreateAccount } from "./CreateAccount.js";
/**
 * HTTP implementation of {@link CreateAccount}. Provide it on the
 * Function or Worker Effect.
 *
 * @layer
 * @product Account
 * @provides Stripe.CreateAccount
 */
export declare const CreateAccountHttp: Layer.Layer<CreateAccount, never, never>;
