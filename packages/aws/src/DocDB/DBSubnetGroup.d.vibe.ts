import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { SubnetId } from "../EC2/Subnet.ts";
import type { Providers } from "../Providers.ts";
declare const DBSubnetGroupOperationFailed_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "DBSubnetGroupOperationFailed";
} & Readonly<A>;
export declare class DBSubnetGroupOperationFailed extends DBSubnetGroupOperationFailed_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
declare const DBSubnetGroupUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "DBSubnetGroupUnexpectedResponse";
} & Readonly<A>;
export declare class DBSubnetGroupUnexpectedResponse extends DBSubnetGroupUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface DBSubnetGroupProps {
    /**
     * Name of the DB subnet group. If omitted, a deterministic name is generated.
     */
    dbSubnetGroupName?: string;
    /**
     * Description for the subnet group.
     * @default "Managed by Alchemy"
     */
    description?: string;
    /**
     * Subnets the DocumentDB cluster may use. Must span at least two
     * Availability Zones.
     */
    subnetIds: SubnetId[];
    /**
     * User-defined tags for the subnet group.
     */
    tags?: Record<string, string>;
}
export interface DBSubnetGroup extends Resource<"AWS.DocDB.DBSubnetGroup", DBSubnetGroupProps, {
    /** The subnet group name (unique per account/region). */
    dbSubnetGroupName: string;
    /** The ARN of the subnet group. */
    dbSubnetGroupArn: string | undefined;
    /** The VPC the subnets belong to. */
    vpcId: string | undefined;
    /** The IDs of the subnets in the group. */
    subnetIds: string[];
    /** The current status of the subnet group, e.g. `Complete`. */
    status: string | undefined;
    /** The network types the group supports, e.g. `IPV4`. */
    supportedNetworkTypes: string[] | undefined;
    /** The tags attached to the subnet group. */
    tags: Record<string, string>;
}, never, Providers> {
}
/**
 * An Amazon DocumentDB subnet group — the set of VPC subnets a DocumentDB
 * cluster and its instances are placed into. DocumentDB is VPC-only, so a
 * subnet group spanning at least two Availability Zones is required before a
 * cluster can be created.
 * ### Creating a Subnet Group
 * **Example:** Multi-AZ subnet group
 * ```typescript
 * const subnetGroup = yield* DBSubnetGroup("DocDbSubnets", {
 *   subnetIds: [subnetA.subnetId, subnetB.subnetId],
 * });
 * ```
 *
 * @resource
 */
export declare const DBSubnetGroup: import("alchemy").ResourceClass<DBSubnetGroup>;
export declare const DBSubnetGroupProvider: () => import("effect/Layer").Layer<Provider.Provider<DBSubnetGroup>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};
