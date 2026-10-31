import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import * as Path from "effect/Path";
import * as Storage from "../../globals/Storage.vibe";
import * as Plugin from "../../Plugin.vibe";
declare const Cache_base: import("effect/Context").ServiceClass<Cache, "cloudflare-runtime/plugin/Cache", Plugin.PluginBuilder<never>>;
export declare class Cache extends Cache_base {
}
/**
 * Always-on plugin implementing the Cache API (`caches.default` /
 * `caches.open()`) for the user worker, by pointing the worker's
 * `cacheApiOutbound` at a local simulator service.
 *
 * Data is persisted under `{storage}/cache/{worker}`, keyed by the cache name
 * (`default` or `named:<n>`), so caches survive restarts when disk-backed
 * storage is configured. Setting `cache: false` on the `RuntimeWorker` turns
 * every operation into a no-op (matching production behaviour on
 * `workers.dev` subdomains).
 */
export declare const CacheLive: Layer.Layer<Cache, never, FileSystem.FileSystem | Path.Path | Storage.Storage>;
export {};
