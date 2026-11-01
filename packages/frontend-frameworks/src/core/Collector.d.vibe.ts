import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import type * as Vite from "vite";
import { type BuildOutput, type OutputFile } from "./BuildOutput.vibe";
declare const CollectorError_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "CollectorError";
} & Readonly<A>;
export declare class CollectorError extends CollectorError_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
/**
 * The synthetic module prefix `@alchemy.run/cloudflare-runtime/rolldown`
 * wraps worker entries with. Mirrored here (rather than imported) so the
 * collector has no runtime dependency on the plugin; an equality test guards
 * the constant against drift.
 */
export declare const WORKER_ENTRY_PREFIX = "\0distilled:worker-entry:";
/** Files re-read from disk as text (everything else is read as binary). */
export declare const DEFAULT_TEXT_FILE_REGEX: RegExp;
/** The entry-chunk information {@link CollectorOptions.selectEntry} receives. */
export interface ServerEntryChunk {
    /** The emitted file name, relative to the environment's outDir. */
    readonly fileName: string;
    /** The server-module name (outDir prefix + fileName), as it appears in `serverModules`. */
    readonly name: string;
    /** The chunk's facade module id (the resolved input id), if any. */
    readonly facadeModuleId: string | null;
}
export interface CollectorOptions {
    /**
     * The environment whose entry chunk becomes `serverModules[0]`.
     * @default "ssr"
     */
    readonly entryEnvironment?: string | undefined;
    /**
     * The environment whose outDir becomes `clientDirectory`.
     * @default "client"
     */
    readonly clientEnvironment?: string | undefined;
    /**
     * Environments that must not contribute server modules (e.g. Astro's
     * node-side `prerender` environment, whose output is deleted after
     * prerendering completes).
     * @default []
     */
    readonly skipEnvironments?: ReadonlyArray<string> | undefined;
    /**
     * Pin the server entry when the entry environment emits multiple entry
     * chunks (e.g. Waku's rsc environment emits `index`, `build`, and the
     * wrapped worker entry). When omitted, a chunk whose facade is the wrapped
     * `\0distilled:worker-entry:` module is preferred; a chunk matched by this
     * predicate takes precedence over both.
     */
    readonly selectEntry?: ((chunk: ServerEntryChunk) => boolean) | undefined;
}
/**
 * Build a {@link CollectorOptions.selectEntry} predicate that pins the chunk
 * whose facade module is the given entry file — tolerating synthetic wrapper
 * ids that embed the resolved path (the `\0distilled:worker-entry:`-wrapped
 * main). Pair with `resolveDeployTargetEntry`: when a deploy target carries a
 * user entry ({@link DeployTargetEntry}), the chunk built from it must become
 * `serverModules[0]` even if the framework normally pins its own entry module.
 */
export declare const selectEntryByFacade: (entryPath: string) => ((chunk: ServerEntryChunk) => boolean);
export interface CollectOptions {
    /**
     * Re-read the server environments' outDirs from disk instead of using the
     * in-memory `writeBundle` capture. Required for frameworks that write
     * additional server modules or rewrite chunks on disk *after* the bundler
     * finishes (e.g. Waku writes `__waku_build_metadata.js` and prunes
     * static-only chunks during `buildApp` hooks).
     * @default false
     */
    readonly fromDisk?: boolean | undefined;
    /**
     * Decides which on-disk files are read as text when `fromDisk` is set.
     * @default matches {@link DEFAULT_TEXT_FILE_REGEX}
     */
    readonly isTextFile?: ((fileName: string) => boolean) | undefined;
}
export interface BuildOutputCollector {
    /**
     * The Vite plugin. Add it to the build's plugins (it is shared across
     * environments); create a fresh collector per build.
     */
    readonly plugin: Vite.Plugin;
    /** Assemble the {@link BuildOutput} after `builder.buildApp()` resolves. */
    readonly collect: (options?: CollectOptions) => Effect.Effect<BuildOutput, CollectorError>;
}
/**
 * Create the `alchemy:build-output` collector: a Vite plugin that captures
 * the client directory, server modules (entry first, sha256-hashed), and
 * external workspace directories from a framework build.
 */
export declare const makeBuildOutputCollector: (options?: CollectorOptions) => Effect.Effect<BuildOutputCollector, never, FileSystem.FileSystem>;
export interface ReadServerModulesOptions {
    /** The directory to read (a server environment's outDir). */
    readonly directory: string;
    /**
     * Prefix prepended to every module name (the outDir's path relative to the
     * build's dist directory, e.g. `server`).
     * @default ""
     */
    readonly prefix?: string | undefined;
    /**
     * Decides which files are read as text (everything else is read as binary).
     * @default matches {@link DEFAULT_TEXT_FILE_REGEX}
     */
    readonly isTextFile?: ((fileName: string) => boolean) | undefined;
}
/**
 * Read a server output directory from disk into {@link OutputFile}s (unsorted;
 * use {@link sortServerModules} to put the entry first). Used by frameworks
 * whose final server bundle lives on disk rather than in Vite's in-memory
 * `writeBundle` (SvelteKit's rolldown pass, Next.js's `.open-next` output),
 * and by the collector's `fromDisk` mode.
 */
export declare const readServerModulesFromDisk: (options: ReadServerModulesOptions) => Effect.Effect<Array<OutputFile>, CollectorError, FileSystem.FileSystem>;
/**
 * Resolve the workspace root (nearest directory containing a `package.json`)
 * of every directory, deduplicated. Directories with no enclosing workspace
 * are dropped.
 */
export declare const collectExternalWorkspaces: (directories: Iterable<string>) => Effect.Effect<Set<string>, CollectorError, FileSystem.FileSystem>;
export {};
