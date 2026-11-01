import type { ProviderMode } from "alchemy/ProviderMode";
import * as Effect from "effect/Effect";
declare const HttpBindingUnsupportedInDev_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "Cloudflare.HttpBindingUnsupportedInDev";
} & Readonly<A>;
/**
 * A token-scoped `*Http` binding bound to a resource that `alchemy dev`
 * emulates locally. The HTTP client calls the real Cloudflare API with a
 * real token, which can't reach the local simulator's `dev:` resources.
 */
export declare class HttpBindingUnsupportedInDev extends HttpBindingUnsupportedInDev_base<{
    message: string;
    logicalId: string;
}> {
}
/**
 * Fail an `*Http` binding at deploy time when its resource is emulated
 * locally. Resources opted out with `Alchemy.remote()` and types with no
 * local provider run live, so their HTTP bindings keep working in dev.
 */
export declare const requireLiveResource: (resource: {
    readonly Type: string;
    readonly LogicalId: string;
    readonly Mode?: ProviderMode | undefined;
}) => Effect.Effect<undefined, never, never>;
export {};
