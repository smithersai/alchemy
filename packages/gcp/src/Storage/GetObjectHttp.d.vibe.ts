import * as Layer from "effect/Layer";
import { GetObject } from "./GetObject.vibe";
/**
 * HTTP implementation of {@link GetObject}.
 *
 * @layer
 * @provides GCP.Storage.GetObject
 */
export declare const GetObjectHttp: Layer.Layer<GetObject, never, never>;
