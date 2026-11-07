import { type NormalizedMigrationsInput, type StampedMigrationsState } from "@alchemy.run/sql/Migrations";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import type { Client } from "pg";
/** A `pg` client on a Neon connection URI for the scope of `use`. */
export declare const withPgClient: <A, E, R>(connectionUri: Redacted.Redacted<string>, use: (client: Client) => Effect.Effect<A, E, R>) => Effect.Effect<A, E | import("@alchemy.run/sql/Migrations").MigrationError, R>;
/** Run one SQL script (several statements are fine). */
export declare const runSql: (connectionUri: Redacted.Redacted<string>, sql: string) => Effect.Effect<void, import("@alchemy.run/sql/Migrations").MigrationError, never>;
export declare const runPgMigrations: (options: {
    connectionUri: Redacted.Redacted<string>;
    input: NormalizedMigrationsInput;
    stamped: StampedMigrationsState;
}) => Effect.Effect<import("@alchemy.run/sql/Migrations").MigrationRun, import("@alchemy.run/sql/Migrations").DrizzleV0LayoutError | import("@alchemy.run/sql/Migrations").MigrationApplyError, import("effect/FileSystem").FileSystem | import("effect/Path").Path>;
/** Apply `importFiles`, each once and again only when it changes. */
export declare const runImports: (connectionUri: Redacted.Redacted<string>, importFiles: ReadonlyArray<string>, rootDir: string, previous: Record<string, string>) => Effect.Effect<Record<string, string>, import("@alchemy.run/sql/Migrations").MigrationError | import("effect/PlatformError").PlatformError, import("effect/FileSystem").FileSystem | import("effect/Path").Path>;
