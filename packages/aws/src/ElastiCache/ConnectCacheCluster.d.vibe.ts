import * as Binding from "alchemy/Binding";
import type { Input } from "alchemy/Input";
import type { RuntimeContext } from "alchemy/RuntimeContext";
import type * as Effect from "effect/Effect";
import type { SecurityGroupId } from "../EC2/SecurityGroup.js";
import type { SubnetId } from "../EC2/Subnet.js";
import type { CacheCluster } from "./CacheCluster.js";
export interface CacheClusterConnectionInfo {
    endpoints: Array<{
        address: string;
        port: number;
    }>;
    tls: boolean;
}
export interface ConnectCacheClusterOptions {
    subnetIds?: Input<SubnetId[]>;
    securityGroupIds?: Input<SecurityGroupId[]>;
}
export declare const cacheClusterConnectEnvPrefix: (logicalId: string) => string;
/**
 * Runtime binding for a provisioned Memcached cluster.
 *
 * At deploy time it publishes all node endpoints as
 * `ELASTICACHE_{LOGICAL_ID}_ENDPOINTS` on the host Function. Passing VPC
 * options attaches the host Lambda to the cache network. ElastiCache data
 * plane access is controlled by security groups, not IAM.
 *
 * ### Connecting from a Lambda
 * **Example:** Resolve Memcached node endpoints
 * ```typescript
 * const connect = yield* AWS.ElastiCache.ConnectCacheCluster(cache, {
 *   subnetIds: privateSubnetIds,
 *   securityGroupIds: [functionSecurityGroup.groupId],
 * });
 *
 * // inside the handler:
 * const { endpoints } = yield* connect;
 * const endpoint = endpoints[0];
 * ```
 *
 * @binding
 */
export interface ConnectCacheCluster extends Binding.Service<ConnectCacheCluster, "AWS.ElastiCache.ConnectCacheCluster", (cluster: CacheCluster, options?: ConnectCacheClusterOptions) => Effect.Effect<Effect.Effect<CacheClusterConnectionInfo, never, RuntimeContext>>> {
}
export declare const ConnectCacheCluster: ConnectCacheCluster;
