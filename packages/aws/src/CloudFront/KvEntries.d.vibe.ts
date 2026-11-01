import type { Input } from "alchemy/Input";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.js";
export interface KvEntriesProps {
    /** ARN of the CloudFront KeyValueStore. */
    store: string;
    /** Namespace prefix for all keys. Keys are stored as `{namespace}:{key}`. */
    namespace: string;
    /** Map of key → value entries to manage. */
    entries: Record<string, Input<string>>;
    /**
     * Whether to delete keys under this namespace that are not in `entries`.
     * With `purge`, deleting this resource clears the whole namespace; without
     * it, only the keys in `entries` are removed.
     * @default false
     */
    purge?: boolean;
}
export interface KvEntries extends Resource<"AWS.CloudFront.KvEntries", KvEntriesProps, {
    /** ARN of the CloudFront KeyValueStore. */
    store: string;
    /** Namespace prefix used for keys. */
    namespace: string;
    /** Current entries managed under the namespace. */
    entries: Record<string, string>;
}, never, Providers> {
}
/**
 * Manages namespaced key-value entries in a CloudFront KeyValueStore.
 *
 * Entries are stored with a `{namespace}:{key}` prefix to allow multiple
 * logical groups within a single store. Updates use batched optimistic
 * concurrency with automatic ETag retry.
 * ### Managing Entries
 * **Example:** Basic Entries
 * ```typescript
 * const entries = yield* KvEntries("Routes", {
 *   store: store.keyValueStoreArn,
 *   namespace: "routes",
 *   entries: {
 *     "/": "/index.html",
 *     "/about": "/about.html",
 *   },
 * });
 * ```
 *
 * **Example:** Purge Stale Keys
 * ```typescript
 * const entries = yield* KvEntries("Routes", {
 *   store: store.keyValueStoreArn,
 *   namespace: "routes",
 *   entries: { "/": "/index.html" },
 *   purge: true,
 * });
 * ```
 *
 * @resource
 */
export declare const KvEntries: import("alchemy").ResourceClass<KvEntries>;
export declare const KvEntriesProvider: () => import("effect/Layer").Layer<Provider.Provider<KvEntries>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient>;
