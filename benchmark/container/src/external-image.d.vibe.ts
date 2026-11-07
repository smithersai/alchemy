import * as AWS from "@alchemy.run/aws";
import * as Effect from "effect/Effect";
declare const ExternalMicrovm_base: Effect.Effect<AWS.Lambda.MicrovmImage & import("alchemy").Rpc<ExternalMicrovm>, never, AWS.Providers> & import("alchemy").Named<"MicrovmBenchExternal"> & import("alchemy").PlatformIdentity<"MicrovmBenchExternal"> & {
    new (_: never): import("alchemy").Named<"MicrovmBenchExternal"> & import("alchemy/Named").Tag<"AWS.Lambda.MicrovmImage">;
    make<PropsReq = never, InitReq extends AWS.Lambda.MicrovmImageServices | import("alchemy").PlatformServices | AWS.Lambda.MicrovmImage = never>(props: Effect.Effect<import("alchemy").InputProps<AWS.Lambda.MicrovmImageProps, never>, import("effect/Config").ConfigError, PropsReq> | import("alchemy").InputProps<AWS.Lambda.MicrovmImageProps, never>, impl: Effect.Effect<AWS.Lambda.MicrovmImageShape, import("effect/Config").ConfigError, InitReq>): import("effect/Layer").Layer<ExternalMicrovm, never, AWS.Providers | Exclude<InitReq, AWS.Lambda.MicrovmImage | AWS.Lambda.MicrovmImageServices | import("alchemy").PlatformServices> | Exclude<PropsReq, AWS.Lambda.MicrovmImage | AWS.Lambda.MicrovmImageServices | import("alchemy").PlatformServices>>;
};
/**
 * Non-Effect ("external") MicroVM image — built server-side from a plain
 * Dockerfile (a tiny Python HTTP server on :8080). No Effect program is
 * bundled and no in-VM runtime is injected; it is the AWS analog of the
 * Cloudflare `bun`/`remote` container variants.
 */
export declare class ExternalMicrovm extends ExternalMicrovm_base {
}
declare const _default: import("effect/Layer").Layer<ExternalMicrovm, never, AWS.Providers>;
export default _default;
