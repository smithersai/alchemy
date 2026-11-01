import * as Layer from "effect/Layer";
import { GetAuthString } from "./GetAuthString.js";
/**
 * HTTP implementation of {@link GetAuthString}.
 *
 * @layer
 * @provides GCP.Redis.GetAuthString
 */
export declare const GetAuthStringHttp: Layer.Layer<GetAuthString, never, never>;
