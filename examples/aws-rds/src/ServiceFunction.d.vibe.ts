import * as AWS from "@alchemy.run/aws";
import * as Effect from "effect/Effect";
import { HttpServerRequest } from "effect/http/HttpServerRequest";
import * as HttpServerResponse from "effect/http/HttpServerResponse";
declare const ServiceFunction_base: Effect.Effect<AWS.Lambda.Function & import("alchemy").Rpc<ServiceFunction>, never, AWS.Providers> & import("alchemy").Named<"ServiceFunction"> & import("alchemy").PlatformIdentity<"ServiceFunction"> & (new (_: never) => {
    fetch: Effect.Effect<HttpServerResponse.HttpServerResponse, import("effect/http/HttpBody").HttpBodyError, HttpServerRequest | import("alchemy").RuntimeContext>;
} & import("alchemy").Named<"ServiceFunction"> & import("alchemy/Named").Tag<"AWS.Lambda.Function">);
export default class ServiceFunction extends ServiceFunction_base {
}
export {};
