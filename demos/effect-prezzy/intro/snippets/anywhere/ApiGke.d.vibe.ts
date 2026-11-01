import * as Kubernetes from "@alchemy.run/kubernetes";
import * as Effect from "effect/Effect";
import { HttpServerRequest } from "effect/http/HttpServerRequest";
import * as HttpServerResponse from "effect/http/HttpServerResponse";
declare const _default: Effect.Effect<Kubernetes.Deployment & import("alchemy").Rpc<{
    fetch: Effect.Effect<HttpServerResponse.HttpServerResponse, never, HttpServerRequest | import("alchemy").RuntimeContext>;
}> & import("alchemy").Named<"Api">, never, Kubernetes.Providers | import("@alchemy.run/gcp").Providers> & import("alchemy").Named<"Api"> & import("alchemy").PlatformIdentity<"Api">;
export default _default;
