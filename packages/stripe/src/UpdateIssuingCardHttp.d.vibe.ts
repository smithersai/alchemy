import * as Layer from "effect/Layer";
import { UpdateIssuingCard } from "./UpdateIssuingCard.vibe";
/**
 * HTTP implementation of {@link UpdateIssuingCard}. Provide it on the
 * Function or Worker Effect.
 *
 * @layer
 * @product Issuing
 * @provides Stripe.UpdateIssuingCard
 */
export declare const UpdateIssuingCardHttp: Layer.Layer<UpdateIssuingCard, never, never>;
