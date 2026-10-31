import type * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import type { Connection, ConnectionOptions } from "mysql2/promise";
import type { Client, ClientConfig } from "pg";
import { MigrationError, type MigrationDialect, type SqlExecutor } from "./Format.vibe";
/**
 * Wrap any failure from a migration transport as a {@link MigrationError}
 * that names what failed: `Effect.mapError(migrationError("executeSql on app"))`.
 */
export declare const migrationError: (context: string) => (cause: unknown) => MigrationError;
/**
 * Open a `pg` client for the scope of `use`; it always closes afterwards,
 * including when `connect` itself fails. `config` goes to
 * `new Client(config)` unchanged — a connection string, TLS options, or a
 * `stream` the provider already connected (the Cloud SQL connector).
 * Prefer {@link withPgExecutor}; use this when the provider runs its own
 * executor over the client (DSQL) or plain SQL (`importFiles`).
 */
export interface ConnectOptions {
    /**
     * Retry the connect — never `use` — while this holds for the driver's
     * error, e.g. DNS that hasn't propagated for a just-created host.
     */
    readonly retryConnect?: {
        readonly while: (cause: unknown) => boolean;
        readonly times: number;
        readonly interval: Duration.Input;
    };
    /** Rewrite a connect failure that survived the retry, e.g. to add a hint. */
    readonly onConnectFailure?: (error: MigrationError) => MigrationError;
}
export declare const withPgClient: <A, E, R>(config: ClientConfig, use: (client: Client) => Effect.Effect<A, E, R>, options?: ConnectOptions) => Effect.Effect<A, MigrationError | E, R>;
/** {@link withPgClient} handing over the client as a {@link SqlExecutor}. */
export declare const withPgExecutor: <A, E, R>(config: ClientConfig, use: (executor: SqlExecutor) => Effect.Effect<A, E, R>, options?: ConnectOptions) => Effect.Effect<A, MigrationError | E, R>;
/**
 * Open a `mysql2` connection for the scope of `use`; it always closes
 * afterwards. `config` goes to `createConnection(config)` unchanged.
 * Prefer {@link withMySqlExecutor}.
 */
export declare const withMySqlConnection: <A, E, R>(config: ConnectionOptions, use: (connection: Connection) => Effect.Effect<A, E, R>, options?: ConnectOptions) => Effect.Effect<A, MigrationError | E, R>;
/** {@link withMySqlConnection} handing over the connection as a {@link SqlExecutor}. */
export declare const withMySqlExecutor: <A, E, R>(config: ConnectionOptions, use: (executor: SqlExecutor) => Effect.Effect<A, E, R>, options?: ConnectOptions) => Effect.Effect<A, MigrationError | E, R>;
export type Rows = Array<Record<string, unknown>>;
/**
 * A {@link SqlExecutor} over an API that runs a SQL string and returns rows —
 * the Cloud SQL and AlloyDB Data APIs, or any HTTP SQL endpoint. The provider
 * supplies only `execute`, which must fail when the database reports an
 * error (Data APIs return SQL errors inside a 200). Params are inlined, since
 * these APIs bind none.
 *
 * `batch` sets how a migration and its bookkeeping row commit together:
 * - `"transaction"` — one request wrapped in `BEGIN`/`COMMIT`
 *   (`START TRANSACTION` on MySQL).
 * - `"atomic"` — one request the API already commits as a unit.
 */
export declare const makeStatementExecutor: (options: {
    dialect: MigrationDialect;
    execute: (sql: string) => Effect.Effect<Rows, MigrationError>;
    batch: "transaction" | "atomic";
}) => SqlExecutor;
/**
 * Rows keyed by column name from the `columns` + `rows[].values[]` shape the
 * GCP Data APIs return; `nullValue` cells become `null`.
 */
export declare const rowsFromCells: (columns: ReadonlyArray<{
    readonly name?: string;
}> | undefined, rows: ReadonlyArray<{
    readonly values?: ReadonlyArray<{
        readonly value?: string;
        readonly nullValue?: boolean;
    }>;
}> | undefined) => Rows;
/**
 * Retry `effect` while a just-created user or database starts accepting
 * logins, which can take seconds. Wrap only idempotent work — a probe
 * query or a connection that runs one — never a migration batch.
 */
export declare const retryLogin: <A, E, R>(effect: Effect.Effect<A, E, R>, options?: {
    attempts?: number;
    interval?: Duration.Input;
}) => Effect.Effect<A, E, R>;
/**
 * Run `SELECT 1` under {@link retryLogin}, then return the executor, so a
 * login delay is retried before any migration batch runs.
 */
export declare const probeExecutor: (executor: SqlExecutor) => Effect.Effect<SqlExecutor, MigrationError>;
