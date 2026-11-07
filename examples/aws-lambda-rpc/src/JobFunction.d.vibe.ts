import * as AWS from "@alchemy.run/aws";
import * as Effect from "effect/Effect";
declare const JobFunction_base: Effect.Effect<AWS.Lambda.Function & import("alchemy").Rpc<JobFunction>, never, AWS.Providers> & import("alchemy").Named<"JobFunction"> & import("alchemy").PlatformIdentity<"JobFunction"> & (new (_: never) => {
    fetch: Effect.Effect<import("effect/http/HttpServerResponse").HttpServerResponse, never, import("effect/http/HttpServerRequest").HttpServerRequest | import("effect/Scope").Scope>;
} & import("alchemy").Named<"JobFunction"> & import("alchemy/Named").Tag<"AWS.Lambda.Function">);
export default class JobFunction extends JobFunction_base {
}
export {};
