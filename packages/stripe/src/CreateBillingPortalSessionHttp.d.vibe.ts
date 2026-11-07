import * as Layer from "effect/Layer";
import { CreateBillingPortalSession } from "./CreateBillingPortalSession.vibe";
/**
 * HTTP implementation of {@link CreateBillingPortalSession}. Provide it on
 * the Function or Worker Effect.
 *
 * @layer
 * @product Billing
 * @provides Stripe.CreateBillingPortalSession
 */
export declare const CreateBillingPortalSessionHttp: Layer.Layer<CreateBillingPortalSession, never, never>;
