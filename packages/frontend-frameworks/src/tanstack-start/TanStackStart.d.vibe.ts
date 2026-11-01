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
 * `createBuilder` (not `build`) is the entry point: TanStack Start's plugin
 * declares a `builder.buildApp` that builds the `client` and `ssr`
 * environments (plus the server-function provider environment when RSC is
 * enabled). Vite's legacy `build()` only builds the default environment, so
 * it would silently produce the client bundle and nothing else.
 */
export interface TanStackStartViteModule {
    readonly version?: string;
    readonly createBuilder: (config: Record<string, unknown>) => Promise<TanStackStartViteBuilder>;
    readonly createServer: (config: Record<string, unknown>) => Promise<TanStackStartViteDevServer>;
}
/** The structural slice of a vite builder this package reads. */
export interface TanStackStartViteBuilder {
    readonly buildApp: () => Promise<unknown>;
}
/** The structural slice of a Vite dev server this package reads. */
export interface TanStackStartViteDevServer {
    readonly listen: () => Promise<unknown>;
    readonly close: () => Promise<void>;
    readonly resolvedUrls?: {
        readonly local: ReadonlyArray<string>;
    } | null | undefined;
}
/**
 * The configuration this package assembles from
 * {@link TanStackStartOptions} and hands to a deploy-target factory. The
 * target treats it as its `DeployTarget.config`; the framework half never
 * inspects a resolved target's config.
 */
export interface TanStackStartTargetConfig {
    /**
     * Build output directory relative to the project root — the parent of
     * `client/` and `server/`. Mirrors the project config's `build.outDir`.
     * @default "dist"
     */
    readonly outDir?: string | undefined;
}
/**
 * A deploy target for TanStack Start: the generic `DeployTarget` seams plus
 * the one framework-specific hook the build needs — the file name of the
 * server entry the SSR environment emits, which the target's finishing pass
 * wraps.
 */
export interface TanStackStartTarget extends DeployTarget<TanStackStartTargetConfig> {
    /**
     * The server entry file name within the SSR output directory. TanStack
     * Start's SSR environment builds a single rollup input — the resolved
     * server entry (`src/server.ts`, else the framework's default one) — so
     * the emitted chunk is named after it (`server.js`). Omitted targets fall
     * back to {@link DEFAULT_SERVER_ENTRY_FILE_NAME}, and a build that emits
     * exactly one top-level module under the server directory uses that
     * instead when the expected name is absent.
     */
    readonly serverEntryFileName?: string | undefined;
}
/**
 * How a deploy target is passed to this package: a `TanStackStartTarget`
 * value, a factory `(config) => TanStackStartTarget`, or a module specifier
 * resolved from the *project's* `node_modules`.
 */
export type TanStackStartTargetInput = DeployTargetInput<TanStackStartTarget, TanStackStartTargetConfig>;
/**
 * The default deploy target: this package's own AWS Lambda target module,
 * loaded from the project's dependency tree. (Cloudflare deploys TanStack
 * Start through its native Vite integration — `Cloudflare.Website.Vite` —
 * so no Cloudflare target exists here.)
 */
export declare const DEFAULT_TARGET_SPECIFIER = "@alchemy.run/frontend-frameworks/tanstack-start/aws";
/** The vite plugin package a TanStack Start project must install. */
export declare const TANSTACK_START_PLUGIN_SPECIFIER = "@tanstack/start-plugin-core";
/** The default root output directory (the parent of `client/` and `server/`). */
export declare const DEFAULT_OUT_DIR = "dist";
/** The default server entry file name inside the SSR output directory. */
export declare const DEFAULT_SERVER_ENTRY_FILE_NAME = "server.js";
export interface TanStackStartOptions {
    /**
     * Project root (the directory containing `vite.config.*`).
     * @default process.cwd()
     */
    readonly root?: string | undefined;
    /**
     * The deploy target the build is produced for. Accepts a target value, a
     * `(config) => target` factory, or a module specifier string.
     * @default "@alchemy.run/frontend-frameworks/tanstack-start/aws"
     */
    readonly target?: TanStackStartTargetInput | undefined;
    /**
     * Build output directory relative to the project root — the parent of
     * `client/` and `server/`. Must match the project's `build.outDir` when it
     * sets one.
     * @default "dist"
     */
    readonly outDir?: string | undefined;
    readonly dev?: {
        /** Default dev-server port (overridden by `FrameworkDevOptions.port`). */
        readonly port?: number | undefined;
    } | undefined;
}
/**
 * The inline config the integration merges over the project's own
 * `vite.config.*`.
 *
 * `resolve.noExternal: true` on the SSR environment is the load-bearing
 * override: vite externalizes `node_modules` imports from SSR bundles by
 * default, so a stock TanStack Start server build emits
 * `import { RouterProvider } from "@tanstack/react-router"` and is only
 * runnable next to an installed dependency tree. A Lambda ships the server
 * directory alone, so the SSR bundle must be self-contained — only `node:`
 * builtins stay external. Declared on both the legacy `ssr` key and the
 * environment key so it holds across Vite majors.
 */
export declare const inlineBuildConfig: (root: string, outDir: string | undefined) => Record<string, unknown>;
/**
 * Build the `Framework` service implementation for a TanStack Start project.
 *
 * - `build` resolves the deploy target, then either delegates wholesale
 *   (`target.build`) or drives the PROJECT's own Vite install
 *   programmatically: `createBuilder({ root, ... })` followed by
 *   `buildApp()`. TanStack Start is pure Vite — `tanstackStart()` in the
 *   project's `vite.config.ts` owns routing, the client/`ssr` environments,
 *   and the server entry — so there is no adapter to select and no plugin to
 *   inject; the integration only forces the SSR bundle to be self-contained
 *   (see {@link inlineBuildConfig}). The `BuildOutput` is read from disk:
 *   `serverModules` entry-first from `<outDir>/server`, `clientDirectory` =
 *   `<outDir>/client`.
 * - `dev` runs the project's own Vite dev server (TanStack Start's
 *   dev-server plugin serves SSR, server routes, and server functions
 *   through it with native HMR), scoped — closing the Scope closes the
 *   server.
 *
 * This module is target-agnostic: everything AWS-specific lives in
 * `@alchemy.run/frontend-frameworks/tanstack-start/aws`.
 */
export declare const make: (options?: TanStackStartOptions) => Effect.Effect<Framework["Service"], never, FileSystem.FileSystem | Path.Path>;
/** The resolved TanStack Start build output directories. */
export interface TanStackStartOutputDirs {
    /** Root output directory (`<root>/dist`). */
    readonly dir: string;
    /** SSR bundle directory (`<root>/dist/server`). */
    readonly serverDir: string;
    /** Client assets directory (`<root>/dist/client`), `public/` copied in. */
    readonly clientDir: string;
    /**
     * The emitted server entry file name within `serverDir`.
     * @default "server.js"
     */
    readonly serverEntryFileName?: string | undefined;
}
/**
 * Pick the server entry among the modules read off disk.
 *
 * The expected name wins. Otherwise, a build whose server directory holds
 * exactly one top-level module (chunks live under `assets/`) is
 * unambiguous — that module is the entry, which covers a project that names
 * its server entry something other than `server.ts`.
 */
export declare const selectServerEntryName: (moduleNames: ReadonlyArray<string>, expected: string) => string | undefined;
/**
 * Map TanStack Start's on-disk `dist` onto the `BuildOutput` contract:
 * `serverModules` entry-first from `<outDir>/server` (POSIX names,
 * sha256-hashed), `clientDirectory` = `<outDir>/client`. The SSR bundle is
 * built with `resolve.noExternal: true`, so it is self-contained (only
 * `node:` builtins external) and there are no external workspace roots to
 * watch.
 */
export declare const readTanStackStartOutput: (dirs: TanStackStartOutputDirs) => Effect.Effect<FrameworkCore.BuildOutput, FrameworkError, FileSystem.FileSystem>;
/**
 * A `Layer` providing framework-core's `Framework` service for a TanStack
 * Start project — the fully-typed entrypoint for `e2e.config.ts` and
 * alchemy's `AWS.Website.TanStackStart` composite.
 */
export declare const layer: (options?: TanStackStartOptions) => Layer.Layer<Framework, never, FileSystem.FileSystem | Path.Path>;
