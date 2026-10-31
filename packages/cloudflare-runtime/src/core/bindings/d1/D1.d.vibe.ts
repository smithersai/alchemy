import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import * as Path from "effect/Path";
import * as Storage from "../../globals/Storage.vibe";
import * as Plugin from "../../Plugin.vibe";
import type { BindingHook } from "../../PluginContext.js";
import { ConfigError } from "../../RuntimeError.shared.js";
import type * as WorkerdConfig from "../../workerd/Config.js";
import type { D1Props, D1ServiceProps } from "./D1Options.shared.js";
declare const D1_base: import("effect/Context").ServiceClass<D1, "cloudflare-runtime/plugin/D1", Plugin.PluginBuilder<{
    /**
     * Record that a database is in use (so the D1 services are only emitted
     * when at least one binding exists) and resolve the service designator
     * the binding should target: the shared `d1` service, with the database
     * id carried via designator props.
     */
    readonly register: (props: D1ServiceProps) => Effect.Effect<WorkerdConfig.ServiceDesignator>;
}>>;
export declare class D1 extends D1_base {
}
export declare const D1Live: Layer.Layer<D1, never, FileSystem.FileSystem | Path.Path | Storage.Storage>;
/**
 * Bind a local D1 database (`env.<binding>.prepare()` / `.batch()` /
 * `.exec()`).
 *
 * The binding is the real `cloudflare-internal:d1-api` module wrapped around
 * a fetcher to the local simulator. Data lives in Durable Object SQLite,
 * persisted under `{storage}/d1` and keyed by the database id, so bindings
 * with the same `id` share data (including across workers and restarts when
 * disk-backed storage is configured).
 */
export declare const local: (props: D1Props) => BindingHook<D1>;
export declare const remote: (binding: string, id: string) => Effect.Effect<WorkerdConfig.Worker_Binding, ConfigError, import("../../PluginContext.js").PluginContext | import("../../remote-bindings/RemoteBindings.js").RemoteBindings>;
export {};
