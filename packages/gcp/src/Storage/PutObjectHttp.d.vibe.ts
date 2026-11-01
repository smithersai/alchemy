import * as Layer from "effect/Layer";
import { PutObject } from "./PutObject.js";
/**
 * HTTP implementation of {@link PutObject}.
 *
 * @layer
 * @provides GCP.Storage.PutObject
 */
export declare const PutObjectHttp: Layer.Layer<PutObject, never, never>;
