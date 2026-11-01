/**
 * Child-process isolation for framework DEV servers.
 *
 * Several framework toolchains require `cwd === project root` at dev-server
 * startup (SolidStart resolves the app from the cwd at config-load time,
 * Waku resolves its html shell and relative inputs from the cwd), so their
 * integrations `process.chdir` around startup — and SvelteKit's plugin
 * construction races when several projects load `@sveltejs/kit` graphs
 * concurrently in one process. None of that may run in a process hosting
 * MANY dev servers (the alchemy dev sidecar serves every website of a run):
 * concurrent chdir windows interleave, cwd-relative reads and spawns race,
 * and a transient chdir into a since-deleted temp root breaks unrelated
 * sites. The same class of problem production builds solved with
 * `core/BuildChild.ts` (and Next.js dev solved with its `next dev` child).
 *
 * Instead, each such dev server runs in a DEDICATED child process whose
 * working directory IS the project root — no chdir anywhere, no lock:
 *
 * - The **parent** ({@link runDevChild}) spawns the shared
 *   `core/DevChildRunner.ts` entry with `cwd = rootDir`, forwards the dev
 *   server's output, and resolves once the child prints the
 *   {@link DEV_CHILD_URL_REGEX} readiness marker. The child lives in the
 *   ambient Scope — the same lifetime an in-process dev handle has — and
 *   is stopped (SIGTERM, then SIGKILL) when that scope closes.
 * - The **child** (`DevChildRunner`) imports the framework-integration
 *   module (a bare specifier, self-resolved within this package), calls
 *   `make(config.makeOptions).dev(config.devOptions)`, prints the marker,
 *   and serves until SIGTERM interrupts it. The runner sets
 *   {@link DEV_CHILD_ENV_KEY} so the integration's `dev` takes its
 *   in-process path inside the child instead of recursing.
 */
import * as Effect from "effect/Effect";
import type * as Scope from "effect/Scope";
import { FrameworkError, type FrameworkDevServer } from "./Framework.vibe";
/**
 * Set on the spawned runner (and inherited by its descendants) so a
 * framework integration's `dev` runs the dev server IN-PROCESS when it is
 * already inside a dev child.
 */
export declare const DEV_CHILD_ENV_KEY = "ALCHEMY_FRAMEWORK_DEV_CHILD";
/** `true` when this process IS a spawned dev child (or one of its children). */
export declare const isInsideDevChild: () => boolean;
/** The runner's `argv[2]` payload (JSON). */
export interface DevChildPayload {
    /**
     * Framework-integration module specifier (e.g.
     * `"@alchemy.run/frontend-frameworks/waku"`). Imported by the runner —
     * a bare self-reference resolves within this package.
     */
    readonly module: string;
    /** JSON-serializable options handed to the module's `make(...)`. */
    readonly makeOptions: Record<string, unknown>;
    /** Options handed to the built service's `dev(...)`. */
    readonly devOptions: {
        readonly root: string;
        readonly port?: number | undefined;
        readonly host?: string | undefined;
    };
}
/** Marker line the child prints once the dev server is listening. */
export declare const DEV_CHILD_URL_REGEX: RegExp;
export declare const devChildUrlMarker: (url: string) => string;
/**
 * `true` when `value` survives a JSON round-trip losslessly — i.e. it
 * contains no functions, symbols, bigints, class instances, or cycles a
 * child process could not reconstruct. Integrations use this to decide
 * whether their `make` options can cross the process boundary; when they
 * cannot (e.g. the e2e harness passes deploy-target VALUES or live vite
 * plugins), `dev` falls back to the in-process path.
 */
export declare const isJsonSerializable: (value: unknown) => boolean;
export interface DevChildOptions {
    /** Use Node from PATH for toolchains that cannot run under Bun. Requires native TypeScript support when running source modules. */
    readonly runtime?: "node" | undefined;
    /** Framework name for error attribution (e.g. "solidstart", "waku"). */
    readonly framework: string;
    /** Bare module specifier the runner imports (see {@link DevChildPayload}). */
    readonly module: string;
    /**
     * `import.meta.url` of the CALLING framework module. The shared runner
     * entry is resolved as `../core/DevChildRunner.*` relative to it — which
     * lands on the stable entry file in both layouts
     * (`src/{fw}/X.ts` → `src/core/DevChildRunner.ts`,
     * `dist/_chunks/X.js` → `dist/core/DevChildRunner.js`).
     */
    readonly callerUrl: string;
    /** Project root — becomes the child's working directory. */
    readonly rootDir: string;
    /** JSON-serializable options for the module's `make(...)`. */
    readonly makeOptions: Record<string, unknown>;
    /** Options for the built service's `dev(...)`. */
    readonly devOptions: DevChildPayload["devOptions"];
}
/**
 * Start a framework dev server in a dedicated child process with
 * `cwd = rootDir` and resolve with its local URL at readiness. The child
 * lives in the ambient Scope; closing it stops the dev server.
 */
export declare const runDevChild: (options: DevChildOptions) => Effect.Effect<FrameworkDevServer, FrameworkError, Scope.Scope>;
