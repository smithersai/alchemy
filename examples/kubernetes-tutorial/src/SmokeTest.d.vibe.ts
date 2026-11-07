import * as Kubernetes from "@alchemy.run/kubernetes";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
declare const _default: Effect.Effect<Kubernetes.Job & import("alchemy").Rpc<{
    run: Effect.Effect<void, never, HttpClient.HttpClient>;
}> & import("alchemy").Named<"SmokeTest">, never, Kubernetes.Providers | import("alchemy").Stage> & import("alchemy").Named<"SmokeTest"> & import("alchemy").PlatformIdentity<"SmokeTest">;
export default _default;
