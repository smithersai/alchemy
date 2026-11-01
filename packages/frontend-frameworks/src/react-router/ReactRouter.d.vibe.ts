import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import * as Path from "effect/Path";
import * as FrameworkCore from "../core/index.js";
import { Framework, FrameworkError, type DeployTarget, type DeployTargetInput } from "../core/index.js";
/**
 * The structural slice of the project's `vite` module this package drives.
 * Typed structurally so the package carries no dependency on vite — the
 * *project's* install is always the one loaded.
 *
 * `build` (not `createBuilder`) is the entry point: React Router v7's
 * `@react-router/dev` plugin drives a two-pass build — `vite build` for the
 * `client` environment, then `vite build` with `build.ssr` for the server
 * environment — which is exactly what `react-router build` runs. (The
 * Vite Environment API path exists only behind the framework's
 * `future.v8_viteEnvironmentApi` flag and for RSC; see the module doc on
 * {@link make}.)
 */
export interface ReactRouterViteModule {
    readonly version?: string;
    readonly build: (config: Record<string, unknown>) => Promise<unknown>;
    readonly createServer: (config: Record<string, unknown>) => Promise<ReactRouterViteDevServer>;
}
/** The structural slice of a Vite dev server this package reads. */
export interface ReactRouterViteDevServer {
    readonly listen: () => Promise<unknown>;
    readonly close: () => Promise<void>;
    readonly resolvedUrls?: {
        readonly local: ReadonlyArray<string>;
    } | null | undefined;
}
/** The slice of a resolved Vite config the output-directory capture reads. */
export interface ResolvedViteBuildSlice {
    readonly root: string;
    readonly build: {
        readonly outDir: string;
    };
}
/**
 * The configuration this package assembles from {@link ReactRouterOptions}
 * and hands to a deploy-target factory. The target treats it as its
 * `DeployTarget.config`; the framework half never inspects a resolved
 * target's config.
 */
export interface ReactRouterTargetConfig {
    /**
     * Build output directory relative to the project root — the parent of
     * `client/` and `server/`. Mirrors `react-router.config.ts`'s
     * `buildDirectory`, and is only a FALLBACK: the integration prefers the
     * directories it observes on the resolved Vite config.
     * @default "build"
     */
    readonly buildDirectory?: string | undefined;
}
/**
 * A deploy target for React Router: the generic `DeployTarget` seams plus
 * the one framework-specific hook the build needs — the file name of the
 * server entry the server build emits, which the target's finishing pass
 * wraps.
 */
export interface ReactRouterTarget extends DeployTarget<ReactRouterTargetConfig> {
    /**
     * The server entry file name within the server output directory. React
     * Router names it after `react-router.config.ts`'s `serverBuildFile`
     * (default `index.js`). Omitted targets fall back to
     * {@link DEFAULT_SERVER_BUILD_FILE}, and a build that emits exactly one
     * top-level module under the server directory uses that instead when the
     * expected name is absent.
     */
    readonly serverEntryFileName?: string | undefined;
}
/**
 * How a deploy target is passed to this package: a `ReactRouterTarget`
 * value, a factory `(config) => ReactRouterTarget`, or a module specifier
 * resolved from the *project's* `node_modules`.
 */
export type ReactRouterTargetInput = DeployTargetInput<ReactRouterTarget, ReactRouterTargetConfig>;
/**
 * The default deploy target: this package's own AWS Lambda target module,
 * loaded from the project's dependency tree. (Cloudflare deploys React
 * Router through its native Vite integration — `Cloudflare.Website.Vite` —
 * so no Cloudflare target exists here.)
 */
export declare const DEFAULT_TARGET_SPECIFIER = "@alchemy.run/frontend-frameworks/react-router/aws";
/** The Vite plugin package a React Router project must install. */
export declare const REACT_ROUTER_PLUGIN_SPECIFIER = "@react-router/dev";
/** The default root output directory (the parent of `client/` and `server/`). */
export declare const DEFAULT_BUILD_DIRECTORY = "build";
/** The default server entry file name inside the server output directory. */
export declare const DEFAULT_SERVER_BUILD_FILE = "index.js";
/**
 * React Router's own virtual module holding the compiled server build — the
 * `ServerBuild` manifest (`{ entry, routes, assets, basename, ... }`), NOT a
 * request handler.
 */
export declare const REACT_ROUTER_SERVER_BUILD_ID = "virtual:react-router/server-build";
/**
 * The virtual module this integration makes the server build's rollup input:
 * it turns the `ServerBuild` manifest into a web-standard fetch handler.
 */
export declare const SERVER_ENTRY_ID = "virtual:alchemy/react-router-server-entry";
export interface ReactRouterOptions {
    /**
     * Project root (the directory containing `vite.config.*`).
     * @default process.cwd()
     */
    readonly root?: string | undefined;
    /**
     * The deploy target the build is produced for. Accepts a target value, a
     * `(config) => target` factory, or a module specifier string.
     * @default "@alchemy.run/frontend-frameworks/react-router/aws"
     */
    readonly target?: ReactRouterTargetInput | undefined;
    /**
     * Build output directory relative to the project root — the parent of
     * `client/` and `server/`. Mirrors `react-router.config.ts`'s
     * `buildDirectory`; used only as a fallback when the resolved Vite config
     * could not be observed.
     * @default "build"
     */
    readonly buildDirectory?: string | undefined;
    readonly dev?: {
        /** Default dev-server port (overridden by `FrameworkDevOptions.port`). */
        readonly port?: number | undefined;
    } | undefined;
}
/**
 * The source of the virtual server entry ({@link SERVER_ENTRY_ID}).
 *
 * React Router's server build is a manifest, not a handler: it has no
 * default export and nothing to call. `createRequestHandler` from
 * `react-router` turns it into `(request) => Promise<Response>`, and this
 * module exposes that as the `{ fetch }` shape every deploy target's
 * finishing pass already knows how to wrap.
 *
 * This wrapping happens at BUILD time (as the server build's rollup input)
 * rather than as a file emitted afterwards, because `react-router` itself
 * must be part of the emitted bundle — the deployed server directory ships
 * without a `node_modules` tree.
 */
export declare const serverEntrySource: (mode?: string) => string;
/** The structural slice of a Vite plugin this integration constructs. */
export interface InlineVitePlugin {
    readonly name: string;
    readonly enforce?: "pre" | "post" | undefined;
    readonly resolveId?: ((id: string) => string | undefined) | undefined;
    readonly load?: ((id: string) => string | undefined) | undefined;
    readonly configResolved?: ((config: ResolvedViteBuildSlice) => void) | undefined;
}
/**
 * The Vite plugin serving {@link SERVER_ENTRY_ID}. `enforce: "pre"` so the
 * virtual id resolves before any project plugin sees it.
 */
export declare const serverEntryPlugin: (options?: {
    readonly mode?: string | undefined;
}) => InlineVitePlugin;
/** A mutable slot the {@link captureOutDirPlugin} writes the resolved outDir into. */
export interface OutDirCapture {
    outDir?: string | undefined;
}
/**
 * The Vite plugin that observes the RESOLVED output directory of a build.
 *
 * React Router derives both output directories from `react-router.config.ts`
 * (`buildDirectory`), which is TypeScript the integration must not evaluate
 * itself. Reading them off the config Vite actually resolved is exact, free,
 * and honors every project override.
 */
export declare const captureOutDirPlugin: (capture: OutDirCapture) => InlineVitePlugin;
/**
 * The inline config for the CLIENT pass, merged over the project's own
 * `vite.config.*` (which loads natively, plugins included).
 */
export declare const inlineClientBuildConfig: (root: string, plugins: ReadonlyArray<InlineVitePlugin>) => Record<string, unknown>;
/**
 * The inline config for the SERVER pass.
 *
 * Two overrides carry the whole AWS story:
 *
 * - `build.ssr` selects React Router's server environment (the flag its
 *   plugin branches on), and `build.rollupOptions.input` replaces the
 *   framework's `virtual:react-router/server-build` input with the fetch
 *   handler wrapper ({@link serverEntrySource}) — the plugin honors a
 *   user-provided input verbatim.
 * - `noExternal` is load-bearing: Vite externalizes `node_modules` imports
 *   from SSR bundles by default, so a stock React Router server build emits
 *   `import { ServerRouter } from "react-router"` and is only runnable next
 *   to an installed dependency tree. A Lambda ships the server directory
 *   alone, so the bundle must be self-contained — only `node:` builtins
 *   stay external. Declared on both the legacy `ssr` key and the
 *   environment key so it holds across Vite majors.
 */
export declare const inlineServerBuildConfig: (root: string, plugins: ReadonlyArray<InlineVitePlugin>) => Record<string, unknown>;
/**
 * Build the `Framework` service implementation for a React Router v7
 * project (framework mode).
 *
 * - `build` resolves the deploy target, then either delegates wholesale
 *   (`target.build`) or drives the PROJECT's own Vite install
 *   programmatically, mirroring what `react-router build` does: the client
 *   pass first (it writes the asset manifest the server pass reads), then
 *   the server pass with `build.ssr`. `reactRouter()` in the project's
 *   `vite.config.ts` owns routing, typegen, and both environments — there
 *   is no adapter to select and no plugin to inject beyond the fetch-handler
 *   entry ({@link serverEntrySource}) and the self-contained SSR bundle
 *   ({@link inlineServerBuildConfig}). The `BuildOutput` is read from disk:
 *   `serverModules` entry-first from the server directory,
 *   `clientDirectory` = the client directory, both observed off the
 *   resolved Vite config.
 * - `dev` runs the project's own Vite dev server (React Router's plugin
 *   serves SSR, resource routes, and typegen through it with native HMR),
 *   scoped — closing the Scope closes the server.
 *
 * NOT supported: React Server Components / multi-environment builds (React
 * Router's `unstable` RSC plugin, or `future.v8_viteEnvironmentApi`). Those
 * emit more than one server environment, which this two-pass build does not
 * assemble; the build fails with an actionable error when no single server
 * entry is produced.
 *
 * This module is target-agnostic: everything AWS-specific lives in
 * `@alchemy.run/frontend-frameworks/react-router/aws`.
 */
export declare const make: (options?: ReactRouterOptions) => Effect.Effect<Framework["Service"], never, FileSystem.FileSystem | Path.Path>;
/** The resolved React Router build output directories. */
export interface ReactRouterOutputDirs {
    /** Root output directory (`<root>/build`) — the parent of both. */
    readonly dir: string;
    /** Server bundle directory (`<root>/build/server`). */
    readonly serverDir: string;
    /** Client assets directory (`<root>/build/client`), `public/` copied in. */
    readonly clientDir: string;
    /**
     * The emitted server entry file name within `serverDir`.
     * @default "index.js"
     */
    readonly serverEntryFileName?: string | undefined;
}
/**
 * Pick the server entry among the modules read off disk.
 *
 * The expected name wins. Otherwise, a build whose server directory holds
 * exactly one top-level module (chunks live under `assets/`) is
 * unambiguous — that module is the entry, which covers a project that sets
 * `serverBuildFile` to something other than `index.js`.
 */
export declare const selectServerEntryName: (moduleNames: ReadonlyArray<string>, expected: string) => string | undefined;
/**
 * Map React Router's on-disk build tree onto the `BuildOutput` contract:
 * `serverModules` entry-first from `<buildDirectory>/server` (POSIX names,
 * sha256-hashed), `clientDirectory` = `<buildDirectory>/client`. The server
 * bundle is built with `noExternal`, so it is self-contained (only `node:`
 * builtins external) and there are no external workspace roots to watch.
 */
export declare const readReactRouterOutput: (dirs: ReactRouterOutputDirs) => Effect.Effect<FrameworkCore.BuildOutput, FrameworkError, FileSystem.FileSystem>;
/**
 * A `Layer` providing framework-core's `Framework` service for a React
 * Router project — the fully-typed entrypoint for `e2e.config.ts` and
 * alchemy's `AWS.Website.ReactRouter` composite.
 */
export declare const layer: (options?: ReactRouterOptions) => Layer.Layer<Framework, never, FileSystem.FileSystem | Path.Path>;
