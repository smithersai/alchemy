import * as Effect from "effect/Effect";
import { HttpServerRequest } from "effect/http/HttpServerRequest";
import * as HttpServerResponse from "effect/http/HttpServerResponse";
/**
 * The effectful MicroVM server, shared verbatim by the bun and node effectful
 * images so the only thing that differs between them is the JS runtime. Exposes
 * a raw `fetch` handler (with an `/echo` route) and a typed RPC `hello` method.
 */
export declare const effectfulImpl: Effect.Effect<{
    fetch: Effect.Effect<HttpServerResponse.HttpServerResponse, import("effect/http/HttpBody").HttpBodyError, HttpServerRequest>;
    hello: (message: string) => Effect.Effect<string, never, never>;
}, never, never>;
