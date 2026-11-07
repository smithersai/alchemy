import { type NormalizedMigrationsInput, type StampedMigrationsState } from "@alchemy.run/sql/Migrations";
import * as ps from "@distilled.cloud/planetscale";
import * as Effect from "effect/Effect";
export interface MySQLMigrationTarget {
    organization: string;
    database: string;
    branch: string;
}
/**
 * PlanetScale MySQL's migration adaptation is exactly this: the shared
 * pipeline with a temp-password-scoped mysql2 connection as its executor.
 */
export declare const runMySQLMigrations: (target: MySQLMigrationTarget, input: NormalizedMigrationsInput, stamped: StampedMigrationsState) => Effect.Effect<import("@alchemy.run/sql/Migrations").MigrationRun, import("@alchemy.run/sql/Migrations").DrizzleV0LayoutError | ps.CreatePasswordError | import("@alchemy.run/sql/Migrations").MigrationApplyError, import("effect/FileSystem").FileSystem | import("effect/Path").Path | ps.PlanetScaleOpContext>;
/**
 * Apply `importFiles`, each once and again only when it changes. Vitess
 * rejects drizzle-kit's `--> statement-breakpoint` markers, so statements
 * run one at a time.
 */
export declare const runMySQLImports: (target: MySQLMigrationTarget, importFiles: ReadonlyArray<string>, rootDir: string, previous: Record<string, string>) => Effect.Effect<Record<string, string>, import("@alchemy.run/sql/Migrations").MigrationError | import("effect/PlatformError").PlatformError | ps.CreatePasswordError, import("effect/FileSystem").FileSystem | import("effect/Path").Path | ps.PlanetScaleOpContext>;
