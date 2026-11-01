import * as AWS from "@alchemy.run/aws";
import * as Effect from "effect/Effect";
declare const _default: Effect.Effect<AWS.Lambda.Function & import("alchemy").Rpc<{}> & import("alchemy").Named<"Archive">, never, AWS.Providers> & import("alchemy").Named<"Archive"> & import("alchemy").PlatformIdentity<"Archive">;
export default _default;
