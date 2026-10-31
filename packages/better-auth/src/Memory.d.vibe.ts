import { type MemoryDB } from "better-auth/adapters/memory";
import * as Layer from "effect/Layer";
import { Database } from "./Database.js";
/**
 * In-memory database layer for Better Auth — tests and throwaway dev
 * only. Data lives in the provided (or an internal) record for the
 * lifetime of the process/isolate; nothing is persisted and there is no
 * migration step (tables are seeded from the resolved auth schema).
 *
 *
 * ### Testing
 * **Example:** Unit-testing auth flows without a database
 * ```typescript
 * import { BetterAuth, Memory } from "@alchemy.run/better-auth";
 *
 * Effect.gen(function* () {
 *   const auth = yield* BetterAuth({
 *     emailAndPassword: { enabled: true },
 *     secret: "test-secret",
 *   });
 *   const signUp = yield* auth.api.signUpEmail({
 *     body: { email: "a@b.co", password: "password1234", name: "A" },
 *   });
 * }).pipe(Effect.provide(Memory()))
 * ```
 *
 * @layer
 * @provides BetterAuth.Database
 * @product Memory
 */
export declare const Memory: (db?: MemoryDB) => Layer.Layer<Database>;
