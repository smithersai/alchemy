import * as Layer from "effect/Layer";
import { GetProcessor } from "./GetProcessor.vibe";
/**
 * HTTP implementation of {@link GetProcessor}.
 *
 * @layer
 * @provides GCP.DocumentAI.GetProcessor
 */
export declare const GetProcessorHttp: Layer.Layer<GetProcessor, never, never>;
