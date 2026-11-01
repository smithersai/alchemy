/**
 * `@alchemy.run/frontend-frameworks/waku/node` — the Node container deploy
 * target for the Waku integration.
 *
 * Waku's Node story is a plain-Node waku build with waku's own `node`
 * adapter selected via `unstable_adapter`. The finishing pass writes a
 * Node HTTP program that serves `clientDirectory` first (extensionless
 * HTML: `/about` → `about/index.html`), then falls through to
 * `INTERNAL_runFetch` on `PORT` (default 3000), and answers `GET /health`.
 *
 * - **`adapter`** — the project's `waku/adapters/node`.
 * - **`vitePlugins`** — none (plain Node; no workerd plugin).
 * - **`bundle`** — Node resolve conditions (no `workerd`, no `@aws-sdk/`).
 */
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import type { Config as WakuConfig } from "waku/config";
import { type WakuTarget } from "./Waku.vibe";
export type { WakuTarget, WakuTargetContext } from "./Waku.vibe";
export interface WakuNodeTargetConfig {
    readonly main?: string | undefined;
}
export interface WakuNodeBuildChildConfig {
    readonly rootDir: string;
    readonly config: WakuNodeTargetConfig | undefined;
    readonly waku: WakuConfig | undefined;
}
export declare const buildInChild: (config: WakuNodeBuildChildConfig) => Effect.Effect<import("../core/BuildOutput.vibe").BuildOutput, import("../core/Framework.vibe").FrameworkError, FileSystem.FileSystem | Path.Path>;
export declare const makeNodeTarget: (config?: WakuNodeTargetConfig) => WakuTarget<WakuNodeTargetConfig | undefined>;
export declare const target: typeof makeNodeTarget;
export default makeNodeTarget;
