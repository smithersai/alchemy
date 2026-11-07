import * as AWS from "@alchemy.run/aws";
import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Alchemy from "alchemy";
import * as Effect from "effect/Effect";
import * as HttpServerResponse from "effect/http/HttpServerResponse";
declare const _default: Effect.Effect<AWS.Lambda.Function & Cloudflare.Rpc<{
    fetch: Effect.Effect<HttpServerResponse.HttpServerResponse, never, Alchemy.RuntimeContext>;
}> & Alchemy.Named<"Api">, never, AWS.Providers> & Alchemy.Named<"Api"> & Alchemy.PlatformIdentity<"Api">;
export default _default;
