import * as Effect from "effect/Effect";
import { type BindingIam, type GcpHttpOp } from "../HttpBinding.js";
import type { Cluster } from "./Cluster.js";
import type { ClustersNodePool } from "./ClustersNodePool.js";
import type { NodePool } from "./NodePool.js";
/**
 * Shared HTTP scaffolding for GKE cluster and node pool bindings.
 * NOT exported from index.ts.
 */
export declare const makeContainerClusterHttpBinding: <I extends {
    name?: string;
}, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(cluster: Cluster) => Effect.Effect<(request?: Omit<I, "name"> | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
export declare const makeContainerNodePoolHttpBinding: <I extends {
    name?: string;
}, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(nodePool: NodePool) => Effect.Effect<(request?: Omit<I, "name"> | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
export declare const makeContainerClustersNodePoolHttpBinding: <I extends {
    projectId: string;
    zone: string;
    clusterId: string;
    nodePoolId: string;
    name?: string;
}, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(nodePool: ClustersNodePool) => Effect.Effect<(request?: Omit<I, "projectId" | "zone" | "clusterId" | "nodePoolId" | "name"> | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
