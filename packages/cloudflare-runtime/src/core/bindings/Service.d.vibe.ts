import * as Effect from "effect/Effect";
import type { BindingHook } from "../PluginContext.js";
import { RegistryProxy } from "../registry/RegistryProxy.js";
export interface LocalServiceProps {
    /**
     * Name of the binding.
     */
    readonly binding: string;
    /**
     * Name of the worker (as registered in the dev registry by another
     * `cloudflare-runtime` or `wrangler dev` process) to bind to.
     */
    readonly scriptName: string;
    /**
     * Named entrypoint on the target worker. Defaults to the default entrypoint.
     */
    readonly entrypoint?: string;
    /**
     * Optional `ctx.props` forwarded to the remote entrypoint.
     */
    readonly props?: Record<string, unknown>;
}
/**
 * Bind to another locally-running worker by name. The connection is
 * established cross-process via the workerd debug port and the on-disk
 * dev registry, so the target worker can be running in a separate
 * `cloudflare-runtime` or `wrangler dev` process.
 */
export declare const local: ({ binding, scriptName, entrypoint, props, }: LocalServiceProps) => BindingHook<RegistryProxy>;
export interface SelfServiceProps {
    /**
     * Named entrypoint on the worker. Defaults to the default entrypoint.
     */
    readonly entrypoint?: string;
    /**
     * Optional `ctx.props` delivered to the entrypoint.
     */
    readonly props?: Record<string, unknown>;
}
/**
 * Bind the worker to itself (a same-script service binding, e.g. OpenNext's
 * `WORKER_SELF_REFERENCE`). Unlike {@link local}, this resolves in-process with
 * no dev-registry round trip, so it works while the worker is still starting.
 *
 * The binding targets the user worker service directly, **bypassing the
 * middleware chain** (assets router, etc.) that fronts the worker's entry
 * socket. Requests sent through this binding always reach the worker's own
 * handlers, even for paths that static assets would otherwise serve. This is
 * the correct semantic for self-invocation patterns like ISR revalidation,
 * where the request must hit the worker's `fetch` handler rather than the
 * assets middleware.
 */
export declare const self: (binding: string, { entrypoint, props }?: SelfServiceProps) => BindingHook;
/**
 * Bind to a deployed Cloudflare Worker via the remote bindings proxy.
 */
export declare const remote: (name: string, service: string) => Effect.Effect<import("../workerd/Config.js").Worker_Binding, import("../RuntimeError.shared.js").ConfigError, import("../PluginContext.js").PluginContext | import("../remote-bindings/RemoteBindings.js").RemoteBindings>;
