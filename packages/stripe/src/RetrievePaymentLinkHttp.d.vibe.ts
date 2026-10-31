import * as Layer from "effect/Layer";
import { RetrievePaymentLink } from "./RetrievePaymentLink.js";
/**
 * HTTP implementation of {@link RetrievePaymentLink}. Provide it on the
 * Function or Worker Effect.
 *
 * @layer
 * @product Checkout
 * @provides Stripe.RetrievePaymentLink
 */
export declare const RetrievePaymentLinkHttp: Layer.Layer<RetrievePaymentLink, never, never>;
