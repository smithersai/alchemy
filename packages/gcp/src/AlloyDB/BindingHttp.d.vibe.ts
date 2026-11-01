import * as Effect from "effect/Effect";
import { type BindingIam, type GcpHttpOp } from "../HttpBinding.js";
import type { Backup } from "./Backup.js";
import type { Cluster } from "./Cluster.js";
import type { ClustersUser } from "./ClustersUser.js";
import type { Instance } from "./Instance.js";
/**
 * Shared HTTP scaffolding for AlloyDB cluster, instance, backup, and
 * user bindings. NOT exported from index.ts.
 */
export declare const makeAlloyDbClusterHttpBinding: <I extends {
    name?: string;
}, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(cluster: Cluster) => Effect.Effect<(request?: Omit<I, "name"> | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
export declare const makeAlloyDbInstanceHttpBinding: <I extends {
    name?: string;
}, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(instance: Instance) => Effect.Effect<(request?: Omit<I, "name"> | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
export declare const makeAlloyDbBackupHttpBinding: <I extends {
    name?: string;
}, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(backup: Backup) => Effect.Effect<(request?: Omit<I, "name"> | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
export declare const makeAlloyDbUserHttpBinding: <I extends {
    name?: string;
}, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(user: ClustersUser) => Effect.Effect<(request?: Omit<I, "name"> | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
export declare const makeAlloyDbConnectionInfoHttpBinding: <I extends {
    parent?: string;
}, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(instance: Instance) => Effect.Effect<(request?: Omit<I, "parent"> | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
