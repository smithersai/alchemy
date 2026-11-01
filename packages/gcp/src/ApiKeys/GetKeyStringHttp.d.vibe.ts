import * as Layer from "effect/Layer";
import { GetKeyString } from "./GetKeyString.js";
/**
 * HTTP implementation of {@link GetKeyString}.
 *
 * @layer
 * @provides GCP.ApiKeys.GetKeyString
 */
export declare const GetKeyStringHttp: Layer.Layer<GetKeyString, never, never>;
