import * as AWS from "@alchemy.run/aws";
import * as Effect from "effect/Effect";
declare const NodeMicrovm_base: Effect.Effect<AWS.Lambda.MicrovmImage & import("alchemy").Rpc<NodeMicrovm>, never, AWS.Providers> & import("alchemy").Named<"MicrovmBenchNode"> & import("alchemy").PlatformIdentity<"MicrovmBenchNode"> & {
    new (_: never): import("alchemy").Named<"MicrovmBenchNode"> & import("alchemy/Named").Tag<"AWS.Lambda.MicrovmImage">;
    make<PropsReq = never, InitReq extends AWS.Lambda.MicrovmImageServices | import("alchemy").PlatformServices | AWS.Lambda.MicrovmImage = never>(props: Effect.Effect<import("alchemy").InputProps<AWS.Lambda.MicrovmImageProps, never>, import("effect/Config").ConfigError, PropsReq> | import("alchemy").InputProps<AWS.Lambda.MicrovmImageProps, never>, impl: Effect.Effect<AWS.Lambda.MicrovmImageShape, import("effect/Config").ConfigError, InitReq>): import("effect/Layer").Layer<NodeMicrovm, never, AWS.Providers | Exclude<InitReq, AWS.Lambda.MicrovmImage | AWS.Lambda.MicrovmImageServices | import("alchemy").PlatformServices> | Exclude<PropsReq, AWS.Lambda.MicrovmImage | AWS.Lambda.MicrovmImageServices | import("alchemy").PlatformServices>>;
};
/**
 * Node baseline MicroVM image — the dumbest possible `http.createServer`
 * server, built from `contexts/microvm-node/` the same way alchemy builds the
 * effectful node {@link import("./effectful-node.ts").EffectfulNode} image (same
 * MicroVM base, same `dnf install -y nodejs`, same ARM_64 arch, same 512 MiB).
 * `effectfulNode.readyMs − node.readyMs` isolates the alchemy/Effect cold-start
 * tax on the runtime the Lambda VMs already ship.
 */
export declare class NodeMicrovm extends NodeMicrovm_base {
}
declare const _default: import("effect/Layer").Layer<NodeMicrovm, never, AWS.Providers>;
export default _default;
