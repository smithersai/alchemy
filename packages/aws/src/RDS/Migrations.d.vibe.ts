import { type NormalizedMigrationsInput, type StampedMigrationsState } from "@alchemy.run/sql/Migrations";
import * as rds from "@distilled.cloud/aws/rds";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
/**
 * How migrations reach an RDS database:
 *
 * - `"data-api"` — the RDS Data API over HTTPS. Aurora clusters with the
 *   Data API enabled only; no network route needed.
 * - `"direct"` — a `pg`/`mysql2` connection from the deploying machine to
 *   the database endpoint. Needs a network route (public endpoint, VPN,
 *   bastion).
 * - an `AWS.RDS.MigrationRunner` (or any `{ functionArn }`) — a Lambda in
 *   the database's VPC opens the connection; the deploying machine only
 *   invokes it.
 */
export type MigrationsTransport = "data-api" | "direct" | {
    functionArn: string;
};
/**
 * Apply migrations to the database an RDS instance serves — its own, or its
 * Aurora cluster's when it is a cluster member. Call once the instance is
 * available. Credentials, in order: `secretArn`, then `credentials`
 * (direct and Lambda transports only), then the RDS-managed master secret.
 */
export declare const runDBInstanceMigrations: (options: {
    instance: rds.DBInstance;
    input: NormalizedMigrationsInput;
    stamped: StampedMigrationsState;
    transport: MigrationsTransport | undefined;
    secretArn: string | undefined;
    credentials: {
        username: string;
        password: Redacted.Redacted<string>;
    } | undefined;
}) => Effect.Effect<import("@alchemy.run/sql/Migrations").MigrationRun, import("@alchemy.run/sql/Migrations").DrizzleV0LayoutError | import("@distilled.cloud/aws/Errors").CommonErrors | import("@alchemy.run/sql/Migrations").MigrationApplyError, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/FileSystem").FileSystem | import("effect/http/HttpClient").HttpClient | import("effect/Path").Path>;
