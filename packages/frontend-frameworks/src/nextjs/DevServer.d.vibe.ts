/**
 * Next.js dev v2 — real `next dev` (Turbopack HMR) with Cloudflare bindings,
 * wrangler-free.
 *
 * {@link start} runs the documented custom-server API programmatically
 * (`next({ dev: true, dir, hostname, port })` + `prepare()` +
 * `getRequestHandler()` attached to an http.Server we own), so the caller
 * controls the port/URL and shutdown is a clean `app.close()` — no CLI fork,
 * no signal handlers, no `process.exit` choreography.
 *
 * Before the dev server starts, a `cloudflare-runtime` platform proxy
 * ({@link PlatformProxy.open}) is opened with the worker's binding hooks and
 * the resulting `{ env, cf, ctx }` is planted on
 * `globalThis[Symbol.for("__cloudflare-context__")]` — the exact contract
 * `@opennextjs/cloudflare`'s `getCloudflareContext()` reads (see upstream
 * `src/api/cloudflare-context.ts`). `vm.runInContext` is additionally patched
 * so Next's edge-runtime sandbox (middleware, edge routes) sees the same
 * context, mirroring OpenNext's `monkeyPatchVmModuleEdgeContext`. App code
 * therefore works without calling `initOpenNextCloudflareForDev()` and
 * without wrangler.
 *
 * Fidelity notes (documented in the package README): app code runs in Node
 * (or Next's edge-runtime VM), not workerd — bindings round-trip through the
 * proxy, but CF-specific runtime behavior (workerd APIs and limits, ISR/cache
 * semantics of the built worker) still needs the preview mode.
 */
import type { BindingHooks, WorkerdLogging } from "@alchemy.run/cloudflare-runtime/core";
import type * as Runtime from "@alchemy.run/cloudflare-runtime/core/Runtime";
import * as Effect from "effect/Effect";
import type * as Scope from "effect/Scope";
import * as FrameworkCore from "../core/index.js";
/** The symbol OpenNext uses to store/read the Cloudflare context. Must stay
 * in sync with `@opennextjs/cloudflare`'s `cloudflareContextSymbol`. */
export declare const CLOUDFLARE_CONTEXT_SYMBOL: unique symbol;
/** The shape `getCloudflareContext()` expects (upstream `CloudflareContext`). */
export interface CloudflareContextShape {
    readonly env: Record<string, unknown>;
    readonly cf: Record<string, unknown> | undefined;
    readonly ctx: unknown;
}
export interface DevServerOptions {
    /** The Next.js project root (the directory containing `next.config.*`). */
    readonly root: string;
    /** @default "localhost" */
    readonly hostname?: string | undefined;
    /** Port to listen on. Defaults to an ephemeral port. */
    readonly port?: number | undefined;
    /**
     * Bindings to expose through `getCloudflareContext().env` — the same hook
     * shapes `Runtime.start` accepts (`Text.local`, `KvNamespace.local`, …).
     */
    readonly bindings?: BindingHooks | undefined;
    /** Compatibility date for the binding-proxy worker. */
    readonly compatibilityDate?: string | undefined;
    /** Compatibility flags for the binding-proxy worker. */
    readonly compatibilityFlags?: ReadonlyArray<string> | undefined;
    /** Name of the binding-proxy workerd service. @default "nextjs-dev-platform-proxy" */
    readonly proxyName?: string | undefined;
    readonly logging?: WorkerdLogging | undefined;
}
export interface DevServerInstance {
    /** The local URL the dev server is listening on. */
    readonly url: URL;
}
/**
 * Start `next dev` with Cloudflare bindings. Scoped: closing the Scope stops
 * the Next.js app (Turbopack), the http server, and the binding proxy, and
 * restores the global Cloudflare context.
 *
 * Requires `Runtime.Runtime` (from `RuntimeServices.layerRuntime`) for the
 * binding-proxy workerd instance.
 */
export declare const start: (options: DevServerOptions) => Effect.Effect<DevServerInstance, FrameworkCore.FrameworkError, Runtime.Runtime | Scope.Scope>;
