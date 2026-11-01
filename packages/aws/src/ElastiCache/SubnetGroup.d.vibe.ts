import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.vibe";
declare const ElastiCacheSubnetGroupUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "ElastiCacheSubnetGroupUnexpectedResponse";
} & Readonly<A>;
export declare class ElastiCacheSubnetGroupUnexpectedResponse extends ElastiCacheSubnetGroupUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface SubnetGroupProps {
    /** Name of the subnet group. Generated deterministically when omitted. */
    subnetGroupName?: string;
    /** Human-readable description. */
    description: string;
    /** VPC subnet IDs. Use at least two AZs for a highly-available cache. */
    subnetIds: string[];
    /** User-defined tags. */
    tags?: Record<string, string>;
}
export interface SubnetGroup extends Resource<"AWS.ElastiCache.SubnetGroup", SubnetGroupProps, {
    subnetGroupName: string;
    subnetGroupArn: string;
    description: string | undefined;
    vpcId: string | undefined;
    subnetIds: string[];
    tags: Record<string, string>;
}, never, Providers> {
}
/**
 * A VPC subnet group for provisioned ElastiCache resources.
 *
 * ### Creating a Subnet Group
 * **Example:** Two Availability Zones
 * ```typescript
 * const subnets = yield* SubnetGroup("CacheSubnets", {
 *   description: "cache subnets",
 *   subnetIds: [subnetA.subnetId, subnetB.subnetId],
 * });
 * ```
 *
 * @resource
 */
export declare const SubnetGroup: import("alchemy").ResourceClass<SubnetGroup>;
export declare const SubnetGroupProvider: () => import("effect/Layer").Layer<Provider.Provider<SubnetGroup>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};
