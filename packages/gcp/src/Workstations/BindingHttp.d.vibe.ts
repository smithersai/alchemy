import * as Effect from "effect/Effect";
import { type BindingIam, type GcpHttpOp } from "../HttpBinding.js";
import type { WorkstationCluster } from "./WorkstationCluster.vibe";
import type { WorkstationClustersWorkstationConfig } from "./WorkstationClustersWorkstationConfig.vibe";
import type { WorkstationClustersWorkstationConfigsWorkstation } from "./WorkstationClustersWorkstationConfigsWorkstation.vibe";
/**
 * Shared HTTP scaffolding for Cloud Workstations bindings.
 * NOT exported from index.ts.
 */
export declare const makeClusterHttpBinding: <I extends {
    name?: string;
}, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(cluster: WorkstationCluster) => Effect.Effect<(request?: Omit<I, "name"> | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
export declare const makeConfigHttpBinding: <I extends {
    name?: string;
}, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(config: WorkstationClustersWorkstationConfig) => Effect.Effect<(request?: Omit<I, "name"> | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
export declare const makeWorkstationHttpBinding: <I extends {
    name?: string;
}, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(workstation: WorkstationClustersWorkstationConfigsWorkstation) => Effect.Effect<(request?: Omit<I, "name"> | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
export declare const makeGenerateAccessTokenHttpBinding: <I extends {
    workstation?: string;
}, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(workstation: WorkstationClustersWorkstationConfigsWorkstation) => Effect.Effect<(request?: Omit<I, "workstation"> | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
