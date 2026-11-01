import * as Effect from "effect/Effect";
import { type BindingIam } from "../HttpBinding.js";
import { type ReadTableClient } from "./ReadTable.vibe";
import type { Table } from "./Table.vibe";
import { type WriteTableClient } from "./WriteTable.vibe";
export declare const readTableIam: ReadonlyArray<BindingIam>;
export declare const writeTableIam: ReadonlyArray<BindingIam>;
export declare const readWriteTableIam: ReadonlyArray<BindingIam>;
export interface TableRef {
    project: string;
    datasetId: string;
    tableId: string;
    location: string | undefined;
}
/**
 * Shared HTTP scaffolding for the BigQuery Read/Write/ReadWrite table
 * bindings: resolves the distilled operations once at Layer construction
 * and grants the level's roles at deploy time.
 *
 * NOT exported from `index.ts`.
 */
export declare const makeBigQueryTableHelpers: Effect.Effect<{
    makeRead: (table: Effect.Effect<TableRef>) => ReadTableClient;
    makeWrite: (table: Effect.Effect<TableRef>) => WriteTableClient;
}, never, never>;
/** Build a table binding that grants `iam` and returns `makeClient`'s client. */
export declare const makeBigQueryTableBinding: <Client>(options: {
    tag: string;
    iam: ReadonlyArray<BindingIam>;
    makeClient: (helpers: Effect.Success<typeof makeBigQueryTableHelpers>, table: Effect.Effect<TableRef>) => Client;
}) => Effect.Effect<(table: Table) => Effect.Effect<Client, never, never>, never, never>;
