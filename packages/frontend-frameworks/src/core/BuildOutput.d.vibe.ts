import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import type { PlatformError } from "effect/PlatformError";
import type { NodeServeEntryOptions } from "./NodeServe.vibe";
/**
 * A single server module produced by a framework build.
 *
 * `name` is the module path relative to the build's `distDirectory`
 * (e.g. `server/index.js`). Binary content is normalized to `Buffer` so it
 * survives a JSON round-trip through `dist/build.json`.
 */
export interface OutputFile {
    name: string;
    content: string | Uint8Array;
    hash: string;
}
/**
 * The framework-integration build contract.
 *
 * Every framework integration (Vite, Waku, Astro, SvelteKit, Next.js, ...)
 * produces this shape:
 *
 * - `clientDirectory` — the static-assets directory, captured as a path so
 *   files written after the bundler finishes (SSG HTML, prerendered pages)
 *   ride along.
 * - `serverModules` — the worker modules, **entry first**, each with a sha256
 *   content hash. `undefined` for assets-only builds.
 * - `externalWorkspaces` — workspace roots (directories containing a
 *   `package.json`) of modules imported from outside the project root, used
 *   for watch/memoization.
 */
export interface BuildOutput {
    /** Root output directory of the build (e.g. `<root>/dist`). */
    distDirectory?: string | undefined;
    clientDirectory: string | undefined;
    serverModules: Array<OutputFile> | undefined;
    externalWorkspaces: Set<string>;
    /** Portable handler and asset configuration, independent of a listening Node server. */
    nodeServe?: NodeServeEntryOptions | undefined;
}
/**
 * Create an {@link OutputFile}, hashing the content with sha256. The name is
 * normalized to `/` separators: it becomes a workerd module name or upload
 * path, where `\` is never valid.
 */
export declare const toOutputFile: (name: string, content: string | Uint8Array) => Effect.Effect<OutputFile>;
/**
 * Sort server modules entry-first (the module named `entry` comes first, the
 * rest sorted lexicographically) — the order the `BuildOutput` contract
 * requires. Module names always use `/`, so a Windows-style `entry` (e.g.
 * from `path.join`) is normalized before matching.
 */
export declare const sortServerModules: (modules: Array<OutputFile>, entry: string | undefined) => Array<OutputFile>;
/**
 * Serialize a {@link BuildOutput} for persistence (`dist/build.json`).
 * Sets are serialized as sorted arrays; binary modules use base64 rather
 * than expanding every byte into a JSON array element.
 *
 * @internal harness plumbing (the e2e harness's persistence mechanism), not
 * part of the public framework-integration API.
 */
export declare const stringifyBuildOutput: (output: BuildOutput) => string;
/**
 * Parse a persisted {@link BuildOutput}, reviving `Buffer` content and the
 * `externalWorkspaces` Set (tolerating the legacy `{}` serialization).
 *
 * @internal harness plumbing (the e2e harness's persistence mechanism), not
 * part of the public framework-integration API.
 */
export declare const parseBuildOutput: (content: string) => BuildOutput;
/**
 * Persist a {@link BuildOutput} to disk (conventionally `dist/build.json`,
 * so preview/serve flows stay uniform across frameworks).
 *
 * Creates the target's parent directory if it does not exist — with a nested
 * project root (e.g. `fixtures/x/app`) the framework writes its own output to
 * `app/dist`, so the harness-level `<cwd>/dist` may not exist yet.
 *
 * @internal harness plumbing (the e2e harness's persistence mechanism), not
 * part of the public framework-integration API.
 */
export declare const writeBuildOutput: (filePath: string, output: BuildOutput) => Effect.Effect<void, PlatformError, FileSystem.FileSystem | Path.Path>;
/**
 * Read a persisted {@link BuildOutput} from disk.
 *
 * @internal harness plumbing (the e2e harness's persistence mechanism), not
 * part of the public framework-integration API.
 */
export declare const readBuildOutput: (path: string) => Effect.Effect<BuildOutput, PlatformError, FileSystem.FileSystem>;
