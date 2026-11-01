import * as AWS from "@alchemy.run/aws";
import * as Effect from "effect/Effect";
declare const EffectfulNode_base: Effect.Effect<AWS.Lambda.MicrovmImage & import("alchemy").Rpc<EffectfulNode> & import("alchemy").Dependencies<never>, never, AWS.Providers> & import("alchemy").Named<"MicrovmEffectfulNode"> & import("alchemy").PlatformIdentity<"MicrovmEffectfulNode"> & {
    new (_: never): {
        hello: (message: string) => Effect.Effect<string>;
    } & import("alchemy").Named<"MicrovmEffectfulNode"> & import("alchemy/Named").Tag<"AWS.Lambda.MicrovmImage">;
    make<PropsReq = never, InitReq = never>(props: Effect.Effect<import("alchemy").InputProps<AWS.Lambda.MicrovmImageProps, never>, import("effect/Config").ConfigError, PropsReq> | import("alchemy").InputProps<AWS.Lambda.MicrovmImageProps, never>, impl: Effect.Effect<{
        hello: (message: string) => Effect.Effect<string>;
    }, import("effect/Config").ConfigError, InitReq>): import("effect/Layer").Layer<EffectfulNode, never, AWS.Providers | Exclude<InitReq, AWS.Lambda.MicrovmImage | AWS.Lambda.MicrovmImageServices | import("alchemy").PlatformServices> | Exclude<PropsReq, AWS.Lambda.MicrovmImage | AWS.Lambda.MicrovmImageServices | import("alchemy").PlatformServices>>;
    of(shape: {
        hello: (message: string) => Effect.Effect<string>;
    } & AWS.Lambda.MicrovmImageShape): {
        hello: (message: string) => Effect.Effect<string>;
    };
};
/**
 * Effectful MicroVM image on **node** — identical server to the bun effectful
 * {@link import("./effectful-bun.vibe").EffectfulBun}, but bundled for the node
 * runtime (`dnf install -y nodejs`, no bun install). Since the Lambda MicroVM
 * base ships node, this avoids the bun installer step entirely; comparing it to
 * the bun effectful isolates the runtime's contribution to cold start.
 */
export declare class EffectfulNode extends EffectfulNode_base {
}
declare const _default: import("effect/Layer").Layer<EffectfulNode, never, AWS.Providers>;
export default _default;
