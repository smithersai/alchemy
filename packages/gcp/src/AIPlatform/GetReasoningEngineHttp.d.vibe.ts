import * as Layer from "effect/Layer";
import { GetReasoningEngine } from "./GetReasoningEngine.js";
/**
 * HTTP implementation of {@link GetReasoningEngine}.
 *
 * @layer
 * @provides GCP.AIPlatform.GetReasoningEngine
 */
export declare const GetReasoningEngineHttp: Layer.Layer<GetReasoningEngine, never, never>;
