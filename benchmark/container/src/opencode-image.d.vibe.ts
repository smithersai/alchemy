import * as AWS from "@alchemy.run/aws";
import * as Effect from "effect/Effect";
declare const OpencodeMicrovm_base: Effect.Effect<AWS.Lambda.MicrovmImage & import("alchemy").Rpc<OpencodeMicrovm>, never, AWS.Providers> & import("alchemy").Named<"MicrovmBenchOpencode"> & import("alchemy").PlatformIdentity<"MicrovmBenchOpencode"> & {
    new (_: never): import("alchemy").Named<"MicrovmBenchOpencode"> & import("alchemy/Named").Tag<"AWS.Lambda.MicrovmImage">;
    make<PropsReq = never, InitReq extends AWS.Lambda.MicrovmImageServices | import("alchemy").PlatformServices | AWS.Lambda.MicrovmImage = never>(props: Effect.Effect<import("alchemy").InputProps<AWS.Lambda.MicrovmImageProps, never>, import("effect/Config").ConfigError, PropsReq> | import("alchemy").InputProps<AWS.Lambda.MicrovmImageProps, never>, impl: Effect.Effect<AWS.Lambda.MicrovmImageShape, import("effect/Config").ConfigError, InitReq>): import("effect/Layer").Layer<OpencodeMicrovm, never, AWS.Providers | Exclude<InitReq, AWS.Lambda.MicrovmImage | AWS.Lambda.MicrovmImageServices | import("alchemy").PlatformServices> | Exclude<PropsReq, AWS.Lambda.MicrovmImage | AWS.Lambda.MicrovmImageServices | import("alchemy").PlatformServices>>;
};
/**
 * MicroVM image running an eagerly-started opencode server (a real coding
 * agent, ~100 MB binary on a Bun runtime). The Dockerfile's ENTRYPOINT is
 * `opencode serve`; the MicroVM image build runs it and snapshots the running
 * memory+disk, so every `RunMicrovm` resumes from a snapshot where the server
 * is ALREADY listening — the process startup cost is paid once at build time,
 * not on each boot. Compare with the Cloudflare
 * {@link import("./opencode-container.ts").OpencodeContainer}, which starts
 * the same image's entrypoint from scratch on every cold start.
 */
export declare class OpencodeMicrovm extends OpencodeMicrovm_base {
}
declare const _default: import("effect/Layer").Layer<OpencodeMicrovm, never, AWS.Providers>;
export default _default;
