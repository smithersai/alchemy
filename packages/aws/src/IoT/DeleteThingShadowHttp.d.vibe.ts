import * as Layer from "effect/Layer";
import { DeleteThingShadow } from "./DeleteThingShadow.js";
/**
 * HTTP implementation of the {@link DeleteThingShadow} capability — grants
 * `iot:DeleteThingShadow` on the thing ARN and calls the IoT data-plane
 * `DeleteThingShadow` API.
 */
export declare const DeleteThingShadowHttp: Layer.Layer<DeleteThingShadow, never, never>;
