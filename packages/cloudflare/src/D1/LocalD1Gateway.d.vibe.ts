import { D1 } from "@alchemy.run/cloudflare-runtime/core/bindings";
import * as Effect from "effect/Effect";
import { localGatewayRuntime } from "../LocalGateway.js";
import type { D1QueryResult, D1SqlExecutor } from "./ApplyMigrations.vibe";
/**
 * Node-side query path into the local workerd D1 simulator, built on the
 * runtime's platform proxy (`PlatformProxy.open` — our `getPlatformProxy`).
 *
 * The simulator (a `d1` service routing to a per-database
 * `D1DatabaseObject` Durable Object over DO SQLite) is only reachable from
 * inside workerd — but alchemy's migration runner and the
 * `QueryDatabaseLocal` capability run in Node. The platform proxy bridges
 * the two: it hosts the binding in a scoped workerd instance and exposes it
 * to Node. We bind the raw `d1` service (the same designator the
 * `cloudflare-internal:d1-api` wrapped binding targets) so Node speaks the
 * full D1 HTTP protocol (`POST /query`, multi-statement SQL) rather than
 * the line-based `exec()` surface of the wrapped binding:
 *
 *   Node ── proxy.env.D1_RAW.fetch({sql}) ──▶ `d1` service ──▶ D1DatabaseObject
 *
 * Data lands in the same `{storage}/d1` directory every local worker
 * binding reads.
 *
 * NOT exported from `index.ts` — provider-internal scaffolding.
 */
export { localGatewayRuntime as localD1GatewayRuntime };
declare const LocalD1QueryError_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "LocalD1QueryError";
} & Readonly<A>;
export declare class LocalD1QueryError extends LocalD1QueryError_base<{
    message: string;
    cause?: unknown;
}> {
}
/**
 * A single query or batch in the shape the cloud `d1.queryDatabase` op
 * accepts — the local gateway speaks the same surface so client code can
 * swap transports without translation.
 */
export type D1QueryBody = {
    sql: string;
    params?: unknown[];
} | {
    batch: Array<{
        sql: string;
        params?: unknown[];
    }>;
};
/**
 * Boot a scoped platform proxy for `databaseId`, hand `use` a query
 * function that tunnels {@link D1QueryBody} requests into the local
 * simulator, and tear the instance down when `use` completes.
 */
export declare const withLocalD1Query: <A, E, R>(databaseId: string, use: (query: (body: D1QueryBody) => Effect.Effect<D1QueryResult, LocalD1QueryError>) => Effect.Effect<A, E, R>) => Effect.Effect<A, E | import("@alchemy.run/cloudflare-runtime/core").RuntimeError, D1.D1 | import("@alchemy.run/cloudflare-runtime/core").Runtime | Exclude<R, import("effect/Scope").Scope>>;
/**
 * SQL-only view of {@link withLocalD1Query} matching the migration flow's
 * {@link D1SqlExecutor} contract. Multi-statement SQL runs as a batch of its
 * statements, as the cloud query endpoint splits it: the simulator's SQLite
 * rejects one statement over its length limit.
 */
export declare const withLocalD1Executor: <A, E, R>(databaseId: string, use: (executor: D1SqlExecutor<LocalD1QueryError>) => Effect.Effect<A, E, R>) => Effect.Effect<A, E | import("@alchemy.run/cloudflare-runtime/core").RuntimeError, D1.D1 | import("@alchemy.run/cloudflare-runtime/core").Runtime | Exclude<R, import("effect/Scope").Scope>>;
