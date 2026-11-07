import * as Kubernetes from "@alchemy.run/kubernetes";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
declare const _default: Effect.Effect<Kubernetes.Job & import("alchemy").Rpc<{
    run: Effect.Effect<void, never, HttpClient.HttpClient>;
}> & import("alchemy").Named<"HealthCheck">, never, Kubernetes.Providers | import("alchemy").Stage> & import("alchemy").Named<"HealthCheck"> & import("alchemy").PlatformIdentity<"HealthCheck">;
export default _default;
