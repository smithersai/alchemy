import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import * as Path from "effect/Path";
/**
 * `Framework` implementation driving Vocs on Cloudflare Workers.
 *
 * Vocs 2.x is built on waku (its `vocs()` vite plugin composes waku's own
 * `waku/vite-plugins` — environments, adapter-alias, static-build, ... — with
 * vocs's mdx/config/patch plugins), but it does NOT use waku's
 * `unstable_combinedPlugins`, so `@alchemy.run/frontend-frameworks/waku`'s Framework layer
 * cannot drive it directly. This layer mirrors that package's orchestration
 * (see packages/frontend-frameworks/src/waku/Waku.ts) with vocs's plugin stack swapped in:
 *
 * - the deploy-target halves (wrangler-free adapter fork + cloudflare vite
 *   plugin pinned to waku's rsc entry) come from
 *   `@alchemy.run/frontend-frameworks/waku/cloudflare` — vocs uses waku's environments
 *   plugin, so the same rsc/ssr topology applies;
 * - the plugin stack is the one vocs's own CLI assembles
 *   (`[react(), vocs()]`), with the target's plugins injected ahead of
 *   vocs/waku's (the position where the workerd proxy middleware registers
 *   before waku's Node request bridge) and the adapter selected via vocs's
 *   `unstable_adapter` passthrough;
 * - the waku-parity vite config that `@alchemy.run/frontend-frameworks/waku` carries through
 *   the in-memory waku config (dedupe, workerd optimizeDeps, neutral rolldown
 *   platform) rides the inline vite config instead, since vocs owns the waku
 *   config it builds internally.
 */
import * as FrameworkCore from "../core/index.js";
import { type VocsTargetOption } from "./Target.js";
export interface VocsFrameworkOptions {
    /** Deploy target. Defaults to `@alchemy.run/frontend-frameworks/vocs/cloudflare`. */
    readonly target?: VocsTargetOption | undefined;
    /** @deprecated Target configuration alias retained for the E2E harness. */
    readonly vite?: unknown;
    /** Project root. Defaults to the operation root or current working directory. */
    readonly root?: string;
    /**
     * Default dev-server port, used when `dev` is called without an explicit
     * port (e.g. the Playwright dev fixture). Non-strict: if the port is taken,
     * vite falls back to the next free one. A port passed to `dev` directly
     * (`e2e dev --port N`) is strict and takes precedence.
     */
    readonly port?: number | undefined;
}
/**
 * The vocs implementation of framework-core's `Framework` service.
 *
 * - `build` replicates vocs's `vocs build` CLI command (`vite.createBuilder`
 *   with `[react(), vocs()]` + `buildApp`) with the cloudflare target's
 *   plugins/adapter wired in, and collects the `BuildOutput` with a
 *   post-`buildApp` disk re-read (waku writes `__waku_build_metadata.js` and
 *   prunes static-only chunks after the bundler finishes).
 * - `dev` replicates `vocs dev` (`vite.createServer`) with the same plugin
 *   wiring, so the rsc environment runs in workerd.
 */
export declare const make: (options?: VocsFrameworkOptions) => Layer.Layer<FrameworkCore.Framework, never, FileSystem.FileSystem | Path.Path>;
export default make;
