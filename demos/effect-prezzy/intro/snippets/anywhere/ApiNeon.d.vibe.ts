import * as Neon from "@alchemy.run/neon";
import * as Effect from "effect/Effect";
import { HttpServerRequest } from "effect/http/HttpServerRequest";
import * as HttpServerResponse from "effect/http/HttpServerResponse";
declare const _default: Effect.Effect<Neon.Function & import("alchemy").Rpc<{
    fetch: Effect.Effect<HttpServerResponse.HttpServerResponse, never, HttpServerRequest | import("alchemy").RuntimeContext>;
}> & import("alchemy").Named<"Api">, never, Neon.Providers> & import("alchemy").Named<"Api"> & import("alchemy").PlatformIdentity<"Api">;
export default _default;
