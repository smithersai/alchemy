import * as AWS from "@alchemy.run/aws";
import * as Effect from "effect/Effect";
declare const EffectfulBun_base: Effect.Effect<AWS.Lambda.MicrovmImage & import("alchemy").Rpc<EffectfulBun> & import("alchemy").Dependencies<never>, never, AWS.Providers> & import("alchemy").Named<"MicrovmEffectfulBun"> & import("alchemy").PlatformIdentity<"MicrovmEffectfulBun"> & {
    new (_: never): {
        hello: (message: string) => Effect.Effect<string>;
    } & import("alchemy").Named<"MicrovmEffectfulBun"> & import("alchemy/Named").Tag<"AWS.Lambda.MicrovmImage">;
    make<PropsReq = never, InitReq = never>(props: Effect.Effect<import("alchemy").InputProps<AWS.Lambda.MicrovmImageProps, never>, import("effect/Config").ConfigError, PropsReq> | import("alchemy").InputProps<AWS.Lambda.MicrovmImageProps, never>, impl: Effect.Effect<{
        hello: (message: string) => Effect.Effect<string>;
    }, import("effect/Config").ConfigError, InitReq>): import("effect/Layer").Layer<EffectfulBun, never, AWS.Providers | Exclude<InitReq, AWS.Lambda.MicrovmImage | AWS.Lambda.MicrovmImageServices | import("alchemy").PlatformServices> | Exclude<PropsReq, AWS.Lambda.MicrovmImage | AWS.Lambda.MicrovmImageServices | import("alchemy").PlatformServices>>;
    of(shape: {
        hello: (message: string) => Effect.Effect<string>;
    } & AWS.Lambda.MicrovmImageShape): {
        hello: (message: string) => Effect.Effect<string>;
    };
};
/**
 * Effectful MicroVM image on **bun** — a bundled Effect program exposing a raw
 * `fetch` handler and a typed RPC `hello` method. Pairs with the bun baseline
 * ({@link import("./bun-image.vibe")}): same runtime + ARM_64 arch, the only
 * difference being the bundled Effect runtime / alchemy bootstrap. Compare to
 * {@link import("./effectful-node.vibe").EffectfulNode} for the node-vs-bun delta.
 */
export declare class EffectfulBun extends EffectfulBun_base {
}
declare const _default: import("effect/Layer").Layer<EffectfulBun, never, AWS.Providers>;
export default _default;
