/**
 * `@alchemy.run/frontend-frameworks/tanstack-start/node` — the Node
 * container deploy target for the TanStack Start integration.
 *
 * TanStack Start is pure Vite: `tanstackStart()` in the project's
 * `vite.config.ts` builds a `client` environment into `<outDir>/client` and
 * an `ssr` environment into `<outDir>/server`, whose entry module
 * default-exports `{ fetch }` — a web-standard fetch handler. There is no
 * adapter to select and no deployment preset; what this target owns is the
 * Node packaging:
 *
 * - **`serverEntryFileName`** — `server.js`, the chunk the SSR environment
 *   emits for the resolved server entry; the finishing pass wraps it.
 * - **`finish`** — emits the Node deployment surface next to the entry: a
 *   `package.json` (`type: "module"` so Node classifies the `.js` SSR
 *   bundle as ESM) and a Node HTTP program (`serve-node.mjs`) that serves
 *   `clientDirectory` first, then falls through to that fetch handler on
 *   `PORT` (default 3000), and answers `GET /health`.
 * - **`bundle`** — Node resolve conditions (no `workerd`, no `@aws-sdk/`).
 *
 * No Lambda adapter: the serve entry talks to the fetch handler directly.
 */
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import { type TanStackStartTarget, type TanStackStartTargetConfig } from "./TanStackStart.vibe";
/** The server entry file name the SSR environment emits. */
export declare const SERVER_ENTRY_FILE_NAME = "server.js";
/** Node-specific knobs carried on the shared {@link TanStackStartTargetConfig}. */
export interface TanStackStartNodeTargetConfig extends TanStackStartTargetConfig {
}
/**
 * A TanStack Start build loads and executes the project's `vite.config.*`
 * (its `tanstackStart()` plugin crawls framework packages from
 * `process.cwd()`, and user plugins may mutate `process.env` or
 * `process.chdir`) — none of which may touch the engine process, where many
 * deploys share one event loop. This target's wholesale `build` therefore
 * runs the framework in a disposable child process whose working directory
 * IS the project root (see `core/BuildChild.ts`). The shared
 * `core/BuildChildRunner` entry imports this module in the child and calls
 * the exported {@link buildInChild}.
 */
export interface TanStackStartNodeBuildChildConfig {
    readonly rootDir: string;
    /** The (JSON-serializable) target config the parent was created with. */
    readonly config: TanStackStartNodeTargetConfig;
}
export declare const buildInChild: (config: TanStackStartNodeBuildChildConfig) => Effect.Effect<import("../core/BuildOutput.vibe").BuildOutput, import("../core/Framework.vibe").FrameworkError, FileSystem.FileSystem | Path.Path>;
/**
 * Create the Node {@link TanStackStartTarget}. See the module doc for the
 * seams.
 */
export declare const makeNodeTarget: (config?: TanStackStartNodeTargetConfig) => TanStackStartTarget;
/**
 * The deploy-target module contract (`resolveDeployTarget` accepts the
 * default export — or the named `target` export — as a value or factory).
 */
export declare const target: typeof makeNodeTarget;
export default makeNodeTarget;
