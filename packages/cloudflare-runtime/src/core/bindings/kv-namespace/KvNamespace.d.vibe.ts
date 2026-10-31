import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import * as Path from "effect/Path";
import * as Storage from "../../globals/Storage.vibe";
import * as Plugin from "../../Plugin.vibe";
import type { BindingHook } from "../../PluginContext.js";
import { ConfigError } from "../../RuntimeError.shared.js";
import type * as WorkerdConfig from "../../workerd/Config.js";
import type { KvNamespaceProps, KvServiceProps } from "./KvNamespaceOptions.shared.js";
declare const KvNamespace_base: import("effect/Context").ServiceClass<KvNamespace, "cloudflare-runtime/plugin/KvNamespace", Plugin.PluginBuilder<{
    /**
     * Record that a namespace is in use (so the KV services are only emitted
     * when at least one binding exists) and resolve the service designator
     * the binding should target: the shared `kv` service, with the namespace
     * id carried via designator props.
     */
    readonly register: (props: KvServiceProps) => Effect.Effect<WorkerdConfig.ServiceDesignator>;
}>>;
export declare class KvNamespace extends KvNamespace_base {
}
export declare const KvNamespaceLive: Layer.Layer<KvNamespace, never, FileSystem.FileSystem | Path.Path | Storage.Storage>;
/**
 * Bind a local KV namespace (`env.<binding>.get()` / `.put()` / `.list()` /
 * `.delete()`).
 *
 * Data is persisted under `{storage}/kv`, keyed by the namespace id, so
 * bindings with the same `id` share data (including across workers and
 * restarts when disk-backed storage is configured).
 */
export declare const local: (props: KvNamespaceProps) => BindingHook<KvNamespace>;
export declare const remote: (binding: string, namespaceId: string) => Effect.Effect<WorkerdConfig.Worker_Binding, ConfigError, import("../../PluginContext.js").PluginContext | import("../../remote-bindings/RemoteBindings.js").RemoteBindings>;
export {};
