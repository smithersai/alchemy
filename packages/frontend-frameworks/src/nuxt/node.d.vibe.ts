/**
 * `@alchemy.run/frontend-frameworks/nuxt/node` — the Node container deploy
 * target for the Nuxt integration.
 *
 * Nuxt's Node story is nitro's `node` (node-listener) preset:
 * `.output/server` is a self-contained Node ESM bundle whose entry exports
 * a Node `(req, res)` `handler`, and `.output/public` holds the static
 * assets. The finishing pass writes a Node HTTP program that serves
 * `clientDirectory` first, then falls through to that handler on `PORT`
 * (default 3000), and answers `GET /health`.
 *
 * - **`nitroPreset`** — `"node"`, enforced as the last word on the
 *   resolved nitro config. A user `nitro.preset` mismatch fails the build.
 * - **`entry`** — surfaces `config.main` as the generic user-entry carriage.
 * - **`bundle`** — Node resolve conditions (no `workerd`, no `@aws-sdk/`).
 */
import * as Effect from "effect/Effect";
import * as Path from "effect/Path";
import { type NuxtTarget, type NuxtTargetConfig } from "./Nuxt.vibe";
/** The nitro deployment preset this target builds with. */
export declare const NITRO_PRESET = "node";
/**
 * The importable specifier of nitro's node-listener runtime handler — the
 * module a USER entry re-exports to wrap the framework's handler.
 */
export declare const NITRO_HANDLER_SPECIFIER = "nitropack/presets/node/runtime/node-listener";
export interface NuxtNodeTargetConfig extends NuxtTargetConfig {
}
export interface NuxtNodeBuildChildConfig {
    readonly rootDir: string;
    readonly config: NuxtNodeTargetConfig;
}
export declare const buildInChild: (config: NuxtNodeBuildChildConfig) => Effect.Effect<import("../core/BuildOutput.vibe").BuildOutput, import("../core/Framework.vibe").FrameworkError, import("effect/FileSystem").FileSystem | Path.Path>;
export declare const makeNodeTarget: (config?: NuxtNodeTargetConfig) => NuxtTarget;
export declare const target: typeof makeNodeTarget;
export default makeNodeTarget;
