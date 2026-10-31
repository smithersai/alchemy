import * as Layer from "effect/Layer";
import { UpdateThingShadow } from "./UpdateThingShadow.js";
/**
 * HTTP implementation of the {@link UpdateThingShadow} capability — grants
 * `iot:UpdateThingShadow` on the thing ARN and calls the IoT data-plane
 * `UpdateThingShadow` API.
 */
export declare const UpdateThingShadowHttp: Layer.Layer<UpdateThingShadow, never, never>;
