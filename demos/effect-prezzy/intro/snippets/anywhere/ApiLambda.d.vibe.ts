import * as AWS from "@alchemy.run/aws";
import * as Effect from "effect/Effect";
import { HttpServerRequest } from "effect/http/HttpServerRequest";
import * as HttpServerResponse from "effect/http/HttpServerResponse";
declare const _default: Effect.Effect<AWS.Lambda.Function & import("alchemy").Rpc<{
    fetch: Effect.Effect<HttpServerResponse.HttpServerResponse, never, HttpServerRequest | import("alchemy").RuntimeContext>;
}> & import("alchemy").Named<"Api">, never, AWS.Providers> & import("alchemy").Named<"Api"> & import("alchemy").PlatformIdentity<"Api">;
export default _default;
