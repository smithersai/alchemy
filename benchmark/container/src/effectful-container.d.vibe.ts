import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Effect from "effect/Effect";
declare const EffectfulContainer_base: Cloudflare.Container.Decl<EffectfulContainer, {
    ping: () => Effect.Effect<string>;
}, "BenchEffectfulContainer", Cloudflare.Container.Application<EffectfulContainer>, unknown>;
/**
 * Minimal Effect-native container for the cold-start benchmark. Alchemy bundles
 * this file's Effect program into a generated image; the DO proxies a trivial
 * `ping()` RPC into it, which is enough to prove the container is up and
 * accepting connections on its RPC port.
 */
export declare class EffectfulContainer extends EffectfulContainer_base {
}
declare const _default: import("effect/Layer").Layer<Cloudflare.Container.Application<EffectfulContainer>, never, Cloudflare.Providers>;
export default _default;
