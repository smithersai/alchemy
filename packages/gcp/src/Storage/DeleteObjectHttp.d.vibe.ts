import * as Layer from "effect/Layer";
import { DeleteObject } from "./DeleteObject.vibe";
/**
 * HTTP implementation of {@link DeleteObject}.
 *
 * @layer
 * @provides GCP.Storage.DeleteObject
 */
export declare const DeleteObjectHttp: Layer.Layer<DeleteObject, never, never>;
