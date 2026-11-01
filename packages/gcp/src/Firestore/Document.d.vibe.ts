import * as firestore from "@distilled.cloud/gcp/firestore_v1";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { GcpEnvironment } from "../Environment.js";
import type { Providers } from "../Providers.js";
export type DocumentFieldValue = {
    /** UTF-8 string. */
    stringValue?: string;
    /** Integer encoded as a decimal string. */
    integerValue?: string;
    /** Boolean. */
    booleanValue?: boolean;
    /** IEEE 754 double. */
    doubleValue?: number;
    /** RFC3339 timestamp. */
    timestampValue?: string;
    /** Null sentinel (`NULL_VALUE`). */
    nullValue?: string;
};
export type DocumentProps = {
    /**
     * Database id or `projects/{project}/databases/{database}`. Defaults
     * to `"(default)"`. Immutable — changing it replaces the document.
     * @default "(default)"
     */
    database?: string;
    /**
     * Collection id relative to `parent`. Immutable — changing it
     * replaces the document.
     * @default "_alchemy"
     */
    collectionId?: string;
    /**
     * Parent document path relative to the database (no leading slash),
     * or empty for a root collection. Immutable — changing it replaces
     * the document.
     */
    parentPath?: string;
    /**
     * Client-assigned document id. If omitted, a unique id is generated
     * from the stack, stage, and logical id. Immutable — changing it
     * replaces the document.
     */
    documentId?: string;
    /**
     * Document fields. Fields absent here are removed from the document.
     */
    fields?: Record<string, DocumentFieldValue>;
};
export type Document = Resource<"GCP.Firestore.Document", DocumentProps, {
    /** Full resource name `projects/{project}/databases/{database}/documents/{path}`. */
    name: string;
    /** Document id (last path segment). */
    documentId: string;
    /** Database resource name. */
    database: string;
    /** Database id. */
    databaseId: string;
    /** Collection id. */
    collectionId: string;
    /** Parent path relative to the database documents root. */
    parentPath: string;
    /** Path relative to the database documents root. */
    documentPath: string;
    /** Project id. */
    project: string;
    /** Document fields. */
    fields: Record<string, DocumentFieldValue>;
    /** RFC3339 creation timestamp. */
    createTime: string | undefined;
    /** RFC3339 last-update timestamp. */
    updateTime: string | undefined;
}, never, Providers>;
/**
 * A Cloud Firestore document.
 *
 * Documents have no labels field and Alchemy writes nothing but the given
 * fields: `read` reports a document it finds without prior state as
 * unowned (adopt it with `--adopt`). Changing
 * `database`, `collectionId`, `parentPath`, or `documentId` replaces
 * the document. User fields update in place via `documents.patch`.
 *
 * Runtime get/patch/delete of arbitrary documents still goes through
 * {@link GetDocument} / {@link PatchDocument} / {@link DeleteDocument}.
 *
 * ### Creating a Document
 * **Example:** Generated id in `_alchemy`
 * ```typescript
 * const doc = yield* GCP.Firestore.Document("Flag", {
 *   fields: { env: { stringValue: "test" } },
 * });
 * ```
 *
 * **Example:** Named document
 * ```typescript
 * const doc = yield* GCP.Firestore.Document("Alice", {
 *   database: "(default)",
 *   collectionId: "users",
 *   documentId: "alice",
 *   fields: { name: { stringValue: "Alice" } },
 * });
 * ```
 *
 * @resource
 * @category Firestore
 */
export declare const Document: import("alchemy/Resource").ResourceClass<Document>;
declare const DocumentNotResolved_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "GCP.Firestore.DocumentNotResolved";
} & Readonly<A>;
export declare class DocumentNotResolved extends DocumentNotResolved_base<{
    resourceName: string;
}> {
}
export declare const DocumentProvider: () => import("effect/Layer").Layer<Provider.Provider<Document>, never, GcpEnvironment | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage | firestore.GcpOpContext>;
export {};
