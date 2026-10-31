import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import * as Path from "effect/Path";
import * as Storage from "../../globals/Storage.vibe";
import * as Plugin from "../../Plugin.vibe";
import type { BindingHook } from "../../PluginContext.js";
import { ConfigError } from "../../RuntimeError.shared.js";
import type * as WorkerdConfig from "../../workerd/Config.js";
import type { SecretsStoreSecretProps, SecretsStoreSecretServiceProps, SecretsStoreStoreServiceProps } from "./SecretsStoreOptions.shared.js";
declare const SecretsStore_base: import("effect/Context").ServiceClass<SecretsStore, "cloudflare-runtime/plugin/SecretsStore", Plugin.PluginBuilder<{
    /**
     * Record that a local `secrets_store_secret` binding is in use (so the
     * secrets-store services are only emitted when at least one binding
     * exists) and resolve the service designator the binding should target:
     * the shared `secrets-store:secret` service's `SecretsStoreSecret`
     * entrypoint, with the store/secret identity carried via designator
     * props.
     */
    readonly register: (props: SecretsStoreSecretServiceProps) => Effect.Effect<WorkerdConfig.ServiceDesignator>;
    /**
     * Resolve a designator addressing a store directly as a raw KV
     * namespace — the admin/seeding surface (`admin`) that deploy-time
     * tooling uses to write secret values into the local store.
     */
    readonly registerStore: (props: SecretsStoreStoreServiceProps) => Effect.Effect<WorkerdConfig.ServiceDesignator>;
}>>;
export declare class SecretsStore extends SecretsStore_base {
}
export declare const SecretsStoreLive: Layer.Layer<SecretsStore, never, FileSystem.FileSystem | Path.Path | Storage.Storage>;
/**
 * Bind a local Secrets Store secret (`env.<binding>.get()`).
 *
 * Data is persisted under `{storage}/secrets-store`, keyed by the store id,
 * so bindings with the same `storeId` share data (including across workers
 * and restarts when disk-backed storage is configured). `get()` throws
 * `Secret "<secretName>" not found` (matching Miniflare) until a value is
 * seeded through the {@link admin} surface.
 */
export declare const local: (props: SecretsStoreSecretProps) => BindingHook<SecretsStore>;
/**
 * Bind a local Secrets Store *store* as a raw KV namespace
 * (`env.<binding>.put(secretName, value)` / `.delete()` / `.list()`).
 *
 * This is the admin/seeding surface — the equivalent of Miniflare's
 * `getSecretsStoreSecretAPI`. Deploy-time tooling (e.g. alchemy's local
 * Secret provider, through the platform proxy) uses it to write secret
 * values into the same store the `secrets_store_secret` bindings read.
 */
export declare const admin: (props: {
    binding: string;
    storeId: string;
}) => BindingHook<SecretsStore>;
/** Bind to a deployed Secrets Store secret via the remote bindings proxy. */
export declare const remote: (binding: string, storeId: string, secretName: string) => Effect.Effect<WorkerdConfig.Worker_Binding, ConfigError, import("../../PluginContext.js").PluginContext | import("../../remote-bindings/RemoteBindings.js").RemoteBindings>;
export {};
