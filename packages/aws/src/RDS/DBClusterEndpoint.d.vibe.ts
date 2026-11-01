import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.js";
declare const DBClusterEndpointUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "DBClusterEndpointUnexpectedResponse";
} & Readonly<A>;
export declare class DBClusterEndpointUnexpectedResponse extends DBClusterEndpointUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface DBClusterEndpointProps {
    /**
     * Endpoint identifier. If omitted, Alchemy generates one.
     */
    dbClusterEndpointIdentifier?: string;
    /**
     * Cluster that owns the endpoint.
     */
    dbClusterIdentifier: string;
    /**
     * Endpoint type such as `READER`, `WRITER`, or `ANY`.
     */
    endpointType: string;
    /**
     * Static members explicitly attached to the endpoint.
     */
    staticMembers?: string[];
    /**
     * Members excluded from the endpoint.
     */
    excludedMembers?: string[];
    /**
     * User-defined tags.
     */
    tags?: Record<string, string>;
}
export interface DBClusterEndpoint extends Resource<"AWS.RDS.DBClusterEndpoint", DBClusterEndpointProps, {
    /**
     * Identifier of the custom endpoint.
     */
    dbClusterEndpointIdentifier: string;
    /**
     * ARN of the custom endpoint.
     */
    dbClusterEndpointArn: string | undefined;
    /**
     * Cluster that owns the endpoint.
     */
    dbClusterIdentifier: string | undefined;
    /**
     * DNS address applications connect to.
     */
    endpoint: string | undefined;
    /**
     * Status of the endpoint (e.g. `available`).
     */
    status: string | undefined;
    /**
     * Endpoint type (`CUSTOM` for managed endpoints).
     */
    endpointType: string | undefined;
    /**
     * Traffic routing type of the custom endpoint (`READER`, `ANY`).
     */
    customEndpointType: string | undefined;
    /**
     * Instances explicitly attached to the endpoint.
     */
    staticMembers: string[];
    /**
     * Instances excluded from the endpoint.
     */
    excludedMembers: string[];
    /**
     * Tags on the endpoint.
     */
    tags: Record<string, string>;
}, never, Providers> {
}
/**
 * A custom Aurora cluster endpoint — a DNS name that routes to a chosen
 * subset of a cluster's instances, on top of the built-in writer and reader
 * endpoints of a `DBCluster`.
 *
 * Use it to pin analytics traffic to specific readers or to keep a stable
 * address across instance replacements. Changing the identifier or owning
 * cluster replaces the endpoint; type and membership update in place.
 * ### Creating Custom Endpoints
 * **Example:** Reader Endpoint for a Cluster
 * ```typescript
 * const readers = yield* DBClusterEndpoint("Readers", {
 *   dbClusterIdentifier: cluster.dbClusterIdentifier,
 *   endpointType: "READER",
 * });
 * ```
 *
 * **Example:** Pin Specific Instances
 * ```typescript
 * const analytics = yield* DBClusterEndpoint("Analytics", {
 *   dbClusterIdentifier: cluster.dbClusterIdentifier,
 *   endpointType: "ANY",
 *   staticMembers: [reporting.dbInstanceIdentifier],
 * });
 * ```
 *
 * @resource
 */
export declare const DBClusterEndpoint: import("alchemy").ResourceClass<DBClusterEndpoint>;
export declare const DBClusterEndpointProvider: () => import("effect/Layer").Layer<Provider.Provider<DBClusterEndpoint>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};
