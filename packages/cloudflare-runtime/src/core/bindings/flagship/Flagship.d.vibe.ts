import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import * as Path from "effect/Path";
import * as Storage from "../../globals/Storage.vibe";
import * as Plugin from "../../Plugin.vibe";
import type { BindingHook } from "../../PluginContext.js";
import { ConfigError } from "../../RuntimeError.shared.js";
import type * as WorkerdConfig from "../../workerd/Config.js";
import { type FlagshipDetails, type FlagshipValueType } from "./FlagshipEvaluate.shared.js";
import type { FlagshipFlagDefinition, FlagshipProps, FlagshipServiceProps } from "./FlagshipOptions.shared.js";
declare const Flagship_base: import("effect/Context").ServiceClass<Flagship, "cloudflare-runtime/plugin/Flagship", Plugin.PluginBuilder<{
    /**
     * Record that a local Flagship binding is in use (so the flagship
     * services are only emitted when at least one binding exists) and
     * resolve the designator targeting the `Flagship` evaluation
     * entrypoint for an app.
     */
    readonly register: (props: FlagshipServiceProps) => Effect.Effect<WorkerdConfig.ServiceDesignator>;
}>>;
export declare class Flagship extends Flagship_base {
}
export declare const FlagshipLive: Layer.Layer<Flagship, never, FileSystem.FileSystem | Path.Path | Storage.Storage>;
/**
 * Bind a local Flagship app (`env.<binding>.getBooleanValue()` / ...).
 *
 * Flags are evaluated locally against the definitions written with
 * {@link writeFlag} under `{storage}/flagship`, keyed by the app id, so
 * bindings with the same `appId` share flags (including across workers,
 * processes and restarts when disk-backed storage is configured). A flag
 * without a definition evaluates to the default value with
 * `errorCode: "FLAG_NOT_FOUND"`.
 */
export declare const local: (props: FlagshipProps) => BindingHook<Flagship>;
/** Bind to a deployed Flagship app via the remote bindings proxy. */
export declare const remote: (binding: string, appId: string) => Effect.Effect<WorkerdConfig.Worker_Binding, ConfigError, import("../../PluginContext.js").PluginContext | import("../../remote-bindings/RemoteBindings.js").RemoteBindings>;
/** Location of the local Flagship store under a runtime storage directory. */
export interface FlagshipStore {
    /** The runtime's storage directory (`RuntimeConfig.storage.directory`). */
    readonly storageDirectory: string;
    readonly appId: string;
}
/**
 * Write a flag definition into a local app (idempotent overwrite). The file
 * is replaced atomically, so a concurrent evaluation reads either the old or
 * the new definition.
 */
export declare const writeFlag: (store: FlagshipStore, flagKey: string, definition: FlagshipFlagDefinition) => Effect.Effect<void, import("effect/PlatformError").PlatformError, FileSystem.FileSystem | Path.Path>;
/** Remove a flag from a local app (idempotent). */
export declare const deleteFlag: (store: FlagshipStore, flagKey: string) => Effect.Effect<void, import("effect/PlatformError").PlatformError, FileSystem.FileSystem | Path.Path>;
/** Remove every flag of a local app (idempotent). */
export declare const deleteApp: (store: FlagshipStore) => Effect.Effect<void, import("effect/PlatformError").PlatformError, FileSystem.FileSystem | Path.Path>;
/**
 * Evaluate a flag of a local app from Node, with the same rules a local
 * binding applies (`expectedType` is the typed method's value type, or
 * `undefined` for the untyped `get`).
 */
export declare const evaluate: (store: FlagshipStore, input: {
    readonly flagKey: string;
    readonly defaultValue: unknown;
    readonly expectedType: FlagshipValueType | undefined;
    readonly context: unknown;
}) => Effect.Effect<FlagshipDetails, import("effect/PlatformError").PlatformError, FileSystem.FileSystem | Path.Path>;
export {};
