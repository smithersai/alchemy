import * as Layer from "effect/Layer";
import { Predict } from "./Predict.vibe";
/**
 * HTTP implementation of {@link Predict}.
 *
 * @layer
 * @provides GCP.Retail.Predict
 */
export declare const PredictHttp: Layer.Layer<Predict, never, never>;
