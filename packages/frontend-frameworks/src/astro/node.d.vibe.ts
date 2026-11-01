/**
 * `@alchemy.run/frontend-frameworks/astro/node` — the Node container deploy
 * target for the Astro integration.
 *
 * Astro's Node story is a plain Node SSR bundle behind a long-running HTTP
 * server: the adapter integration pins this package's `node-server`
 * entrypoint (which exports `App.render` as a fetch handler) as the build's
 * server entry, and forces the server build to be **self-contained**
 * (`vite.ssr.noExternal: true`). The finishing pass writes a Node HTTP
 * program that serves `clientDirectory` first, then falls through to that
 * handler on `PORT` (default 3000), and answers `GET /health`.
 *
 * - **`integration`** — the adapter integration: registers itself via
 *   `setAdapter` at `astro:config:done` (rejecting a user-declared adapter
 *   with an actionable error) and pins the `node-server` entrypoint.
 * - **`finish`** — a fully-static build (`output: "static"`) writes the
 *   same Node static serve entry Vite uses. Otherwise writes the HTTP
 *   serve entry (static files then the Astro fetch handler) and pins it
 *   as `serverModules[0]`.
 * - **`selectServerEntry`** — pins the adapter's entry chunk as
 *   `serverModules[0]` before the finishing pass wraps it.
 * - **`bundle`** — Node resolve conditions (no `workerd`, no `@aws-sdk/`).
 */
import type { AstroInlineConfig, AstroIntegration } from "astro";
import * as Effect from "effect/Effect";
import * as Path from "effect/Path";
import { type NodeServeHtmlHandling, type NodeServeNotFoundHandling } from "../core/NodeServe.vibe";
import type { AstroTarget } from "./Target.vibe";
/**
 * The importable specifier of this package's Node server entrypoint — the
 * module the adapter pins as `serverEntrypoint`. It exports a fetch
 * `handler`.
 */
export declare const SERVER_ENTRYPOINT = "@alchemy.run/frontend-frameworks/astro/entrypoints/node-server";
/** Node-specific target configuration. */
export interface AstroNodeConfig {
    readonly htmlHandling?: NodeServeHtmlHandling;
    readonly notFoundHandling?: NodeServeNotFoundHandling;
}
export interface AstroNodeTarget extends AstroTarget<AstroNodeConfig> {
}
/** Options for {@link distilledNode} (the adapter integration). */
export interface DistilledNodeOptions {
    /**
     * Reports the resolved build output mode (`astro:config:done`'s
     * `buildOutput`): `"static"` when every route is prerendered, `"server"`
     * when any route renders on demand. The target's `finish` pass uses it to
     * strip `serverModules` from a fully-static build so the deploy is
     * assets-only.
     * @internal
     */
    readonly onBuildOutput?: ((buildOutput: "static" | "server") => void) | undefined;
    /**
     * Reports the resolved server-entry file name (`config.build.serverEntry`,
     * `entry.mjs` by default) so the entry chunk can be pinned as
     * `serverModules[0]` before the serve wrap.
     * @internal
     */
    readonly onServerEntryName?: ((name: string) => void) | undefined;
}
/**
 * The Node adapter integration for Astro. Injected via `integrations`
 * (after the user's) rather than `adapter`: it registers itself as the
 * adapter at `astro:config:done`, where it also rejects a user-declared
 * adapter with an actionable error.
 */
export declare const distilledNode: (options?: DistilledNodeOptions) => AstroIntegration;
export interface AstroNodeBuildChildConfig {
    readonly rootDir: string;
    readonly config: AstroNodeConfig;
    readonly astro: AstroInlineConfig | undefined;
}
export declare const buildInChild: (config: AstroNodeBuildChildConfig) => Effect.Effect<import("../core/BuildOutput.vibe").BuildOutput, import("../core/Framework.vibe").FrameworkError, import("effect/FileSystem").FileSystem | Path.Path>;
/**
 * Build the Node {@link AstroTarget}. See the module doc for the seams.
 */
export declare const makeNodeTarget: (config?: AstroNodeConfig) => AstroNodeTarget;
export declare const target: typeof makeNodeTarget;
export default makeNodeTarget;
