/**
 * `@alchemy.run/frontend-frameworks/octane/node` — the Node container deploy
 * target for the Octane integration.
 *
 * Node-hosted `Website.Octane` resources select this target, which
 * automatically wraps Octane's default native Node output. No adapter is
 * required in `octane.config.ts`: the project's own `vite build` emits
 * `dist/server/entry.js`, a self-contained Node ESM bundle exporting a
 * web-standard fetch `handler`.
 * The finishing pass writes a Node HTTP program that serves
 * `clientDirectory` first, then falls through to that handler on `PORT`
 * (default 3000), and answers `GET /health`. It re-reads `dist/server`
 * so runtime inputs — notably the SSR `index.html` the entry reads via
 * `join(__dirname, "./index.html")` — stay in the output. Container
 * FrameworkSites extraFile that template to dest `"index.html"` next to
 * the bundled `index.mjs` (not into `dist/`, or NodeServe would serve
 * the unrendered shell at `GET /`). The finish pass also disables
 * Octane's `isMainModule` auto-listen so rolldown flattening `entry.js`
 * into `index.mjs` cannot bind `PORT` before the generated serve entry.
 *
 * - **`adapterName` / `adapterPackage`** — identify the optional legacy Node
 *   marker adapter, still accepted for existing projects.
 * - **`serverEntryFileName`** — `entry.js`, Octane's emitted node entry.
 * - **`bundle`** — Node resolve conditions (no `workerd`, no `@aws-sdk/`).
 */
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import { type OctaneTarget, type OctaneTargetConfig } from "./Octane.vibe";
/** The `adapter.name` the Node marker adapter declares. */
export declare const ADAPTER_NAME = "node";
/** The optional legacy Node marker adapter module for existing configs. */
export declare const ADAPTER_PACKAGE = "@alchemy.run/frontend-frameworks/octane/node-adapter";
/** Octane's emitted node server entry within the server output directory. */
export declare const SERVER_ENTRY_FILE_NAME = "entry.js";
export interface OctaneNodeTargetConfig extends OctaneTargetConfig {
}
export interface OctaneNodeBuildChildConfig {
    readonly rootDir: string;
    readonly config: OctaneNodeTargetConfig;
}
export declare const buildInChild: (config: OctaneNodeBuildChildConfig) => Effect.Effect<import("../core/BuildOutput.vibe").BuildOutput, import("../core/Framework.vibe").FrameworkError, FileSystem.FileSystem | Path.Path>;
export declare const makeNodeTarget: (config?: OctaneNodeTargetConfig) => OctaneTarget;
export declare const target: typeof makeNodeTarget;
export default makeNodeTarget;
