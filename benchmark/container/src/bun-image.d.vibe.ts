import * as AWS from "@alchemy.run/aws";
import * as Effect from "effect/Effect";
declare const BunMicrovm_base: Effect.Effect<AWS.Lambda.MicrovmImage & import("alchemy").Rpc<BunMicrovm>, never, AWS.Providers> & import("alchemy").Named<"MicrovmBenchBun"> & import("alchemy").PlatformIdentity<"MicrovmBenchBun"> & {
    new (_: never): import("alchemy").Named<"MicrovmBenchBun"> & import("alchemy/Named").Tag<"AWS.Lambda.MicrovmImage">;
    make<PropsReq = never, InitReq extends AWS.Lambda.MicrovmImageServices | import("alchemy").PlatformServices | AWS.Lambda.MicrovmImage = never>(props: Effect.Effect<import("alchemy").InputProps<AWS.Lambda.MicrovmImageProps, never>, import("effect/Config").ConfigError, PropsReq> | import("alchemy").InputProps<AWS.Lambda.MicrovmImageProps, never>, impl: Effect.Effect<AWS.Lambda.MicrovmImageShape, import("effect/Config").ConfigError, InitReq>): import("effect/Layer").Layer<BunMicrovm, never, AWS.Providers | Exclude<InitReq, AWS.Lambda.MicrovmImage | AWS.Lambda.MicrovmImageServices | import("alchemy").PlatformServices> | Exclude<PropsReq, AWS.Lambda.MicrovmImage | AWS.Lambda.MicrovmImageServices | import("alchemy").PlatformServices>>;
};
/**
 * Bun baseline MicroVM image — the dumbest possible `Bun.serve` HTTP server,
 * built from `contexts/microvm-bun/` the same way alchemy builds the effectful
 * {@link import("./effectful-bun.vibe").EffectfulBun} image (same MicroVM base, same bun install, same ARM_64 arch,
 * same 512 MiB). The only difference is the absence of the Effect runtime and
 * the alchemy bootstrap, so `effectful.readyMs − bun.readyMs` isolates the
 * cold-start cost of alchemy's Effect abstraction with the runtime and CPU
 * architecture held constant.
 */
export declare class BunMicrovm extends BunMicrovm_base {
}
declare const _default: import("effect/Layer").Layer<BunMicrovm, never, AWS.Providers>;
export default _default;
