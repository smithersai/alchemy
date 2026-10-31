import { MigrationError, type NormalizedMigrationsInput, type StampedMigrationsState } from "@alchemy.run/sql/Migrations";
import { stripSslQueryParams } from "@alchemy.run/sql/PostgresDriver";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
export { stripSslQueryParams };
/**
 * Fly Managed Postgres's migration adaptation is the shared pipeline
 * with a connection-URI-scoped pg client as its executor. Use the
 * direct (non-PgBouncer) URI so DDL and advisory locks work.
 */
export declare const runPgMigrations: (options: {
    connectionUri: Redacted.Redacted<string>;
    input: NormalizedMigrationsInput;
    stamped: StampedMigrationsState;
}) => Effect.Effect<import("@alchemy.run/sql/Migrations").MigrationRun, import("@alchemy.run/sql/Migrations").DrizzleV0LayoutError | import("@alchemy.run/sql/Migrations").MigrationApplyError, import("effect/FileSystem").FileSystem | import("effect/Path").Path>;
/** Run a single SQL script against the database (used for `importFiles`). */
export declare const runSql: (connectionUri: Redacted.Redacted<string>, sql: string) => Effect.Effect<void, MigrationError, never>;
/** Apply `importFiles`, each once and again only when it changes. */
export declare const runImports: (connectionUri: Redacted.Redacted<string>, importFiles: ReadonlyArray<string>, rootDir: string, previous: Record<string, string>) => Effect.Effect<Record<string, string>, MigrationError | import("effect/PlatformError").PlatformError, import("effect/FileSystem").FileSystem | import("effect/Path").Path>;
