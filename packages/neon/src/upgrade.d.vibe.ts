import type { RuntimeContext } from "alchemy/RuntimeContext";
import * as Effect from "effect/Effect";
import * as HttpServerResponse from "effect/http/HttpServerResponse";
import { FunctionRequest } from "./FunctionEnvironment.js";
/**
 * Upgrade the current request using Neon's native WebSocket implementation.
 * Return `response` unchanged; rebuilding it discards the native upgrade metadata.
 * Authenticate the caller before accepting a public Function connection.
 */
export declare const upgrade: (options?: {
    protocol?: string;
}) => Effect.Effect<{
    socket: WebSocket;
    response: HttpServerResponse.HttpServerResponse;
}, never, RuntimeContext | FunctionRequest>;
