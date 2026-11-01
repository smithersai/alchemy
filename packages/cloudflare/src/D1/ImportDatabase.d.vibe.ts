import * as d1 from "@distilled.cloud/cloudflare/d1";
import * as Effect from "effect/Effect";
export interface ImportDatabaseOptions {
    accountId: string;
    databaseId: string;
    sqlData: string | Uint8Array;
    filename?: string;
}
export interface ImportDatabaseResult {
    filename: string;
    numQueries: number;
}
declare const D1ImportError_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "D1ImportError";
} & Readonly<A>;
/**
 * A D1 import that Cloudflare accepted but could not finish: the SQL upload
 * was rejected, ingestion reported `status: "error"`, or an in-progress
 * response carried no bookmark to poll.
 */
export declare class D1ImportError extends D1ImportError_base<{
    databaseId: string;
    message: string;
}> {
}
/**
 * Import SQL into a D1 database via the multi-step Cloudflare flow:
 *   1. POST `action: "init"` -> returns a presigned `upload_url`, unless D1
 *      already holds a file with this etag, in which case the init response
 *      is itself the first polling response (the import has started).
 *   2. PUT raw SQL to `upload_url` (only when one was returned)
 *   3. POST `action: "ingest"` -> returns the first polling response
 *   4. POST `action: "poll"` with `at_bookmark` until `status === "complete"`
 */
export declare const importD1Database: (options: ImportDatabaseOptions) => Effect.Effect<ImportDatabaseResult, D1ImportError | d1.ImportDatabaseError, d1.CloudflareOpContext>;
export {};
