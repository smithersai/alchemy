import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { SubnetId } from "../EC2/Subnet.js";
import type { Providers } from "../Providers.vibe";
declare const NeptuneDBSubnetGroupUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "NeptuneDBSubnetGroupUnexpectedResponse";
} & Readonly<A>;
export declare class NeptuneDBSubnetGroupUnexpectedResponse extends NeptuneDBSubnetGroupUnexpectedResponse_base<{
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
     * Subnets the Neptune cluster may use. Must span at least two
     * Availability Zones.
     */
    subnetIds: SubnetId[];
    /**
     * User-defined tags for the subnet group.
     */
    tags?: Record<string, string>;
}
export interface DBSubnetGroup extends Resource<"AWS.Neptune.DBSubnetGroup", DBSubnetGroupProps, {
    /** Name of the subnet group. */
    dbSubnetGroupName: string;
    /** ARN of the subnet group. */
    dbSubnetGroupArn: string | undefined;
    /** ID of the VPC the subnets belong to. */
    vpcId: string | undefined;
    /** IDs of the subnets in the group. */
    subnetIds: string[];
    /** Status of the subnet group (e.g. `Complete`). */
    status: string | undefined;
    /** Tags on the subnet group (user + internal Alchemy tags). */
    tags: Record<string, string>;
}, never, Providers> {
}
/**
 * An Amazon Neptune DB subnet group — the set of VPC subnets a Neptune
 * cluster and its instances are placed into. Neptune is VPC-only, so a
 * subnet group spanning at least two Availability Zones is required before a
 * cluster can be created.
 * ### Creating a Subnet Group
 * **Example:** Multi-AZ subnet group
 * ```typescript
 * const subnetGroup = yield* DBSubnetGroup("NeptuneSubnets", {
 *   subnetIds: [subnetA.subnetId, subnetB.subnetId],
 * });
 * ```
 *
 * @resource
 */
export declare const DBSubnetGroup: import("alchemy").ResourceClass<DBSubnetGroup>;
export declare const DBSubnetGroupProvider: () => import("effect/Layer").Layer<Provider.Provider<DBSubnetGroup>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};
