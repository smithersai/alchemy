import * as Layer from "effect/Layer";
import { CreateAccountLink } from "./CreateAccountLink.js";
/**
 * HTTP implementation of {@link CreateAccountLink}. Provide it on the
 * Function or Worker Effect.
 *
 * @layer
 * @product Account
 * @provides Stripe.CreateAccountLink
 */
export declare const CreateAccountLinkHttp: Layer.Layer<CreateAccountLink, never, never>;
