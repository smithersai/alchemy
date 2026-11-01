import * as Effect from "effect/Effect";
import { type BindingIam, type GcpHttpOp } from "../HttpBinding.js";
import type { Cluster } from "./Cluster.js";
/**
 * Shared HTTP scaffolding for Dataproc cluster bindings.
 * NOT exported from index.ts.
 */
export declare const makeDataprocClusterHttpBinding: <I extends {
    projectId?: string;
    region?: string;
    clusterName?: string;
}, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(cluster: Cluster) => Effect.Effect<(request?: Omit<I, "projectId" | "region" | "clusterName"> | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
