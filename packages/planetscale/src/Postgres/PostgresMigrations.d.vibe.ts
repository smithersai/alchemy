import { type NormalizedMigrationsInput, type StampedMigrationsState } from "@alchemy.run/sql/Migrations";
import * as ps from "@distilled.cloud/planetscale";
import * as Effect from "effect/Effect";
export interface PostgresMigrationTarget {
    organization: string;
    database: string;
    branch: string;
}
/**
 * PlanetScale Postgres's migration adaptation is exactly this: the shared
 * pipeline with a temp-role-scoped pg client as its executor.
 */
export declare const runPostgresMigrations: (target: PostgresMigrationTarget, input: NormalizedMigrationsInput, stamped: StampedMigrationsState) => Effect.Effect<import("@alchemy.run/sql/Migrations").MigrationRun, import("@alchemy.run/sql/Migrations").DrizzleV0LayoutError | ps.CreateRoleError | import("@alchemy.run/sql/Migrations").MigrationApplyError, import("effect/FileSystem").FileSystem | import("effect/Path").Path | ps.PlanetScaleOpContext>;
/** Apply `importFiles`, each once and again only when it changes. */
export declare const runPostgresImports: (target: PostgresMigrationTarget, importFiles: ReadonlyArray<string>, rootDir: string, previous: Record<string, string>) => Effect.Effect<Record<string, string>, import("@alchemy.run/sql/Migrations").MigrationError | import("effect/PlatformError").PlatformError | ps.CreateRoleError, import("effect/FileSystem").FileSystem | import("effect/Path").Path | ps.PlanetScaleOpContext>;
