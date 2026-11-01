import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import type { PlatformError } from "effect/PlatformError";
import type * as ChildProcessSpawner from "effect/process/ChildProcessSpawner";
import * as Schema from "effect/Schema";
declare const RunnerError_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "RunnerError";
} & Readonly<A>;
export declare class RunnerError extends RunnerError_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
/**
 * The JSON configuration passed to `runner.mjs` (as `process.argv[2]`).
 * Mirrors the shape the runner script parses.
 */
export interface RunnerConfig {
    /** The Next.js application root. */
    readonly appDir: string;
    /** Explicit config relative to `appDir`; otherwise discover `open-next.config.ts`. */
    readonly configPath?: string | undefined;
    /** Resource-selected cache configuration when no native config file is present. */
    readonly cache?: "static-assets" | "kv" | undefined;
    /** `compatibility_date` of the in-memory wrangler-config stand-in. */
    readonly compatibilityDate: string;
    /** Skip the internal `next build` (reuse an existing `.next`). @default false */
    readonly skipNextBuild?: boolean | undefined;
    /** Minify the OpenNext bundling steps. @default false */
    readonly minify?: boolean | undefined;
    /** Enable OpenNext debug logging. @default false */
    readonly debug?: boolean | undefined;
    /**
     * The command the pipeline runs to build the Next.js app. Defaults (in the
     * runner) to `npx next build` — NOT the app's `build` script, which by
     * fixture convention is `e2e build` and would recurse into this runner.
     */
    readonly buildCommand?: string | undefined;
}
declare const BuildPaths: Schema.Struct<{
    readonly openNextDirectory: Schema.String;
    readonly appBuildOutputPath: Schema.String;
}>;
type BuildPaths = typeof BuildPaths.Type;
/** Discover the same default filename as the native Cloudflare OpenNext CLI. */
export declare const resolveConfigPath: (config: Pick<RunnerConfig, "appDir" | "configPath">) => Effect.Effect<string | undefined, PlatformError | RunnerError, FileSystem.FileSystem | Path.Path>;
/** Absolute path of the runner script in the package's `nextjs` directory. */
export declare const runnerPath: () => string;
/**
 * Run the programmatic `@opennextjs/cloudflare` build pipeline in a
 * disposable `node` child process (`runner.mjs`). The pipeline mutates
 * cwd-coupled module state, spawns `next build`, and can `process.exit(1)`,
 * so it must never run inside the calling process.
 *
 * Output is piped and re-emitted through the parent's own
 * `process.stdout`/`process.stderr` JS streams — NOT `stdio: "inherit"`.
 * `inherit` writes straight to the process file descriptors, bypassing any
 * in-process stdout capture (e.g. a test runner's log file), which silently
 * discards `next build`'s failure output when the pipeline exits non-zero.
 */
export declare const runOpenNextBuild: (config: RunnerConfig) => Effect.Effect<typeof BuildPaths.Type, RunnerError, ChildProcessSpawner.ChildProcessSpawner | FileSystem.FileSystem | Path.Path>;
export {};
