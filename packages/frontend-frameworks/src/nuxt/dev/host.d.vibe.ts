import * as Effect from "effect/Effect";
import type * as Scope from "effect/Scope";
/**
 * Cloudflare dev transport — HOST half.
 *
 * Runs in the alchemy / e2e-harness process: opens `cloudflare-runtime`'s
 * platform proxy (a local workerd instance hosting the configured binding
 * hooks behind the internal proxy worker) and produces the
 * {@link NuxtDevPlatform} the framework half injects into `loadNuxt`
 * overrides — the dev-only nitro plugin (`./plugin.ts`) plus the
 * `runtimeConfig` connect info. The proxy's entire client state is
 * `connectInfo: { url, token }` — two plain strings — which is what lets
 * the nitro dev SSR worker THREAD reconstruct the platform over HTTP
 * (`platform-proxy/connect`) with live-shared binding state.
 */
import { DeployTargetError } from "../../core/index.js";
import type { NuxtDevPlatform, NuxtDevPlatformContext } from "../Nuxt.vibe";
/**
 * The runtime-free client subpath of `cloudflare-runtime` the dev plugin is
 * built on. Resolved HOST-side (this package depends on
 * `cloudflare-runtime`) to an absolute path the dev worker imports
 * directly — the worker itself cannot resolve the bare specifier when
 * `cloudflare-runtime` is only a transitive dependency of the project.
 */
export declare const CLIENT_MODULE_SPECIFIER = "@alchemy.run/cloudflare-runtime/core/platform-proxy/connect";
/** Resolve the absolute path of the shipped dev-only nitro plugin. */
export declare const resolveDevPluginPath: () => string;
/** Resolve {@link CLIENT_MODULE_SPECIFIER} to an absolute file path. */
export declare const resolveClientModulePath: () => string;
/** What the dev platform needs back from an opened proxy. */
export interface DevProxyHandle {
    /** Base URL of the proxy workerd instance. */
    readonly url: string;
    /** The instance's auth token. */
    readonly token: string;
    /** Tear the proxy down. Safe to call multiple times. */
    readonly dispose: () => Promise<void>;
}
export interface OpenDevProxyOptions {
    readonly name: string;
    readonly compatibilityDate?: string | undefined;
    readonly compatibilityFlags?: ReadonlyArray<string> | undefined;
    /** `cloudflare-runtime` binding hooks (opaque through the framework half). */
    readonly bindings: ReadonlyArray<unknown>;
    /**
     * Pre-built `Context<RuntimeServices>` to host the proxy in (opaque
     * through the framework half). Enables remote()-lowered bindings, which
     * the proxy's internal local-only layer cannot serve.
     */
    readonly services?: unknown;
    /** Static assets served to an `Assets.local` binding. */
    readonly assets?: {
        readonly directory: string;
    } | undefined;
}
/** How the platform proxy is opened. A test seam; the default is {@link openPlatformProxy}. */
export type OpenDevProxy = (options: OpenDevProxyOptions) => Promise<DevProxyHandle>;
/**
 * The default opener: `cloudflare-runtime`'s `getPlatformProxy` (imported
 * lazily so production builds never load the runtime machinery). The
 * instance's `connectInfo` carries everything the dev plugin needs.
 */
export declare const openPlatformProxy: OpenDevProxy;
export interface CloudflareDevPlatformOptions {
    /** Name of the proxy workerd service. @default "nuxt-dev-platform-proxy" */
    readonly name?: string | undefined;
    /** Compatibility date for the binding-proxy workerd instance. */
    readonly compatibilityDate?: string | undefined;
    /** Compatibility flags for the binding-proxy workerd instance. */
    readonly compatibilityFlags?: ReadonlyArray<string> | undefined;
    /** Override how the proxy is opened. A test seam. */
    readonly openProxy?: OpenDevProxy | undefined;
}
/**
 * The Cloudflare target's dev platform: open the proxy (scoped — closing
 * the Scope disposes the workerd instance) and hand the framework half the
 * nitro plugin + `runtimeConfig` connect info to inject.
 */
export declare const makeCloudflareDevPlatform: (options?: CloudflareDevPlatformOptions) => (context: NuxtDevPlatformContext) => Effect.Effect<NuxtDevPlatform, DeployTargetError, Scope.Scope>;
