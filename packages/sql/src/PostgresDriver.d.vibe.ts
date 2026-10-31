import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import type * as Scope from "effect/Scope";
import type { Pool, PoolConfig } from "pg";
/**
 * Drop `sslmode` and `channel_binding` from a Postgres connection URI. Hosted
 * Postgres URIs (Neon, Fly, PlanetScale) carry `sslmode=require`, which
 * `pg-connection-string` warns about and treats as `verify-full`; set TLS on
 * the client (`ssl: { rejectUnauthorized }`) instead. A string that isn't a
 * URL is returned unchanged.
 */
export declare const stripSslQueryParams: (uri: string) => string;
/**
 * Lazily load the raw `pg` driver (an optional peer dependency of
 * alchemy) with a descriptive failure when it isn't installed. CJS/ESM
 * interop is normalized — callers always get the module's named surface.
 */
export declare const importPg: () => Promise<typeof import("pg")>;
/**
 * Open a raw `pg.Pool` on the current `Scope` — `pool.end()` runs when the
 * scope closes. Pair with `makeExecutionMemo` for the one-pool-per-event
 * shape workerd and Lambda require (see `SQL/Postgres.ts` for the
 * effect-sql equivalent).
 *
 * `max` defaults to 1: per-execution pools never need more than one
 * connection.
 */
export declare const openPostgresPool: (url: Effect.Effect<Redacted.Redacted<string>>, config?: Omit<PoolConfig, "connectionString">) => Effect.Effect<Pool, never, Scope.Scope>;
