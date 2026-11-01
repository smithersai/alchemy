/**
 * `@alchemy.run/frontend-frameworks/react-router/node` — the Node container
 * deploy target for the React Router v7 integration.
 *
 * React Router builds through Vite: `reactRouter()` in the project's
 * `vite.config.ts` builds a `client` environment into
 * `<buildDirectory>/client` and a server environment into
 * `<buildDirectory>/server`. Its server output is a `ServerBuild` MANIFEST
 * with no default export, so the framework half makes the server build's
 * rollup input a wrapper that turns the manifest into a fetch handler with
 * `createRequestHandler` from `react-router` (see `serverEntrySource` in
 * `ReactRouter.ts`). What this target owns is the Node packaging on top of
 * that fetch handler:
 *
 * - **`serverEntryFileName`** — `index.js`, the chunk the server pass emits
 *   (React Router's `serverBuildFile`); the finishing pass wraps it.
 * - **`finish`** — emits the Node deployment surface next to the entry: a
 *   `package.json` (`type: "module"` so Node classifies the `.js` server
 *   build as ESM) and a Node HTTP program (`serve-node.mjs`) that serves
 *   `clientDirectory` first, then falls through to that fetch handler on
 *   `PORT` (default 3000), and answers `GET /health`.
 * - **`bundle`** — Node resolve conditions (no `workerd`, no `@aws-sdk/`).
 *
 * No Lambda adapter: the serve entry talks to the fetch handler directly.
 */
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import { type ReactRouterTarget, type ReactRouterTargetConfig } from "./ReactRouter.vibe";
/** The server entry file name React Router's server pass emits. */
export declare const SERVER_ENTRY_FILE_NAME = "index.js";
/** Node-specific knobs carried on the shared {@link ReactRouterTargetConfig}. */
export interface ReactRouterNodeTargetConfig extends ReactRouterTargetConfig {
}
/** The Node {@link ReactRouterTarget}, carrying the Node-specific config. */
export interface ReactRouterNodeTarget extends ReactRouterTarget {
    readonly config: ReactRouterNodeTargetConfig;
}
/**
 * A React Router build loads and executes the project's `vite.config.*` and
 * `react-router.config.ts` (user plugins may mutate `process.env` or
 * `process.chdir`, and React Router's config loader spins its own vite-node
 * server) — none of which may touch the engine process, where many deploys
 * share one event loop. This target's wholesale `build` therefore runs the
 * framework in a disposable child process whose working directory IS the
 * project root (see `core/BuildChild.ts`). The shared
 * `core/BuildChildRunner` entry imports this module in the child and calls
 * the exported {@link buildInChild}.
 */
export interface ReactRouterNodeBuildChildConfig {
    readonly rootDir: string;
    /** The (JSON-serializable) target config the parent was created with. */
    readonly config: ReactRouterNodeTargetConfig;
}
export declare const buildInChild: (config: ReactRouterNodeBuildChildConfig) => Effect.Effect<import("../core/BuildOutput.vibe").BuildOutput, import("../core/Framework.vibe").FrameworkError, FileSystem.FileSystem | Path.Path>;
/**
 * Create the Node {@link ReactRouterTarget}. See the module doc for the
 * seams.
 */
export declare const makeNodeTarget: (config?: ReactRouterNodeTargetConfig) => ReactRouterNodeTarget;
/**
 * The deploy-target module contract (`resolveDeployTarget` accepts the
 * default export — or the named `target` export — as a value or factory).
 */
export declare const target: typeof makeNodeTarget;
export default makeNodeTarget;
