import * as Layer from "effect/Layer";
import { RetrieveAccount } from "./RetrieveAccount.js";
/**
 * HTTP implementation of {@link RetrieveAccount}. Provide it on the
 * Function or Worker Effect.
 *
 * @layer
 * @product Account
 * @provides Stripe.RetrieveAccount
 */
export declare const RetrieveAccountHttp: Layer.Layer<RetrieveAccount, never, never>;
