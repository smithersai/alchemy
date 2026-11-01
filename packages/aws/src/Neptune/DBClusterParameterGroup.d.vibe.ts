import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.js";
declare const NeptuneDBClusterParameterGroupUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "NeptuneDBClusterParameterGroupUnexpectedResponse";
} & Readonly<A>;
export declare class NeptuneDBClusterParameterGroupUnexpectedResponse extends NeptuneDBClusterParameterGroupUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface DBClusterParameterGroupProps {
    /**
     * Name of the DB cluster parameter group. If omitted, a deterministic name
     * is generated. Changing it forces replacement.
     */
    dbClusterParameterGroupName?: string;
    /**
     * DB cluster parameter group family, e.g. `neptune1.4`, `neptune1.3`.
     * Immutable — forces replacement.
     */
    family: string;
    /**
     * Description for the parameter group.
     * @default "Managed by Alchemy"
     */
    description?: string;
    /**
     * Cluster parameter overrides, e.g.
     * `{ neptune_query_timeout: "120000" }`. Parameters removed from this map
     * are reset to their engine defaults. Static parameters are applied with
     * `pending-reboot`, dynamic parameters with `immediate`.
     */
    parameters?: Record<string, string>;
    /**
     * User-defined tags for the parameter group.
     */
    tags?: Record<string, string>;
}
export interface DBClusterParameterGroup extends Resource<"AWS.Neptune.DBClusterParameterGroup", DBClusterParameterGroupProps, {
    /** Name of the parameter group. */
    dbClusterParameterGroupName: string;
    /** ARN of the parameter group. */
    dbClusterParameterGroupArn: string | undefined;
    /** Parameter group family (e.g. `neptune1.4`). */
    family: string;
    /** Description of the parameter group. */
    description: string | undefined;
    /** Non-default parameter values applied to the group. */
    parameters: Record<string, string>;
    /** Tags on the parameter group (user + internal Alchemy tags). */
    tags: Record<string, string>;
}, never, Providers> {
}
/**
 * An Amazon Neptune DB cluster parameter group — a named set of engine
 * configuration parameters (query timeout, audit logging, ...) that can be
 * attached to one or more Neptune {@link DBCluster}s.
 * ### Creating a Parameter Group
 * **Example:** Parameter group with a custom query timeout
 * ```typescript
 * const params = yield* DBClusterParameterGroup("Params", {
 *   family: "neptune1.4",
 *   parameters: {
 *     neptune_query_timeout: "120000",
 *   },
 * });
 * ```
 *
 * ### Attaching to a Cluster
 * **Example:** Cluster using the parameter group
 * ```typescript
 * const cluster = yield* DBCluster("Graph", {
 *   dbSubnetGroupName: subnetGroup.dbSubnetGroupName,
 *   dbClusterParameterGroupName: params.dbClusterParameterGroupName,
 * });
 * ```
 *
 * @resource
 */
export declare const DBClusterParameterGroup: import("alchemy").ResourceClass<DBClusterParameterGroup>;
export declare const DBClusterParameterGroupProvider: () => import("effect/Layer").Layer<Provider.Provider<DBClusterParameterGroup>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};
