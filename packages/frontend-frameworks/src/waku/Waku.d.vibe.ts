import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import * as Path from "effect/Path";
import type * as ViteModule from "vite";
import type { Config as WakuConfig } from "waku/config";
import * as FrameworkCore from "../core/index.js";
import type { BuildOutput, DeployTarget, DeployTargetBuildContext, DeployTargetError, DeployTargetInput, DeployTargetServices } from "../core/index.js";
/**
 * Waku's rsc-environment worker entry, relative to the installed `waku`
 * package directory. Its default export is the adapter's `ExportedHandler`
 * (the same module waku wires as the rsc env's `index` input). The deep path
 * is not in waku's exports map, so it is joined onto the resolved package
 * directory.
 *
 * Deploy targets whose bundler plugin needs an explicit entry (e.g. the
 * cloudflare target's `main`) pin it to this path: waku's rsc environment
 * declares two rolldown inputs (`index` + `build`) while such plugins assert
 * exactly one entry.
 */
export declare const WAKU_SERVER_ENTRY_PATH = "dist/lib/vite-entries/entry.server.js";
/**
 * The server module that must become `serverModules[0]` when the app has no
 * user worker entry: waku's own `index` input of the rsc environment
 * (`dist/server/index.js`), whose default export is the adapter's
 * `ExportedHandler`. The entry environment emits multiple entry chunks
 * (`index`, `build`, and any wrapped worker entry), so entry selection is
 * pinned to this name. When the deploy target carries a user entry
 * (`target.entry`), the chunk built from the user's `main` is pinned instead
 * (framework-core's `selectEntryByFacade`) and this module remains an
 * ordinary chunk the user entry imports.
 */
export declare const WAKU_SERVER_ENTRY_MODULE = "server/index.js";
/**
 * The stable importable specifier for waku's server handler — the module a
 * USER worker entry wraps (the deploy-target user-entry seam; precedent:
 * React Router's `virtual:react-router/server-build`). Resolves to waku's
 * rsc server entry ({@link WAKU_SERVER_ENTRY_PATH}), whose default export is
 * the adapter's `ExportedHandler`, in dev and build alike:
 *
 * ```ts
 * // src/worker-entry.ts
 * import wakuHandler from "virtual:waku/server-entry";
 * export class Counter extends DurableObject {}
 * export default {
 *   fetch: (request, env, ctx) => wakuHandler.fetch(request, env, ctx),
 * };
 * ```
 */
export declare const WAKU_SERVER_ENTRY_ID = "virtual:waku/server-entry";
/**
 * The vite plugin resolving {@link WAKU_SERVER_ENTRY_ID} to the project's
 * installed waku server entry. Platform-neutral (the id maps to the same
 * framework module for every deploy target) and always injected first in
 * `vite.plugins`, so the id resolves for the dev module runner, the
 * production build, and the SSG preview server alike.
 */
export declare const makeWakuServerEntryPlugin: (wakuDirectory: string) => ViteModule.Plugin;
/**
 * The inputs a {@link WakuTarget} hook receives: enough to synthesize the
 * target's bundler plugins and adapter selection for one waku pass.
 */
export interface WakuTargetContext {
    /** Absolute project root. */
    readonly root: string;
    /** Directory of the project's installed `waku` package. */
    readonly wakuDirectory: string;
    /** Which waku pass the hook feeds: the production build or the HMR dev server. */
    readonly phase: "build" | "dev";
}
/**
 * The waku-specific deploy-target contract: the generic
 * `framework-core` {@link DeployTarget} seams plus the two
 * hooks a target must implement to slot into waku's toolchain:
 *
 * - `adapter` — the absolute path of the waku server-entry adapter module the
 *   in-memory config selects via `unstable_adapter`. Always required: leaving
 *   `unstable_adapter` unset makes waku silently pick `waku/adapters/node`,
 *   which cannot run on a non-Node target runtime.
 * - `vitePlugins` — vite plugins injected *first* inside waku's
 *   `config.vite.plugins` (waku's `extraPlugins` places user plugins first,
 *   ahead of waku's own environments plugin) — the position upstream
 *   documents for `@cloudflare/vite-plugin`, and the only one where a
 *   target's request-proxy middleware registers before waku's Node request
 *   bridge.
 *
 * The Cloudflare implementation ships at `@alchemy.run/frontend-frameworks/waku/cloudflare`
 * (the default). A future target (e.g. AWS) is a new module implementing the
 * same two hooks — no change to this package's orchestration.
 */
export interface WakuTarget<Config = unknown> extends DeployTarget<Config> {
    /** Absolute path of the adapter module waku's config selects via `unstable_adapter`. */
    readonly adapter: (context: WakuTargetContext) => Effect.Effect<string, DeployTargetError>;
    /** Vite plugins injected first inside waku's `vite.plugins` (dev + build). */
    readonly vitePlugins: (context: WakuTargetContext) => Effect.Effect<ReadonlyArray<ViteModule.PluginOption>, DeployTargetError>;
    /**
     * Optional *wholesale* build takeover (see `DeployTarget.build`), with
     * the waku-specific {@link WakuTargetBuildContext}.
     */
    readonly build?: ((context: WakuTargetBuildContext) => Effect.Effect<BuildOutput, DeployTargetError, DeployTargetServices>) | undefined;
}
/**
 * The context a waku target's wholesale `build` takeover receives: the
 * generic build context plus the inline waku options the framework was
 * constructed with ({@link WakuFrameworkOptions.waku}) — carried so
 * wholesale targets that re-run the framework in a child process (the AWS
 * target) can reconstruct it. Only JSON-serializable fields survive that
 * process boundary.
 */
export interface WakuTargetBuildContext extends DeployTargetBuildContext {
    readonly waku?: WakuConfig | undefined;
}
/**
 * Structural mirror of the e2e harness's target-scoped config carriage
 * (`Options.TargetOptions`): a plain selection object whose `cloudflare.worker`
 * carries the cloudflare target's configuration. Distinguished from a
 * {@link DeployTargetInput} structurally (it is neither a
 * string, a function, nor a `DeployTarget` value).
 */
export interface WakuHarnessTargetOptions {
    /** Which platform target drives the integration. @default "cloudflare" */
    readonly name?: string | undefined;
    readonly cloudflare?: {
        readonly worker?: unknown;
    } | undefined;
}
/**
 * How the deploy target is passed to the waku integration:
 *
 * - a target value / factory / module-specifier string (a
 *   {@link DeployTargetInput}) — resolved with
 *   `resolveDeployTarget`
 * - the e2e harness's target-scoped carriage
 *   ({@link WakuHarnessTargetOptions}) — selects the default cloudflare
 *   target module and hands it `cloudflare.worker` as its config
 * - omitted — the default cloudflare target module with the deprecated
 *   `vite` alias as its config
 */
export type WakuTargetOption = DeployTargetInput<WakuTarget, unknown> | WakuHarnessTargetOptions;
/**
 * The module specifier of the default deploy target, loaded from the
 * *project's* `node_modules` when no explicit target is passed.
 */
export declare const DEFAULT_TARGET_SPECIFIER = "@alchemy.run/frontend-frameworks/waku/cloudflare";
/**
 * Options for the Waku `Framework` integration.
 */
export interface WakuFrameworkOptions {
    /**
     * The deploy target the build is produced for. Accepts a target value
     * (build it by importing the target module, e.g.
     * `@alchemy.run/frontend-frameworks/waku/cloudflare`, for full config type safety), a
     * `(config) => target` factory, a module specifier string, or the e2e
     * harness's target-scoped carriage. Defaults to the cloudflare target
     * module ({@link DEFAULT_TARGET_SPECIFIER}).
     */
    readonly target?: WakuTargetOption | undefined;
    /**
     * @deprecated Alias for the deploy target's configuration (the harness's
     * pre-target `vite` field, carrying the cloudflare worker configuration).
     * Prefer passing a fully-built target via {@link target}, or the harness's
     * target-scoped `target.cloudflare.worker`.
     */
    readonly vite?: unknown;
    /**
     * Extra waku config (`srcDir`, `distDir`, `vite`, ...) merged OVER the
     * project's own `waku.config.ts`/`waku.config.js`, which is always loaded
     * natively first (same semantics as waku's CLI — see
     * {@link mergeUserWakuConfig}). `unstable_adapter` is owned by the deploy
     * target and must not be set here or in the config file.
     */
    readonly waku?: WakuConfig | undefined;
    /** Project root. Defaults to the process working directory. */
    readonly root?: string | undefined;
    /**
     * Default dev-server port, used when `dev` is called without an explicit
     * port (e.g. the e2e harness's Playwright dev fixture). Non-strict: if the
     * port is taken, vite falls back to the next free one. A port passed to
     * `dev` directly (`e2e dev --port N`) is strict and takes precedence.
     */
    readonly port?: number | undefined;
}
/**
 * The config files waku's CLI probes for, in probe order (see waku's
 * `lib/vite-rsc/loader.ts` `loadConfig`). Only the existence probe uses these
 * names — the actual import goes through vite's resolver as `/waku.config`,
 * exactly like upstream.
 */
export declare const WAKU_CONFIG_FILES: readonly ["waku.config.ts", "waku.config.js"];
/** Inputs for {@link mergeUserWakuConfig} (exported for testing). */
export interface MergeUserWakuConfigInputs {
    /** The natively loaded `waku.config.ts`/`waku.config.js` default export. */
    readonly file: WakuConfig | undefined;
    /** The integration's inline waku options ({@link WakuFrameworkOptions.waku}). */
    readonly inline: WakuConfig | undefined;
    /** vite's `mergeConfig` (from the project's vite installation). */
    readonly mergeViteConfig: (defaults: ViteModule.UserConfig, overrides: ViteModule.UserConfig) => ViteModule.UserConfig;
}
/**
 * Merge the project's natively loaded waku config file with the integration's
 * inline waku options: the file is the base, inline options win per key
 * (mirroring vite's file-config-vs-inline-config precedence), and the `vite`
 * fields are combined with vite's own `mergeConfig` (arrays like `plugins`
 * concatenate — file plugins first, inline plugins after).
 */
export declare const mergeUserWakuConfig: (inputs: MergeUserWakuConfigInputs) => WakuConfig | undefined;
/** The normalized `(input, config)` pair fed to `resolveDeployTarget`. */
export interface WakuTargetInputSelection {
    readonly input: DeployTargetInput<WakuTarget, unknown>;
    readonly config: unknown;
}
/**
 * Normalize {@link WakuFrameworkOptions} into the `(input, config)` pair for
 * `resolveDeployTarget`:
 *
 * - an explicit `DeployTargetInput` is used as-is, with the deprecated `vite`
 *   alias as the config a factory/specifier receives
 * - the harness carriage (or no target at all) selects the default target
 *   module with `target.cloudflare.worker ?? vite` as its config
 */
export declare const selectWakuTargetInput: (options?: WakuFrameworkOptions) => WakuTargetInputSelection;
/** Inputs for {@link makeWakuConfigInput} (exported for testing). */
export interface WakuConfigInputs {
    /** Absolute path of the adapter module (the target's `adapter` hook). */
    readonly adapterPath: string;
    /**
     * Deploy-target vite plugins injected first inside `vite.plugins` (the
     * target's `vitePlugins` hook). The SSG preview server resolves the same
     * config — upstream parity: waku's CLI reuses the loaded config's plugin
     * instances for both `createBuilder` and `vite.preview` — so a target
     * whose plugins implement `configurePreviewServer` (the cloudflare
     * target's does) serves SSG through its own runtime.
     */
    readonly plugins?: ReadonlyArray<ViteModule.PluginOption> | undefined;
    /**
     * The user's waku config — the natively loaded `waku.config.ts`/`.js`
     * merged with the integration's inline waku options (see
     * {@link mergeUserWakuConfig}). Its `vite` config is preserved; a user
     * `unstable_adapter` is rejected by the caller before this point (the
     * deploy target owns the adapter), so this function pins it
     * unconditionally.
     */
    readonly userConfig?: WakuConfig | undefined;
}
/**
 * Build the waku `Config` fed to waku's `unstable_resolveConfig`: the USER's
 * config (their natively loaded `waku.config.*`, plus any inline waku
 * options) with the deploy target's required fields merged over it:
 *
 * - `unstable_adapter` is pinned to the deploy target's adapter module.
 *   Leaving it unset would silently select `waku/adapters/node` (no
 *   `CLOUDFLARE` env var), which cannot run on a non-Node target runtime;
 *   a user-set adapter is rejected upstream of this function.
 * - The target's vite plugins are injected INSIDE `vite.plugins` (waku's
 *   `extraPlugins` places user plugins first, ahead of waku's own
 *   environments plugin) — the position upstream documents for
 *   `@cloudflare/vite-plugin`, and the only one where the target's proxy
 *   middleware registers before waku's Node request bridge.
 * - `waku` and `hono` are deduped so the adapter module (which lives outside
 *   the project) resolves the project's copies.
 * - rsc/ssr get the documented `optimizeDeps.include` entries and
 *   `platform: "neutral"`.
 */
export declare const makeWakuConfigInput: (inputs: WakuConfigInputs) => WakuConfig;
/**
 * The Waku implementation of framework-core's `Framework` service.
 *
 * - `build` replicates waku's `runBuild` (`vite.createBuilder` +
 *   `combinedPlugins` + the SSG preview-server global) and collects the
 *   `BuildOutput` with a post-`buildApp` disk re-read (waku writes
 *   `__waku_build_metadata.js` and prunes static-only chunks after the
 *   bundler finishes). The result is returned in-memory only, then passed
 *   through the deploy target's finishing pass (if any).
 * - `dev` replicates waku's `runDev` with the deploy target's vite plugins
 *   injected inside waku's `config.vite.plugins`, so the rsc environment runs
 *   on the target's dev runtime (workerd for cloudflare) with in-memory
 *   bindings.
 *
 * Deploy-target resolution happens per operation: platform-specific halves
 * (adapter module, bundler plugins) come exclusively from the resolved
 * {@link WakuTarget} — this module contains no platform imports.
 *
 * Returns the service implementation as an Effect (the alchemy-side
 * `FrameworkModule` contract); use {@link layer} for the `Layer` form the
 * e2e harness consumes.
 */
export declare const make: (options?: WakuFrameworkOptions) => Effect.Effect<FrameworkCore.Framework["Service"], never, FileSystem.FileSystem | Path.Path>;
/**
 * The `Layer` form of {@link make} — the shape the e2e harness's framework
 * factory contract expects (`(options) => Layer<Framework>`).
 */
export declare const layer: (options?: WakuFrameworkOptions) => Layer.Layer<FrameworkCore.Framework, never, FileSystem.FileSystem | Path.Path>;
