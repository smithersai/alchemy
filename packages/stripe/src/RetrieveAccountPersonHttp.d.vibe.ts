import * as Layer from "effect/Layer";
import { RetrieveAccountPerson } from "./RetrieveAccountPerson.js";
/**
 * HTTP implementation of {@link RetrieveAccountPerson}. Retrieve takes
 * both `account` and `person`.
 *
 * @layer
 * @product Account
 * @provides Stripe.RetrieveAccountPerson
 */
export declare const RetrieveAccountPersonHttp: Layer.Layer<RetrieveAccountPerson, never, never>;
