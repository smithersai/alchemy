import * as Layer from "effect/Layer";
import { GenerateContent } from "./GenerateContent.js";
/**
 * HTTP implementation of {@link GenerateContent}.
 *
 * @layer
 * @provides GCP.AIPlatform.GenerateContent
 */
export declare const GenerateContentHttp: Layer.Layer<GenerateContent, never, never>;
