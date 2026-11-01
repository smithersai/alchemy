import * as Effect from "effect/Effect";
import { type BindingIam, type GcpHttpOp } from "../HttpBinding.js";
import type { Table } from "./Table.js";
/**
 * Shared HTTP scaffolding for BigQuery table bindings.
 * NOT exported from index.ts.
 */
export declare const makeTableHttpBinding: <I extends {
    projectId: string;
    datasetId: string;
    tableId: string;
}, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(table: Table) => Effect.Effect<(request?: Omit<I, "projectId" | "datasetId" | "tableId"> | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
