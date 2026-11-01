import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { SubnetId } from "../EC2/Subnet.js";
import { AWSEnvironment } from "../Environment.js";
import type { Providers } from "../Providers.js";
declare const ClusterSubnetGroupUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "ClusterSubnetGroupUnexpectedResponse";
} & Readonly<A>;
export declare class ClusterSubnetGroupUnexpectedResponse extends ClusterSubnetGroupUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface ClusterSubnetGroupProps {
    /**
     * Name of the cluster subnet group. Must contain no more than 255
     * lowercase alphanumeric characters or hyphens and must not be `default`.
     * If omitted, a deterministic physical name is generated. Changing the
     * name replaces the subnet group.
     */
    clusterSubnetGroupName?: string;
    /**
     * Human-readable description of the subnet group.
     * @default "Managed by Alchemy"
     */
    description?: string;
    /**
     * VPC subnet IDs the subnet group spans. Redshift places cluster nodes
     * into these subnets; span at least two Availability Zones so the cluster
     * can relocate during maintenance.
     */
    subnetIds: SubnetId[];
    /**
     * User-defined tags for the subnet group.
     */
    tags?: Record<string, string>;
}
export interface ClusterSubnetGroup extends Resource<"AWS.Redshift.ClusterSubnetGroup", ClusterSubnetGroupProps, {
    /**
     * Name of the subnet group.
     */
    clusterSubnetGroupName: string;
    /**
     * ARN of the subnet group.
     */
    clusterSubnetGroupArn: string;
    /**
     * Description of the subnet group.
     */
    description: string | undefined;
    /**
     * ID of the VPC the subnets belong to.
     */
    vpcId: string | undefined;
    /**
     * IDs of the subnets in the group.
     */
    subnetIds: string[];
    /**
     * Status of the subnet group (e.g. `"Complete"`).
     */
    subnetGroupStatus: string | undefined;
    /**
     * Tags on the subnet group (including internal Alchemy tags).
     */
    tags: Record<string, string>;
}, never, Providers> {
}
/**
 * An Amazon Redshift cluster subnet group — the set of VPC subnets a
 * provisioned Redshift cluster's nodes are placed into.
 *
 * Subnet groups are free and provision instantly. A {@link Cluster}
 * references one by name via `clusterSubnetGroupName`.
 * ### Creating a Cluster Subnet Group
 * **Example:** Subnet Group Spanning Two Subnets
 * ```typescript
 * const subnetGroup = yield* Redshift.ClusterSubnetGroup("WarehouseSubnets", {
 *   description: "Subnets for the analytics warehouse",
 *   subnetIds: [subnetA.subnetId, subnetB.subnetId],
 * });
 * ```
 * **Example:** Tagged Subnet Group
 * ```typescript
 * const subnetGroup = yield* Redshift.ClusterSubnetGroup("WarehouseSubnets", {
 *   subnetIds: [subnetA.subnetId, subnetB.subnetId],
 *   tags: { team: "analytics" },
 * });
 * ```
 *
 * @resource
 */
export declare const ClusterSubnetGroup: import("alchemy").ResourceClass<ClusterSubnetGroup>;
export declare const ClusterSubnetGroupProvider: () => import("effect/Layer").Layer<Provider.Provider<ClusterSubnetGroup>, never, AWSEnvironment | import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};
