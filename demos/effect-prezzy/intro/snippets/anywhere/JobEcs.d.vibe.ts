import * as AWS from "@alchemy.run/aws";
import * as Effect from "effect/Effect";
declare const _default: Effect.Effect<AWS.ECS.Task & import("alchemy").Rpc<{
    run: Effect.Effect<void, never, import("alchemy").RuntimeContext>;
}> & import("alchemy").Named<"Report">, never, AWS.Providers> & import("alchemy").Named<"Report"> & import("alchemy").PlatformIdentity<"Report">;
export default _default;
