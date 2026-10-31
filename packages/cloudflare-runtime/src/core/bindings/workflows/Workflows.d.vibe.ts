import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import * as Path from "effect/Path";
import * as Storage from "../../globals/Storage.vibe";
import * as Plugin from "../../Plugin.vibe";
import type { BindingHook } from "../../PluginContext.js";
import { PluginContext } from "../../PluginContext.js";
import { RegistryProxy } from "../../registry/RegistryProxy.js";
import { ConfigError } from "../../RuntimeError.shared.js";
import type * as WorkerdConfig from "../../workerd/Config.js";
declare const Workflows_base: import("effect/Context").ServiceClass<Workflows, "cloudflare-runtime/plugin/Workflows", Plugin.PluginBuilder<never>>;
export declare class Workflows extends Workflows_base {
}
export declare const WorkflowsLive: Layer.Layer<Workflows, never, FileSystem.FileSystem | Path.Path | Storage.Storage>;
export interface LocalWorkflowProps {
    /**
     * Name of the binding.
     */
    readonly binding: string;
    /**
     * Logical name of the workflow to bind to.
     */
    readonly workflowName: string;
    /**
     * Class name of the `WorkflowEntrypoint`. Must match the owned workflow
     * when binding to the current worker.
     */
    readonly className: string;
    /**
     * If set and the referenced worker isn't the current one, the binding is
     * routed through the dev-registry proxy. This enables service-binding
     * style cross-process Workflow access during local development.
     */
    readonly scriptName?: string;
}
/**
 * Bind a workflow.
 *
 * - Without `scriptName`: bind a workflow defined on the current worker.
 * - With `scriptName === <current worker name>`: same as above.
 * - With `scriptName !== <current worker name>`: route through the dev
 *   registry proxy so the engine can live in a different `cloudflare-runtime`
 *   or `wrangler dev` process.
 */
export declare const local: ({ binding, workflowName, className, scriptName, }: LocalWorkflowProps) => BindingHook<RegistryProxy>;
export interface RemoteWorkflowProps {
    readonly binding: string;
    readonly workflowName: string;
    readonly className: string;
    readonly scriptName?: string;
}
export declare const remote: (props: RemoteWorkflowProps) => Effect.Effect<WorkerdConfig.Worker_Binding, ConfigError, PluginContext | import("../../remote-bindings/RemoteBindings.js").RemoteBindings>;
export {};
