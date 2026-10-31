import * as Layer from "effect/Layer";
import { GetConnection } from "./GetConnection.js";
/**
 * HTTP implementation of the {@link GetConnection} capability — grants
 * `iot:GetConnection` on the bound client filter and calls the IoT
 * data-plane `GetConnection` API.
 */
export declare const GetConnectionHttp: Layer.Layer<GetConnection, never, never>;
