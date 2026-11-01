/**
 * `@alchemy.run/frontend-frameworks/vite/node` — the Node container deploy
 * target for the plain Vite integration.
 *
 * A plain Vite build is assets-only (client bundle + `index.html`). The
 * finishing pass writes a Node HTTP program (`serve-node.mjs`) into
 * `clientDirectory` that serves those files, answers `GET /health`, and
 * applies SPA / 404-page fallback. Platform composites deploy that file
 * as-is (`isExternal`) — they do not generate a second static server.
 *
 * The wholesale `build` hook runs the project's `vite build` in a
 * disposable child process whose working directory IS the project root
 * (see `core/BuildChild.ts`).
 */
import * as Effect from "effect/Effect";
import * as Path from "effect/Path";
import { type ViteTarget, type ViteTargetConfig } from "./Vite.vibe";
/** The runner's JSON payload for the build child (see `core/BuildChild.ts`). */
export interface ViteNodeBuildChildConfig {
    readonly rootDir: string;
    /** The (JSON-serializable) target config the parent was created with. */
    readonly config: ViteTargetConfig;
}
/** The pure in-child build entry the shared `BuildChildRunner` invokes. */
export declare const buildInChild: (config: ViteNodeBuildChildConfig) => Effect.Effect<import("../core/BuildOutput.vibe").BuildOutput, import("../core/Framework.vibe").FrameworkError, import("effect/FileSystem").FileSystem | Path.Path>;
/**
 * Create the Node {@link ViteTarget}: the assets-only target whose `build`
 * spawns the vite build in a child process.
 */
export declare const makeNodeTarget: (config?: ViteTargetConfig) => ViteTarget;
/**
 * The deploy-target module contract (`resolveDeployTarget` accepts the
 * default export — or the named `target` export — as a value or factory).
 */
export declare const target: typeof makeNodeTarget;
export default makeNodeTarget;
