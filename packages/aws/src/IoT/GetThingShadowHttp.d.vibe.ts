import * as Layer from "effect/Layer";
import { GetThingShadow } from "./GetThingShadow.js";
/**
 * HTTP implementation of the {@link GetThingShadow} capability — grants
 * `iot:GetThingShadow` on the thing ARN and calls the IoT data-plane
 * `GetThingShadow` API.
 */
export declare const GetThingShadowHttp: Layer.Layer<GetThingShadow, never, never>;
