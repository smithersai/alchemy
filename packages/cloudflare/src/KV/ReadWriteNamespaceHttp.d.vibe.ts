import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import { type KVAuth } from "./NamespaceHttp.js";
import { ReadWriteNamespace, type ReadWriteNamespaceClient } from "./ReadWriteNamespace.vibe";
/**
 * HTTP-backed implementation of the {@link ReadWriteNamespace} binding.
 *
 * It creates a scoped {@link AccountApiToken} with the `Workers KV Storage
 * Read` and `Workers KV Storage Write` permissions.
 */
export declare const ReadWriteNamespaceHttp: Layer.Layer<ReadWriteNamespace, never, import("alchemy/Self").Self<{
    Type: string;
    LogicalId: string;
}>>;
/** Build the HTTP-backed read-write client over an auth + namespace. */
export declare const makeReadWriteKVHttpClient: (auth: KVAuth, namespaceId: Effect.Effect<string>) => ReadWriteNamespaceClient;
