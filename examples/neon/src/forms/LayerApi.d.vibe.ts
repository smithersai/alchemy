import * as Neon from "@alchemy.run/neon";
import * as Effect from "effect/Effect";
declare const LayerApi_base: Effect.Effect<Neon.Function & import("alchemy").Rpc<LayerApi>, never, Neon.Providers> & import("alchemy").Named<"LayerApi"> & import("alchemy").PlatformIdentity<"LayerApi"> & {
    new (_: never): import("alchemy").Named<"LayerApi"> & import("alchemy/Named").Tag<"Neon.Function">;
    make<PropsReq = never, InitReq extends Neon.FunctionEnvironment | import("alchemy").PlatformServices | Neon.Function = never>(props: Effect.Effect<import("alchemy").InputProps<Neon.FunctionProps, never>, import("effect/Config").ConfigError, PropsReq> | import("alchemy").InputProps<Neon.FunctionProps, never>, impl: Effect.Effect<import("alchemy").Main<Neon.FunctionEnvironment | Neon.FunctionRequest>, import("effect/Config").ConfigError, InitReq>): import("effect/Layer").Layer<LayerApi, never, Neon.Providers | Exclude<InitReq, Neon.Function | Neon.FunctionEnvironment | import("alchemy").PlatformServices> | Exclude<PropsReq, Neon.Function | Neon.FunctionEnvironment | import("alchemy").PlatformServices>>;
};
export declare class LayerApi extends LayerApi_base {
}
declare const _default: import("effect/Layer").Layer<LayerApi, never, Neon.Providers>;
export default _default;
