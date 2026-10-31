import type { BindingHook } from "../PluginContext.js";
import { RegistryProxy } from "../registry/RegistryProxy.js";
export interface LocalDurableObjectNamespaceProps {
    /**
     * Name of the binding.
     */
    readonly binding: string;
    /**
     * Class name of the Durable Object namespace to bind to.
     */
    readonly className: string;
    /**
     * If set and the referenced worker isn't the current one, the binding is
     * routed through the dev-registry proxy. This enables service-binding
     * style cross-process Durable Object access during local development.
     */
    readonly scriptName?: string;
    /**
     * If set and the referenced worker isn't the current one, the binding is
     * routed through the dev-registry proxy. This enables service-binding
     * style cross-process Durable Object access during local development.
     */
    readonly uniqueKey?: string;
}
/**
 * Bind a Durable Object namespace.
 *
 * - Without `scriptName`: bind a DO defined on the current worker.
 * - With `scriptName === <current worker name>`: same as above.
 * - With `scriptName !== <current worker name>`: route through the dev
 *   registry proxy so the DO can live in a different `cloudflare-runtime`
 *   or `wrangler dev` process.
 */
export declare const local: ({ binding, className, scriptName, uniqueKey, }: LocalDurableObjectNamespaceProps) => BindingHook<RegistryProxy>;
