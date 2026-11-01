import type { BindingHooks, Module, RuntimeWorker } from "@alchemy.run/cloudflare-runtime/core";
import { DEFAULT_COMPATIBILITY_DATE } from "@alchemy.run/cloudflare-runtime/core/internal/constants";
import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import * as Path from "effect/Path";
import * as FrameworkCore from "../core/index.js";
import * as Runner from "./Runner.vibe";
/**
 * The subset of the e2e-harness `options.vite` convention this integration
 * reads: the cloudflare worker configuration (compatibility date/flags,
 * worker name/bindings/assets). Structurally compatible with
 * `CloudflareVitePluginOptions` so harness fixtures stay uniform.
 */
export interface NextjsWorkerConfig {
    readonly compatibilityDate?: string | undefined;
    readonly compatibilityFlags?: Array<string> | undefined;
    readonly worker?: Omit<RuntimeWorker<BindingHooks>, "compatibilityDate" | "compatibilityFlags" | "modules"> | undefined;
}
/** Options for the Next.js (OpenNext-based) `Framework` integration. */
export interface NextjsFrameworkOptions {
    /**
     * Cloudflare worker configuration, following the e2e harness convention
     * (`options.vite` carries compatibility date/flags and the worker's
     * name/bindings/assets).
     */
    readonly vite?: NextjsWorkerConfig | undefined;
    /** Next.js/OpenNext-specific knobs. */
    readonly nextjs?: {
        /**
         * Optional explicit OpenNext config for direct framework consumers.
         * Otherwise load `open-next.config.ts` when present, or generate defaults.
         */
        readonly configPath?: string | undefined;
        /** Resource-selected cache adapters. Defaults to the read-only static-assets cache. */
        readonly cache?: "static-assets" | "kv" | undefined;
        /**
         * The command the OpenNext pipeline runs to build the Next.js app.
         * Takes precedence over an explicitly supplied OpenNext config.
         * @default "npx next build"
         */
        readonly buildCommand?: string | undefined;
        /** Skip the internal `next build` (reuse an existing `.next`). */
        readonly skipNextBuild?: boolean | undefined;
        /** Minify the OpenNext bundling steps and the final bundle pass. */
        readonly minify?: boolean | undefined;
        /**
         * Enable OpenNext debug logging and verbose workerd output in dev
         * (workerd otherwise swallows uncaught worker exceptions).
         */
        readonly debug?: boolean | undefined;
    } | undefined;
    /** Dev-server behavior. */
    readonly dev?: {
        /**
         * - `"preview"` (default): build the OpenNext worker and serve it
         *   under `cloudflare-runtime` (workerd) — production parity, no HMR.
         * - `"hmr"`: run the real `next dev` (Turbopack HMR) in Node, with
         *   the worker's bindings proxied from `cloudflare-runtime` and
         *   planted on OpenNext's `getCloudflareContext()` contract
         *   ({@link DevServer.start}). App code runs in Node, not workerd —
         *   CF-specific runtime behavior and ISR/caching semantics still
         *   need `"preview"`.
         * @default "preview"
         */
        readonly mode?: "preview" | "hmr" | undefined;
    } | undefined;
    /** Project root. Defaults to the process working directory. */
    readonly root?: string | undefined;
    /**
     * The host's runtime stack (a `Context.Context<RuntimeServices>`, e.g.
     * alchemy's `DevContext.runtimeContext`). When provided, dev servers host
     * the binding proxy in it instead of building the credential-free internal
     * layer — this is what makes `Alchemy.remote()` bindings resolve in dev.
     * Typed `unknown` to keep the option JSON-tolerant at the boundary; it is
     * narrowed internally.
     */
    readonly services?: unknown;
}
/**
 * Extract the edge-runtime function paths from `.next/server/
 * middleware-manifest.json`. `middleware` entries are supported (OpenNext
 * runs the middleware in the worker); `functions` entries are routes/pages
 * compiled for the edge runtime, which `@opennextjs/cloudflare` does not
 * support.
 */
export declare const listEdgeFunctions: (manifest: unknown) => Array<string>;
export { DEFAULT_COMPATIBILITY_DATE };
/** The server-module name of the worker entry (`serverModules[0]`). */
export declare const WORKER_ENTRY_MODULE = "worker/worker.js";
/** The OpenNext revalidation-queue Durable Object class. */
export declare const DO_QUEUE_CLASS = "DOQueueHandler";
/** The binding name OpenNext expects for the revalidation-queue DO. */
export declare const DO_QUEUE_BINDING = "NEXT_CACHE_DO_QUEUE";
/** The self service binding OpenNext uses for ISR revalidation fetches. */
export declare const SELF_REFERENCE_BINDING = "WORKER_SELF_REFERENCE";
/** Build the {@link Runner.RunnerConfig} for a project (exported for testing). */
export declare const makeRunnerConfig: (root: string, options?: NextjsFrameworkOptions) => Runner.RunnerConfig;
/**
 * Map a `BuildOutput`'s server modules to cloudflare-runtime worker modules
 * (exported for testing). Sourcemaps are dropped; binary content is passed
 * through as bytes, text content as strings.
 */
export declare const toRuntimeModules: (serverModules: ReadonlyArray<FrameworkCore.OutputFile>) => Array<Module>;
/**
 * Whether the entry module exports the OpenNext revalidation-queue Durable
 * Object class (exported for testing). OpenNext's `worker.js` re-exports the
 * DO classes it ships; when present, dev declares the same-script
 * SQLite-backed namespace + binding so `doQueue`-configured apps work and
 * `memoryQueue` apps keep parity with the deployed worker shape.
 */
export declare const hasDoQueueClass: (entry: FrameworkCore.OutputFile | undefined) => boolean;
/**
 * The Next.js implementation of framework-core's `Framework` service,
 * built on the `@opennextjs/cloudflare` build pipeline — wrangler-free:
 *
 * - `build` runs the pipeline in a disposable child process (`runner.mjs`
 *   vendors the two thin config wrappers so no wrangler code is ever
 *   imported), then performs the final bundle pass wrangler would normally
 *   do at deploy time ({@link Bundle.bundleWorker}), populates the
 *   static-assets incremental cache, and returns the `BuildOutput` in-memory.
 * - `dev` (default mode `"preview"`) serves the built worker under
 *   `@alchemy.run/cloudflare-runtime/core` (workerd) with the OpenNext worker
 *   shape: `ASSETS` + run-worker-first, a `WORKER_SELF_REFERENCE` self
 *   service binding, and the same-script SQLite-backed revalidation-queue
 *   Durable Object. No HMR — file watching/rebuild is a later phase.
 * - `dev` with `options.dev.mode: "hmr"` runs the real `next dev` (Turbopack
 *   HMR) in Node with the worker's bindings proxied from
 *   `cloudflare-runtime` ({@link DevServer.start}) — see the mode's fidelity
 *   notes on {@link NextjsFrameworkOptions}.
 */
export declare const make: (options?: NextjsFrameworkOptions) => Layer.Layer<FrameworkCore.Framework, never, FileSystem.FileSystem | Path.Path>;
