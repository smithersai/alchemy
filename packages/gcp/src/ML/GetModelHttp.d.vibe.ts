import * as Layer from "effect/Layer";
import { GetModel } from "./GetModel.vibe";
/**
 * HTTP implementation of {@link GetModel}.
 *
 * @layer
 * @provides GCP.ML.GetModel
 */
export declare const GetModelHttp: Layer.Layer<GetModel, never, never>;
