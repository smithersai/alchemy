import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import * as Path from "effect/Path";
import * as FrameworkCore from "../core/index.js";
import { Framework, FrameworkError, type DeployTarget, type DeployTargetInput } from "../core/index.js";
/**
 * The structural slice of the project's `@octanejs/vite-plugin` module this
 * package drives. Typed structurally so the package carries no dependency on
 * `@octanejs/vite-plugin` — the *project's* install is always the one loaded.
 */
export interface OctaneVitePluginModule {
    /**
     * Load and resolve the project's `octane.config.ts` (spins a temporary
     * Vite module runner internally when no dev server is supplied, so `.tsrx`
     * imports in the config graph resolve).
     */
    readonly loadOctaneConfig: (projectRoot: string, options?: Record<string, unknown>) => Promise<ResolvedOctaneConfigSlice | null>;
}
/** The structural slice of a resolved `octane.config.ts` this package reads. */
export interface ResolvedOctaneConfigSlice {
    readonly router: {
        readonly routes: ReadonlyArray<unknown>;
    };
    readonly build: {
        readonly outDir: string;
    };
    readonly adapter?: {
        readonly name?: string | undefined;
        readonly serverTarget?: string | undefined;
    } | undefined;
}
/** The structural slice of the project's `vite` module this package drives. */
export interface OctaneViteModule {
    readonly version?: string;
    readonly build: (config: Record<string, unknown>) => Promise<unknown>;
    readonly createServer: (config: Record<string, unknown>) => Promise<OctaneViteDevServer>;
}
/** The structural slice of a Vite dev server this package reads. */
export interface OctaneViteDevServer {
    readonly listen: () => Promise<unknown>;
    readonly close: () => Promise<void>;
    readonly resolvedUrls?: {
        readonly local: ReadonlyArray<string>;
    } | null | undefined;
}
/**
 * The configuration this package assembles from {@link OctaneOptions} and
 * hands to a deploy-target factory. The target treats it as its
 * `DeployTarget.config`; the framework half never inspects a resolved
 * target's config.
 */
export interface OctaneTargetConfig {
    /** Compatibility date the target carries for serve/deploy. */
    readonly compatibilityDate?: string | undefined;
    /** Compatibility flags the target carries for serve/deploy. */
    readonly compatibilityFlags?: Array<string> | undefined;
}
/**
 * A deploy target for Octane: the generic `DeployTarget` seams plus the one
 * framework-specific requirements for native output and legacy adapters.
 * Node and AWS targets wrap Octane's default Node output. Cloudflare still
 * requires its native adapter in the project's `octane.config.ts`.
 */
export interface OctaneTarget extends DeployTarget<OctaneTargetConfig> {
    /**
     * The `adapter.name` the resolved `octane.config.ts` must carry (the
     * Cloudflare target requires `"cloudflare"` — Octane's
     * `@octanejs/adapter-cloudflare`).
     */
    readonly adapterName: string;
    /**
     * The npm package providing that adapter — used in the actionable error
     * when the project's config selects no (or a foreign) adapter.
     */
    readonly adapterPackage: string;
    /** Whether this target needs an application-selected adapter rather than native Node output. */
    readonly requiresAdapter?: boolean;
    /**
     * The Worker entry module the adapter emits, relative to the build's
     * server output directory (Cloudflare: `worker.js`).
     */
    readonly serverEntryFileName: string;
}
/**
 * How a deploy target is passed to this package: an `OctaneTarget` value, a
 * factory `(config) => OctaneTarget`, or a module specifier resolved from the
 * *project's* `node_modules` (default-export — or named export `target` — a
 * value or factory).
 */
export type OctaneTargetInput = DeployTargetInput<OctaneTarget, OctaneTargetConfig>;
/**
 * The default deploy target: this package's own Cloudflare Workers target
 * module (`src/cloudflare.ts`), loaded from the project's dependency tree.
 */
export declare const DEFAULT_TARGET_SPECIFIER = "@alchemy.run/frontend-frameworks/octane/cloudflare";
/** The specifier the project's Octane Vite integration is loaded from. */
export declare const OCTANE_VITE_PLUGIN_SPECIFIER = "@octanejs/vite-plugin";
export interface OctaneOptions {
    /**
     * Project root (the directory containing `vite.config.ts` and
     * `octane.config.ts`).
     * @default process.cwd()
     */
    readonly root?: string | undefined;
    /**
     * The deploy target the build is produced for. Accepts a target value, a
     * `(config) => target` factory, or a module specifier string.
     * @default "@alchemy.run/frontend-frameworks/octane/cloudflare"
     */
    readonly target?: OctaneTargetInput | undefined;
    /** Compatibility date forwarded to the target via its config. */
    readonly compatibilityDate?: string | undefined;
    /**
     * Compatibility flags forwarded to the target via its config. Octane's
     * server runtime needs synchronous SHA-256 and `AsyncLocalStorage`, so on
     * workerd-style targets `nodejs_compat` is effectively required.
     */
    readonly compatibilityFlags?: Array<string> | undefined;
    readonly dev?: {
        /** Default dev-server port (overridden by `FrameworkDevOptions.port`). */
        readonly port?: number | undefined;
    } | undefined;
}
/**
 * Build the `Framework` service implementation for an Octane project.
 *
 * - `build` resolves the deploy target, then drives the PROJECT's own Vite
 *   install programmatically: Octane's `vite build` is the whole pipeline —
 *   `@octanejs/vite-plugin` builds the client bundle, launches the `ssr:
 *   true` server sub-build, and runs the config's deploy adapter, which
 *   emits the platform Worker entry (Cloudflare:
 *   `dist/server/worker.js`, self-contained ESM with only `node:`
 *   externals). The `BuildOutput` is then read from disk: `serverModules`
 *   entry-first from `<outDir>/server`, `clientDirectory` =
 *   `<outDir>/client`. Node and AWS accept adapterless native output;
 *   Cloudflare requires `adapter: cloudflare()`. Explicit incompatible
 *   adapters fail with an actionable error.
 * - `dev` runs Octane's own Vite dev server programmatically (the plugin's
 *   dev SSR middleware serves rendering, server routes, and RPC in-process),
 *   scoped — closing the Scope closes the server. NOTE: Octane's dev
 *   middleware does not supply request-scoped platform bindings
 *   (`context.platform` is `undefined` in dev — an upstream limitation), so
 *   Cloudflare bindings are live/preview-only for now.
 *
 * This module is target-agnostic: everything Cloudflare-specific lives in
 * `@alchemy.run/frontend-frameworks/octane/cloudflare`.
 */
export declare const make: (options?: OctaneOptions) => Effect.Effect<Framework["Service"], never, FileSystem.FileSystem | Path.Path>;
/** The resolved Octane build output directories. */
export interface OctaneOutputDirs {
    /** Root output directory (`<root>/dist`). */
    readonly dir: string;
    /** Server bundle directory (`<root>/dist/server`). */
    readonly serverDir: string;
    /** Static assets directory (`<root>/dist/client`). */
    readonly clientDir: string;
    /**
     * The adapter-emitted Worker entry file name within `serverDir`.
     * @default "worker.js"
     */
    readonly serverEntryFileName?: string | undefined;
}
/**
 * Map Octane's on-disk `dist` onto the `BuildOutput` contract:
 * `serverModules` entry-first from the server directory (POSIX names,
 * sha256-hashed, excluding the embedded-template inputs), `clientDirectory`
 * = the client directory. The adapter's server output is already
 * self-contained ESM (only `node:` externals) — no finishing pass, and no
 * external workspace roots (the server sub-build bundles with
 * `noExternal: true`, so workspace imports are inlined).
 */
export declare const readOctaneOutput: (dirs: OctaneOutputDirs) => Effect.Effect<FrameworkCore.BuildOutput, FrameworkError, FileSystem.FileSystem>;
/**
 * A `Layer` providing framework-core's `Framework` service for an Octane
 * project — the fully-typed entrypoint for `e2e.config.ts` (harness form 4)
 * and alchemy's `Website.Octane` composite.
 */
export declare const layer: (options?: OctaneOptions) => Layer.Layer<Framework, never, FileSystem.FileSystem | Path.Path>;
