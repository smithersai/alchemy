import { Credentials } from "@distilled.cloud/gcp/Credentials";
import * as HttpClient from "effect/http/HttpClient";
import * as Layer from "effect/Layer";
import { StopPipeline } from "./StopPipeline.vibe";
/**
 * HTTP implementation of {@link StopPipeline}.
 *
 * @layer
 * @provides GCP.DataPipelines.StopPipeline
 */
export declare const StopPipelineHttp: Layer.Layer<StopPipeline, never, Credentials | HttpClient.HttpClient>;
