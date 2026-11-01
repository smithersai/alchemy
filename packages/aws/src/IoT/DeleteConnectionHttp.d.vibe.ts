import * as Layer from "effect/Layer";
import { DeleteConnection } from "./DeleteConnection.vibe";
/**
 * HTTP implementation of the {@link DeleteConnection} capability — grants
 * `iot:DeleteConnection` on the bound client filter and calls the IoT
 * data-plane `DeleteConnection` API.
 */
export declare const DeleteConnectionHttp: Layer.Layer<DeleteConnection, never, never>;
