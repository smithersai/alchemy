/**
 * Shared Node HTTP serve-entry generator for the Node deploy targets
 * (containers and AWS Lambda Web Functions).
 *
 * The finishing pass of each SSR node target writes one of these files and
 * pins it as `serverModules[0]`. The program is a complete bun/node entry
 * (`isExternal: true` on the platform Service): it listens on
 * `AWS_LAMBDA_HTTP_ENDPOINT` when Lambda sets it, otherwise `PORT`
 * (default 3000), answers `GET /health`, serves `clientDirectory` on GET
 * first, then falls through to the framework fetch/Node handler.
 */
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import { type BuildOutput, type OutputFile } from "./BuildOutput.vibe";
import { DeployTargetError } from "./DeployTarget.vibe";
/** Node resolve conditions for server code (no `workerd`). */
export declare const NODE_BUNDLE_CONDITIONS: readonly ["node", "import", "module", "default"];
/** The file name the finishing pass writes next to the framework server entry. */
export declare const NODE_SERVE_ENTRY_FILE_NAME = "serve-node.mjs";
/** Default listen port (Hetzner `deployUnit` curls `/health` whenever `PORT` is set). */
export declare const NODE_DEFAULT_PORT = 3000;
export type NodeServeHtmlHandling = "none" | "drop-trailing-slash";
export type NodeServeNotFoundHandling = "none" | "spa" | "404-page";
export type NodeServeHandlerKind = "fetch" | "node";
export interface NodeServeHandler {
    /** `"fetch"` is `(request) => Response`; `"node"` is `(req, res) => void`. */
    readonly kind: NodeServeHandlerKind;
    /** ESM import statements for the handler module. */
    readonly imports: string;
    /** Expression that evaluates to the fetch handler or Node listener. */
    readonly expr: string;
}
export interface NodeServeEntryOptions {
    /**
     * JS expression resolving the on-disk client-assets directory
     * (typically `fileURLToPath(new URL("../client/", import.meta.url))`).
     * Omit to skip static-file serving (Next.js handles its own assets).
     */
    readonly clientDirExpression?: string | undefined;
    /** Mount the client directory at this URL pathname. @default "/" */
    readonly assetBasePath?: string | undefined;
    /**
     * Framework request handler. Omit for assets-only sites (Vite SPA,
     * `vite build` output): unmatched GETs 404 after static lookup / SPA
     * fallback.
     */
    readonly handler?: NodeServeHandler | undefined;
    /** Serve a prerendered index.html at / even when a handler exists. @default false */
    readonly serveRootIndex?: boolean | undefined;
    /**
     * Vocs/Waku: serve `about/index.html` at `/about` (CF
     * `htmlHandling: "drop-trailing-slash"`).
     * @default "none"
     */
    readonly htmlHandling?: NodeServeHtmlHandling | undefined;
    /**
     * Fallback when no static file matches: `"spa"` serves `index.html`,
     * `"404-page"` serves `404.html` with status 404. A handler still runs
     * when the fallback file is missing.
     * @default "none"
     */
    readonly notFoundHandling?: NodeServeNotFoundHandling | undefined;
    /** HTML file served for a 404-page fallback, relative to the client directory. @default "404.html" */
    readonly errorPage?: string | undefined;
    /** @default 3000 */
    readonly defaultPort?: number | undefined;
    /**
     * Log `http://host:port` once the listener is bound. Local `alchemy dev`
     * StaticSite uses this so `Command.Dev` can parse the URL (`PORT=0`).
     * @default false
     */
    readonly printUrl?: boolean | undefined;
}
/**
 * JS expression that resolves `clientDirectory` relative to a serve-entry
 * file via `import.meta.url`. Falls back to an absolute JSON string when
 * the two paths do not share a relative root (e.g. different Windows drives).
 */
export declare const relativeClientDirExpression: (fromFile: string, clientDirectory: string) => string;
/** Pin `serveModule` as `serverModules[0]`, keeping the rest of the bundle. */
export declare const pinNodeServeModule: (output: BuildOutput, serveModule: OutputFile) => BuildOutput;
/** Shared URL-to-asset mapping; framework handlers retain the original request URL. */
export declare const staticAssetPathSource: (assetBasePath?: string) => string;
/**
 * Generate a complete Node/Bun HTTP program: `/health`, GET static assets,
 * then the framework handler. No package imports other than `node:*` and
 * the handler module the caller passes in.
 */
export declare const makeNodeServeEntrySource: (options: NodeServeEntryOptions) => string;
export interface WriteNodeServeEntryOptions extends NodeServeEntryOptions {
    readonly output: BuildOutput;
    /** Absolute path of the serve-entry file to write. */
    readonly servePath: string;
    /**
     * Module name relative to `distDirectory` (POSIX), e.g.
     * `server/serve-node.mjs`. Becomes `serverModules[0]`.
     */
    readonly serveModuleName: string;
    readonly platform?: string | undefined;
}
/** Write the serve entry to disk and pin it as `serverModules[0]`. */
export declare const writeNodeServeEntry: (options: WriteNodeServeEntryOptions) => Effect.Effect<BuildOutput, DeployTargetError, FileSystem.FileSystem | Path.Path>;
