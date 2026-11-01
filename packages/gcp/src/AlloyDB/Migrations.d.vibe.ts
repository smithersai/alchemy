import { type NormalizedMigrationsInput, type StampedMigrationsState } from "@alchemy.run/sql/Migrations";
import * as alloydb from "@distilled.cloud/gcp/alloydb_v1";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
/**
 * Apply migrations to a database on an AlloyDB primary instance through
 * the Data API. Call once the instance is ready.
 */
export declare const runInstanceMigrations: (options: {
    instance: string;
    database: string;
    input: NormalizedMigrationsInput;
    stamped: StampedMigrationsState;
    user: string | undefined;
    password: string | Redacted.Redacted<string> | undefined;
}) => Effect.Effect<import("@alchemy.run/sql/Migrations").MigrationRun, import("@alchemy.run/sql/Migrations").DrizzleV0LayoutError | import("@alchemy.run/sql/Migrations").MigrationApplyError, import("effect/FileSystem").FileSystem | import("effect/Path").Path | alloydb.GcpOpContext>;
