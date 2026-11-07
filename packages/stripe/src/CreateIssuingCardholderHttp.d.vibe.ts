import * as Layer from "effect/Layer";
import { CreateIssuingCardholder } from "./CreateIssuingCardholder.vibe";
/**
 * HTTP implementation of {@link CreateIssuingCardholder}. Provide it on
 * the Function or Worker Effect.
 *
 * @layer
 * @product Issuing
 * @provides Stripe.CreateIssuingCardholder
 */
export declare const CreateIssuingCardholderHttp: Layer.Layer<CreateIssuingCardholder, never, never>;
