import * as Effect from "effect/Effect";
import type * as Esbuild from "esbuild";
declare const BundleError_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "BundleError";
} & Readonly<A>;
export declare class BundleError extends BundleError_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
/** The entry module name the final bundle pass emits. */
export declare const WORKER_ENTRY_NAME = "worker.js";
/**
 * The per-output-file banner wrangler also injects: CJS-converted code inside
 * the bundle (Next's compiled server) calls `require("fs")` etc. for
 * externalized node builtins, and esbuild's `__require` shim throws
 * `Dynamic require of "fs" is not supported` unless a real `require` is in
 * scope. workerd's `nodejs_compat` implements `node:module.createRequire`.
 *
 * The `?? "file:///"` fallback is load-bearing: `import.meta.url` is
 * `undefined` inside workerd modules, and a plain
 * `createRequire(import.meta.url)` crashes the worker at startup.
 */
export declare const CREATE_REQUIRE_BANNER: string;
/**
 * OpenNext's `setWranglerExternal` esbuild plugin leaves `.wasm`/`.bin`
 * imports in the server handler as ABSOLUTE paths (optionally with a
 * `?module` suffix) "for wrangler to bundle". This plugin strips the suffix
 * and routes them through esbuild's `copy` loader so they become relative
 * file imports that can be registered as CompiledWasm/Data modules.
 */
export declare const makeWranglerExternalsPlugin: () => Esbuild.Plugin;
export interface BundleWorkerOptions {
    /** The `.open-next` directory produced by the OpenNext build pipeline. */
    readonly openNextDirectory: string;
    /** Directory the finished module set is written to. */
    readonly outDirectory: string;
    /** Minify the emitted modules. @default false */
    readonly minify?: boolean | undefined;
}
export interface BundleWorkerResult {
    /** The esbuild metafile of the pass. */
    readonly metafile: Esbuild.Metafile;
}
/**
 * The "final bundle pass" wrangler normally performs at deploy time:
 * `.open-next/worker.js` (and its deliberately-unresolved relative imports —
 * `cloudflare/*.js`, `middleware/handler.mjs`, `.build/durable-objects/*.js`)
 * is bundled into a self-contained ESM module set.
 *
 * The four load-bearing rules (each discovered by a boot failure, not docs):
 *
 * 1. `format: "esm"` + `splitting: true` keeps the upstream
 *    `await import("./server-functions/default/handler.mjs")` a lazy chunk.
 * 2. `conditions: ["workerd", "worker"]` resolves workerd-flavored exports.
 * 3. `external: ["cloudflare:*", "node:*"]` — provided by workerd and
 *    `nodejs_compat` respectively.
 * 4. {@link CREATE_REQUIRE_BANNER} per output file (see its doc).
 *
 * Plus the `.wasm`/`.bin` `?module` copy rule
 * ({@link makeWranglerExternalsPlugin}).
 */
export declare const bundleWorker: (options: BundleWorkerOptions) => Effect.Effect<BundleWorkerResult, BundleError>;
export {};
