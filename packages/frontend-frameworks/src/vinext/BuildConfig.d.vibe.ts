import * as Effect from "effect/Effect";
import type { PluginOption } from "vite";
/** The `vinext()` options that locate the app and its build outputs. */
export interface VinextRouteRootConfig {
    readonly appDir?: string;
    readonly clientOutDir?: string;
    readonly rscOutDir?: string;
    readonly ssrOutDir?: string;
}
/** Keep native configuration objects intact when forwarding them between build phases. */
export declare const loadVinextBuildConfig: (root: string, plugins: PluginOption[] | undefined) => Effect.Effect<{
    /** Inline `vinext({ nextConfig })` before resolution, or undefined for a next.config file. */
    nextConfigInput: any;
    cacheConfig: any;
    nextConfig: any;
    rscCompatibilityId: any;
    prerenderConfig: any;
    routeRootConfig: any;
    buildIdentity: string | undefined;
    responseVary: string | undefined;
    requestRouting: string | undefined;
    isResponsePolicyHeader: (name: string) => infer _;
}, import("../core/Loader.vibe").ModuleLoadError | import("effect/Cause").UnknownError, never>;
export type VinextBuildConfig = Effect.Success<ReturnType<typeof loadVinextBuildConfig>>;
