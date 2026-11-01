import type { Output } from "alchemy/Output";
import * as Effect from "effect/Effect";
import { type BindingIam, type GcpHttpOp } from "../HttpBinding.js";
/**
 * Shared HTTP scaffolding for Oracle Database@Google Cloud bindings.
 * NOT exported from index.ts.
 */
export declare const makeOracleNameHttpBinding: <Resource extends {
    readonly name: Output<string, never>;
    readonly LogicalId: string;
}, I extends {
    name?: string;
}, A, E>(options: {
    tag: string;
    /** Oracle Database@Google Cloud has no resource-level IAM: project grant. */
    iam: Pick<BindingIam, "role">;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(resource: Resource) => Effect.Effect<(request?: Omit<I, "name"> | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
