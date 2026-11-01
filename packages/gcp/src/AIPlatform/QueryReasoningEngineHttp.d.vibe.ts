import * as Layer from "effect/Layer";
import { QueryReasoningEngine } from "./QueryReasoningEngine.js";
/**
 * HTTP implementation of {@link QueryReasoningEngine}.
 *
 * @layer
 * @provides GCP.AIPlatform.QueryReasoningEngine
 */
export declare const QueryReasoningEngineHttp: Layer.Layer<QueryReasoningEngine, never, never>;
