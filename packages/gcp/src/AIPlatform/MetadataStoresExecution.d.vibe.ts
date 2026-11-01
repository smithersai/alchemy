import * as aiplatform from "@distilled.cloud/gcp/aiplatform_v1";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { GcpEnvironment } from "../Environment.js";
import type { Providers } from "../Providers.js";
export type MetadataStoresExecutionProps = {
    /**
     * Parent MetadataStore resource name
     * `projects/{project}/locations/{location}/metadataStores/{metadatastore}`.
     * Immutable — changing it replaces the execution.
     */
    metadataStore: string;
    /**
     * Execution id. If omitted, a unique id is generated. Must be 4-128
     * characters of `a-z` and `-`. Immutable.
     */
    executionId?: string;
    /**
     * Display name (max 128 Unicode characters).
     */
    displayName?: string;
    /**
     * Human-readable description.
     */
    description?: string;
    /**
     * User labels. Alchemy ownership labels are merged in automatically.
     */
    labels?: Record<string, string>;
    /**
     * Execution lifecycle state.
     */
    state?: aiplatform.GoogleCloudAiplatformV1ExecutionStateEnum | (string & {});
    /**
     * Schema title registered in the MetadataStore. Vertex AI rejects
     * entries without one.
     * @default "system.Run"
     */
    schemaTitle?: string;
    /**
     * Schema version registered in the MetadataStore.
     */
    schemaVersion?: string;
    /**
     * Arbitrary metadata properties.
     */
    metadata?: aiplatform.DocumentMap;
};
export type MetadataStoresExecution = Resource<"GCP.AIPlatform.MetadataStoresExecution", MetadataStoresExecutionProps, {
    /** Full resource name. */
    name: string;
    /** Execution id (last path segment). */
    executionId: string;
    /** Parent MetadataStore resource name. */
    metadataStore: string;
    /** Project id. */
    project: string;
    /** Location id. */
    location: string;
    /** Display name. */
    displayName: string | undefined;
    /** User-provided description. */
    description: string | undefined;
    /** User labels (Alchemy ownership labels stripped). */
    labels: Record<string, string>;
    /** Execution state. */
    state: string | undefined;
    /** Schema title. */
    schemaTitle: string | undefined;
    /** Schema version. */
    schemaVersion: string | undefined;
    /** RFC3339 creation timestamp. */
    createTime: string | undefined;
    /** RFC3339 last-update timestamp. */
    updateTime: string | undefined;
}, never, Providers>;
/**
 * A Vertex ML Metadata Execution associated with a MetadataStore.
 *
 * Changing `metadataStore` or `executionId` replaces the execution. Display
 * name, description, labels, state, schema, and metadata update in place.
 *
 * ### Creating an Execution
 * **Example:** Training execution
 * ```typescript
 * const execution = yield* GCP.AIPlatform.MetadataStoresExecution("Train", {
 *   metadataStore: store.name,
 *   displayName: "train-step",
 *   state: "RUNNING",
 *   labels: { env: "prod" },
 * });
 * ```
 *
 * @resource
 * @category AIPlatform
 */
export declare const MetadataStoresExecution: import("alchemy/Resource").ResourceClass<MetadataStoresExecution>;
declare const MetadataStoresExecutionNotResolved_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "GCP.AIPlatform.MetadataStoresExecutionNotResolved";
} & Readonly<A>;
export declare class MetadataStoresExecutionNotResolved extends MetadataStoresExecutionNotResolved_base<{
    resourceName: string;
}> {
}
declare const MetadataStoresExecutionStillExists_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "GCP.AIPlatform.MetadataStoresExecutionStillExists";
} & Readonly<A>;
export declare class MetadataStoresExecutionStillExists extends MetadataStoresExecutionStillExists_base<{
    resourceName: string;
}> {
}
export declare const MetadataStoresExecutionProvider: () => import("effect/Layer").Layer<Provider.Provider<MetadataStoresExecution>, never, GcpEnvironment | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage | aiplatform.GcpOpContext>;
export {};
