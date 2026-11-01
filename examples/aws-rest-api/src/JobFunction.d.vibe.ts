import * as AWS from "@alchemy.run/aws";
import * as Effect from "effect/Effect";
import * as HttpServerResponse from "effect/http/HttpServerResponse";
declare const JobFunction_base: Effect.Effect<AWS.Lambda.Function & import("alchemy").Rpc<AWS.Lambda.Function>, never, AWS.Providers> & import("alchemy").Named<"JobFunction"> & import("alchemy").PlatformIdentity<"JobFunction"> & (new (_: never) => {
    fetch: Effect.Effect<HttpServerResponse.HttpServerResponse, never, never>;
} & import("alchemy").Named<"JobFunction"> & import("alchemy/Named").Tag<"AWS.Lambda.Function">);
/**
 * Minimal Lambda for API Gateway `AWS_PROXY` — returns plain text.
 */
export default class JobFunction extends JobFunction_base {
}
export {};
