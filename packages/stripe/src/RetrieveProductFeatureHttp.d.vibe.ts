import * as Layer from "effect/Layer";
import { RetrieveProductFeature } from "./RetrieveProductFeature.js";
/**
 * HTTP implementation of {@link RetrieveProductFeature}. The list-item
 * retrieve takes both `product` and `id`.
 *
 * @layer
 * @product Product
 * @provides Stripe.RetrieveProductFeature
 */
export declare const RetrieveProductFeatureHttp: Layer.Layer<RetrieveProductFeature, never, never>;
