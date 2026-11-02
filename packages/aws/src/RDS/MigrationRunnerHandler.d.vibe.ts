import { type MigrationConnectionTarget } from "./MigrationConnection.ts";
/**
 * One SQL operation the deploying machine asks the in-VPC runner to perform.
 * `batch` runs its statements in one transaction.
 */
export type MigrationRunnerRequest = {
    op: "query";
    target: MigrationConnectionTarget;
    sql: string;
} | {
    op: "batch";
    target: MigrationConnectionTarget;
    statements: ReadonlyArray<string>;
};
export type MigrationRunnerResponse = {
    ok: true;
    rows: Array<Record<string, unknown>>;
} | {
    ok: false;
    message: string;
};
/**
 * Entry point of the `AWS.RDS.MigrationRunner` Lambda. Each invocation
 * opens one connection, runs one query or one transactional batch, and
 * closes the connection. Failures return `{ ok: false }` so the deploying
 * machine reports the database's own error message.
 */
export declare const handler: (event: MigrationRunnerRequest) => Promise<MigrationRunnerResponse>;
