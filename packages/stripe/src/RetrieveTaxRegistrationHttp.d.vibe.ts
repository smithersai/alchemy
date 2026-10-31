import * as Layer from "effect/Layer";
import { RetrieveTaxRegistration } from "./RetrieveTaxRegistration.js";
/**
 * HTTP implementation of {@link RetrieveTaxRegistration}. Provide it on
 * the Function or Worker Effect.
 *
 * @layer
 * @product Tax
 * @provides Stripe.RetrieveTaxRegistration
 */
export declare const RetrieveTaxRegistrationHttp: Layer.Layer<RetrieveTaxRegistration, never, never>;
