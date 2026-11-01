import * as Kubernetes from "@alchemy.run/kubernetes";
import * as Effect from "effect/Effect";
declare const _default: Effect.Effect<Kubernetes.Job & import("alchemy").Rpc<{
    run: Effect.Effect<void, never, import("alchemy").RuntimeContext>;
}> & import("alchemy").Named<"Report">, never, Kubernetes.Providers | import("@alchemy.run/gcp").Providers> & import("alchemy").Named<"Report"> & import("alchemy").PlatformIdentity<"Report">;
export default _default;
