import type { AstroInlineConfig, AstroIntegration } from "astro";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import * as Path from "effect/Path";
import type * as ViteModule from "vite";
import * as FrameworkCore from "../core/index.js";
import { type AstroTargetInput } from "./Target.vibe";
/**
 * Options for the Astro `Framework` integration. The deploy target is passed
 * as a value (`target`), keeping this module platform-neutral: all
 * platform-specific behavior (adapter/integration selection, bundler plugin
 * injection, dev SSR execution) lives in the target module.
 */
export interface AstroFrameworkOptions<TargetConfig = unknown> {
    /**
     * The deploy target: an `AstroTarget` value, a `(config) => AstroTarget`
     * factory, or a module specifier resolved from the project's own
     * `node_modules`. Defaults to this package's Cloudflare target module
     * (`"@alchemy.run/frontend-frameworks/astro/cloudflare"`). Factories and specifiers are
     * applied to {@link targetConfig}.
     */
    readonly target?: AstroTargetInput<TargetConfig> | undefined;
    /**
     * Target configuration passed to a target factory or specifier-loaded
     * target module. Opaque to this module — its shape belongs to the target
     * (Cloudflare: `{ worker?: CloudflareVitePluginOptions,
     * sessionKVBindingName?: string }`). Unused when {@link target} is already
     * a target *value*.
     */
    readonly targetConfig?: TargetConfig | undefined;
    /**
     * Extra Astro config merged into the in-memory `AstroInlineConfig`
     * (`site`, `base`, `integrations`, `devToolbar`, `vite`, ...). The
     * project's own `astro.config.*` file loads natively; this inline config
     * is merged OVER it by astro (arrays like `integrations`/`vite.plugins`
     * concatenate, scalars override). `root` is pinned; `output` is only set
     * when passed here (so a config file's `output` — or astro's `"static"`
     * default — is honored). Do not pass `adapter` — the deploy target
     * provides it, and a user-declared adapter fails the build with an
     * actionable error.
     */
    readonly astro?: AstroInlineConfig | undefined;
    /**
     * Path to an alternate Astro config file, resolved against {@link root}
     * when relative (astro itself resolves a relative `configFile` against
     * the process cwd, so this module anchors it to the project root before
     * handing it over). Defaults to astro's own config discovery
     * (`astro.config.*` in the project root).
     */
    readonly config?: string | undefined;
    /** Project root. Defaults to the process working directory. */
    readonly root?: string | undefined;
}
/** Inputs for {@link makeAstroInlineConfig} (exported for testing). */
export interface AstroConfigInputs {
    /** Absolute project root. */
    readonly root: string;
    /**
     * The deploy target's integration. Injected via `integrations` (after the
     * user's) rather than `adapter`: it registers itself as the adapter at
     * `astro:config:done`, where it also rejects a user-declared adapter with
     * an actionable error.
     */
    readonly integration: AstroIntegration;
    /** User Astro config merged in (its `vite.plugins` are preserved). */
    readonly userConfig?: AstroInlineConfig | undefined;
    /** Dev-server port (merged into `server.port`). */
    readonly port?: number | undefined;
    /** Dev-server host (merged into `server.host`). */
    readonly host?: string | undefined;
    /**
     * Extra Vite plugins appended after the user's (e.g. the build-output
     * collector).
     */
    readonly extraVitePlugins?: ReadonlyArray<ViteModule.Plugin> | undefined;
}
/**
 * Build the in-memory `AstroInlineConfig` — the overlay astro merges OVER
 * the project's own `astro.config.*` (which loads natively; `configFile`
 * is left undiscovered-default unless the user overlay carries one, so a
 * project without a config file falls back to a purely programmatic
 * config). Astro's `resolveConfig` merge
 * gives this inline config precedence: arrays (`integrations`,
 * `vite.plugins`) concatenate after the file's, scalars override.
 *
 * - The deploy target's integration is appended to `integrations` (it
 *   registers itself as the adapter at `astro:config:done` and fails the
 *   build if the user config already declares an `adapter`).
 * - `output` is NOT set unless the caller passes it explicitly: the inline
 *   config merges OVER the project's `astro.config.*`, so a default here
 *   would clobber the file's `output` (e.g. an explicit `"static"`). With
 *   neither source setting it, astro's own default (`"static"`, with
 *   per-route `prerender = false` opt-outs enabled by the adapter) applies.
 * - User `vite.plugins` are preserved ahead of the collector.
 */
export declare const makeAstroInlineConfig: (inputs: AstroConfigInputs) => AstroInlineConfig;
/**
 * The Astro implementation of framework-core's `Framework` service.
 *
 * - `build` resolves the deploy target, then either delegates wholesale to
 *   `target.build` (when the target defines one) or runs astro's programmatic
 *   `build(AstroInlineConfig)` with the target's adapter integration and the
 *   shared build-output collector on the `ssr` environment (skipping astro's
 *   node-side `astro`/`prerender` environments), finishing with
 *   `applyDeployTargetFinish`. `serverModules[0]` is the ssr entry chunk
 *   (`server/entry.mjs`); `clientDirectory` is `dist/client`, captured as a
 *   path so prerendered HTML written after the Vite build rides along.
 * - `dev` runs astro's `dev()` with the target's adapter integration; with
 *   the Cloudflare target the `ssr` environment executes inside workerd via
 *   the cloudflare-vite-plugin module runner, with in-memory bindings — no
 *   wrangler config anywhere. Closing the Scope stops the server.
 *
 * Returns the service implementation as an Effect (the alchemy-side
 * `FrameworkModule` contract); use {@link layer} for the `Layer` form the
 * e2e harness consumes.
 */
export declare const make: <TargetConfig = unknown>(options?: AstroFrameworkOptions<TargetConfig>) => Effect.Effect<FrameworkCore.Framework["Service"], never, FileSystem.FileSystem | Path.Path>;
/**
 * The `Layer` form of {@link make} — the shape the e2e harness's framework
 * factory contract expects (`(options) => Layer<Framework>`).
 */
export declare const layer: <TargetConfig = unknown>(options?: AstroFrameworkOptions<TargetConfig>) => Layer.Layer<FrameworkCore.Framework, never, FileSystem.FileSystem | Path.Path>;
