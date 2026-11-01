import * as Layer from "effect/Layer";
import { GetTrainingPipeline } from "./GetTrainingPipeline.vibe";
/**
 * HTTP implementation of {@link GetTrainingPipeline}.
 *
 * @layer
 * @provides GCP.AIPlatform.GetTrainingPipeline
 */
export declare const GetTrainingPipelineHttp: Layer.Layer<GetTrainingPipeline, never, never>;
