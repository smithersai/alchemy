import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import type { BuildOutput } from "./BuildOutput.vibe";
import { FrameworkError } from "./Framework.vibe";
/**
 * The contract a framework source module fulfills to be buildable in a
 * child: a pure `buildInChild` export that turns the JSON config into the
 * build Effect. Tests can call it directly in-process; `runBuildChild`
 * executes it in the shared runner entry.
 */
export interface BuildChildModule {
    readonly buildInChild: (config: never) => Effect.Effect<BuildOutput, unknown, FileSystem.FileSystem | Path.Path>;
}
/** The runner's `argv[2]` payload (JSON). */
export interface BuildChildPayload {
    /** File URL of the framework source module exporting `buildInChild`. */
    readonly module: string;
    /** JSON-serializable config handed to the module's `buildInChild`. */
    readonly config: unknown;
    /** Where the runner persists the resulting `BuildOutput` (build.json). */
    readonly outputPath: string;
    /** Where the runner persists the failure message when the build fails. */
    readonly errorPath: string;
}
export interface BuildChildOptions {
    /** Use Node from PATH for toolchains that cannot build under Bun. Requires native TypeScript support when running source modules. */
    readonly runtime?: "node" | undefined;
    /**
     * File URL of the module exporting `buildInChild` — pass
     * `import.meta.url`. The shared runner entry (resolved as a sibling of
     * this module's `core/` directory) imports it in the child.
     */
    readonly module: string;
    /** Project root — becomes the child's working directory. */
    readonly rootDir: string;
    /** JSON-serializable config handed to the module's `buildInChild`. */
    readonly config: unknown;
    /** Framework name for error attribution (e.g. "sveltekit", "waku"). */
    readonly framework: string;
    /**
     * Extra process env for the child only. Merged over the parent's env
     * at spawn time so Vite/nitro/`import.meta.env` see site `env` without
     * the parent mutating `process.env`. NODE_ENV defaults to production;
     * an explicit value here overrides that default (plugins in the child may still
     * mutate theirs — that is why this is a child).
     */
    readonly env?: Record<string, string> | undefined;
}
/**
 * Resolve a site's raw `env` into the plain strings a build child sees on
 * `process.env`, so frameworks inline declared public values
 * (`NEXT_PUBLIC_*`, `PUBLIC_*`, `VITE_*`, ...) at build time. Strings pass
 * through, `Redacted<string>`s are unwrapped, numbers and booleans are
 * stringified; bindings and other values are dropped.
 */
export declare const resolveBuildEnv: (env: Record<string, unknown> | undefined) => Record<string, string>;
/**
 * Run a framework production build in a disposable child process with
 * `cwd = rootDir` and return its {@link BuildOutput}.
 *
 * Build output becomes log records — NOT `stdio: "inherit"` — so the
 * process that renders logs shows it and in-process capture (a test
 * runner's log file) sees it.
 */
export declare const runBuildChild: (options: BuildChildOptions) => Effect.Effect<BuildOutput, FrameworkError, FileSystem.FileSystem | Path.Path>;
