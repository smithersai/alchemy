import type { Module } from "@alchemy.run/cloudflare-runtime/core";
/**
 * Wrangler-free workerd prerenderer: the build-side driver of the
 * `__astro_*` prerender protocol, ported from `@astrojs/cloudflare` v14.4.2
 * (`src/prerenderer.ts`).
 *
 * Upstream boots a Vite preview server wrapped around
 * `@cloudflare/vite-plugin` to host the built `prerender` environment. We
 * skip the preview-server indirection entirely: the built output under
 * `dist/server/.prerender/` is loaded from disk into workerd via
 * `cloudflare-runtime`'s `Runtime.start`, with the same bindings, assets
 * directory, and compatibility settings as the entry worker — so prerendered
 * pages render in the same runtime that serves them in production
 * (top-level `cloudflare:*` imports included).
 *
 * Protocol (served by the vendored runtime handler when
 * `virtual:astro-cloudflare:config`'s `isPrerender` is true):
 * - `POST /__astro_static_paths` → all paths to prerender (serialized routes)
 * - `POST /__astro_prerender` → renders one page, framed with its render
 *   metadata (`runtime/utils/prerender-response.ts`); a failure is signalled
 *   via the `x-astro-prerender-error` response header
 *
 * This module is heavyweight (Effect + cloudflare-runtime); the integration
 * imports it lazily inside the `astro:build:start` hook so `astro dev` and
 * node-mode builds never load it.
 */
import type { CloudflareVitePluginOptions } from "@alchemy.run/cloudflare-runtime/vite";
import type { AstroConfig, AstroPrerenderer } from "astro";
export interface WorkerdPrerendererOptions {
    /** `config.build.server` — the prerender build lives in `.prerender/` inside it. */
    readonly serverDir: URL;
    /** `config.build.client` — served as the worker's assets directory. */
    readonly clientDir: URL;
    /** `config.trailingSlash` — needed to serialize route data for the protocol. */
    readonly trailingSlash: AstroConfig["trailingSlash"];
    /**
     * The integration's `@alchemy.run/cloudflare-runtime/vite` options: the
     * prerender worker reuses the entry worker's name, bindings, assets
     * options, compatibility settings, and (optionally) runtime context.
     */
    readonly vite?: CloudflareVitePluginOptions | undefined;
}
/**
 * Creates the workerd prerenderer registered via `setPrerenderer` in the
 * `astro:build:start` hook when `prerenderEnvironment` is `"workerd"`.
 */
export declare function createWorkerdPrerenderer(options: WorkerdPrerendererOptions): AstroPrerenderer;
/**
 * Loads the prerender environment's build output from disk as workerd
 * modules. Module names are output-relative POSIX paths, so the bundle's
 * relative chunk imports (`./chunks/*.mjs`) resolve natively in workerd; the
 * entry chunk (astro core names it `prerender-entry.[hash].mjs`) is listed
 * first, which makes it the worker's main module.
 */
export declare const collectOutputModules: (outputDir: string) => Promise<Array<Module>>;
/**
 * Adds `nodejs_als` unless Node compat already provides AsyncLocalStorage,
 * either through a flag or because the compatibility date turns it on.
 */
export declare const withAsyncLocalStorage: (flags: ReadonlyArray<string>, compatibilityDate: string) => Array<string>;
