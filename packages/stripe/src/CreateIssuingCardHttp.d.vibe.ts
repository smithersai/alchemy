import * as Layer from "effect/Layer";
import { CreateIssuingCard } from "./CreateIssuingCard.js";
/**
 * HTTP implementation of {@link CreateIssuingCard}. Provide it on the
 * Function or Worker Effect.
 *
 * @layer
 * @product Issuing
 * @provides Stripe.CreateIssuingCard
 */
export declare const CreateIssuingCardHttp: Layer.Layer<CreateIssuingCard, never, never>;
