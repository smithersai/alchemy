import type { MigrationError, SqlExecutor } from "@alchemy.run/sql/Migrations/Format";
import type * as Effect from "effect/Effect";
/**
 * Where and as whom a migration connects. Plain JSON: the Lambda transport
 * sends it to the migration runner in the invocation payload.
 */
export interface MigrationConnectionTarget {
    dialect: "postgres" | "mysql";
    host: string;
    port: number;
    database: string | undefined;
    username: string;
    password: string;
}
/**
 * Open one `pg` client or `mysql2` connection to an RDS endpoint for the
 * scope of `use`, closing it afterwards. Shared by the direct transport
 * (on the deploying machine) and the migration runner Lambda (in the VPC).
 *
 * TLS is always on. RDS certificates chain to a private AWS CA that Node's
 * trust store doesn't carry, so the certificate is not verified.
 */
export declare const withMigrationConnection: <A, E, R>(target: MigrationConnectionTarget, use: (executor: SqlExecutor) => Effect.Effect<A, E, R>) => Effect.Effect<A, MigrationError | E, R>;
