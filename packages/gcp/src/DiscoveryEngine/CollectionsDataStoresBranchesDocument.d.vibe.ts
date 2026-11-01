import * as discoveryengine from "@distilled.cloud/gcp/discoveryengine_v1";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { GcpEnvironment } from "../Environment.js";
import type { Providers } from "../Providers.js";
export type DocumentContent = {
    /** MIME type of `rawBytes` or the object at `uri`. */
    mimeType?: string;
    /** GCS URI (`gs://bucket/path`). */
    uri?: string;
    /** Base64-encoded bytes. Max 1,000,000 bytes. */
    rawBytes?: string;
};
export type CollectionsDataStoresBranchesDocumentProps = {
    /**
     * Parent data store resource name
     * `projects/{project}/locations/{location}/collections/{collection}/dataStores/{data_store}`.
     * Immutable — changing it replaces the document.
     */
    dataStore: string;
    /**
     * Branch id. Immutable.
     * @default "default_branch"
     */
    branchId?: string;
    /**
     * Document id (RFC-1034, max 128 characters). If omitted, a unique id
     * is generated. Immutable — changing it replaces the document.
     */
    documentId?: string;
    /**
     * JSON document payload. Must conform to the data store schema.
     */
    jsonData?: string;
    /**
     * Structured document payload.
     */
    structData?: Record<string, unknown>;
    /**
     * Unstructured content. Required when the parent data store uses
     * `CONTENT_REQUIRED`.
     */
    content?: DocumentContent;
    /**
     * Parent document id (RFC-1034, max 63 characters).
     */
    parentDocumentId?: string;
    /**
     * Schema id in the same data store.
     */
    schemaId?: string;
};
export type CollectionsDataStoresBranchesDocument = Resource<"GCP.DiscoveryEngine.CollectionsDataStoresBranchesDocument", CollectionsDataStoresBranchesDocumentProps, {
    /** Full resource name. */
    name: string;
    /** Document id. */
    documentId: string;
    /** Parent data store resource name. */
    dataStore: string;
    /** Branch id. */
    branchId: string;
    /** Project id. */
    project: string;
    /** Location id. */
    location: string;
    /** JSON payload. */
    jsonData: string | undefined;
    /** Structured payload. */
    structData: Record<string, unknown> | undefined;
    /** Unstructured content. */
    content: DocumentContent | undefined;
    /** Parent document id. */
    parentDocumentId: string | undefined;
    /** Schema id. */
    schemaId: string | undefined;
    /** Last index time. */
    indexTime: string | undefined;
}, never, Providers>;
/**
 * A Discovery Engine document under a collection data store branch.
 *
 * Without labels, ownership rests on the deterministic id: `read` reports a
 * resource it finds without prior state as unowned (adopt it with `--adopt`).
 * Parent data store, branch, and document id are immutable. Payload fields
 * update in place.
 *
 * ### Creating a Document
 * **Example:** JSON document on the default branch
 * ```typescript
 * const store = yield* GCP.DiscoveryEngine.CollectionsDataStore("Docs", {});
 * const doc = yield* GCP.DiscoveryEngine.CollectionsDataStoresBranchesDocument(
 *   "Intro",
 *   {
 *     dataStore: store.name,
 *     jsonData: JSON.stringify({ title: "Getting started" }),
 *   },
 * );
 * ```
 *
 * @resource
 * @category DiscoveryEngine
 */
export declare const CollectionsDataStoresBranchesDocument: import("alchemy/Resource").ResourceClass<CollectionsDataStoresBranchesDocument>;
declare const CollectionsDataStoresBranchesDocumentNotResolved_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "GCP.DiscoveryEngine.CollectionsDataStoresBranchesDocumentNotResolved";
} & Readonly<A>;
export declare class CollectionsDataStoresBranchesDocumentNotResolved extends CollectionsDataStoresBranchesDocumentNotResolved_base<{
    resourceName: string;
}> {
}
export declare const CollectionsDataStoresBranchesDocumentProvider: () => import("effect/Layer").Layer<Provider.Provider<CollectionsDataStoresBranchesDocument>, never, GcpEnvironment | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage | discoveryengine.GcpOpContext>;
export {};
