import { type ConnectionSource } from "@alchemy.run/sql/ConnectionSource";
import * as Layer from "effect/Layer";
import { Database } from "./Database.js";
import { type SqlLayerOptions } from "./Postgres.js";
export interface NeonOptions extends SqlLayerOptions {
}
/**
 * Neon database layer for Better Auth over Neon's serverless driver.
 *
 * This is the optimal Workers/Lambda → Neon pairing: the driver speaks
 * WebSocket instead of TCP, so it needs no Hyperdrive, no `pg` install,
 * and no socket compatibility flags. One pool per execution, closed when
 * the event settles.
 *
 * For TCP access through Cloudflare Hyperdrive use `CloudflareHyperdrive`;
 * for a generic `pg` connection use `Postgres`.
 *
 * ### Connecting from a Worker or Lambda
 * The `connectionUri` Output binds into the host environment at deploy
 * and is read back at runtime; the same source drives the deploy-time
 * migration Action.
 * **Example:** Worker (or Lambda) with a Neon-backed BetterAuth
 * ```typescript
 * import { BetterAuth } from "@alchemy.run/better-auth";
 * import { Neon as NeonDatabase } from "@alchemy.run/better-auth/Neon";
 * import * as Neon from "@alchemy.run/neon";
 *
 * export const AuthDb = Neon.Project("AuthDb");
 *
 * Effect.gen(function* () {
 *   const auth = yield* BetterAuth({ emailAndPassword: { enabled: true } });
 *   return { fetch: ... };
 * }).pipe(
 *   Effect.provide(
 *     Layer.unwrap(Effect.map(AuthDb, (db) => NeonDatabase(db.connectionUri))),
 *   ),
 * )
 * ```
 *
 * ### Branch-per-stage setups
 * Point the layer at a branch's connection string instead of the project's
 * to isolate auth data per stage.
 * **Example:** Using a Neon branch
 * ```typescript
 * const branch = yield* Neon.Branch("auth-db", { project });
 * // ...
 * Effect.provide(Layer.unwrap(Effect.map(branch, (b) => NeonDatabase(b.connectionUri))))
 * ```
 *
 * @layer
 * @provides BetterAuth.Database
 * @peer @neondatabase/serverless
 * @product Neon
 */
export declare const Neon: (url: ConnectionSource, options?: NeonOptions) => Layer.Layer<Database>;
