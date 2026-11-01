import * as Layer from "effect/Layer";
import { GetFunction } from "./GetFunction.js";
/**
 * HTTP implementation of {@link GetFunction}.
 *
 * @layer
 * @provides GCP.CloudFunctions.GetFunction
 */
export declare const GetFunctionHttp: Layer.Layer<GetFunction, never, never>;
