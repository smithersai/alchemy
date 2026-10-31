import type { RuntimeContext } from "alchemy/RuntimeContext";
import * as Effect from "effect/Effect";
import * as Scope from "effect/Scope";
/**
 * Run bounded post-response work with its own scope. Failures are logged.
 * Neon limits waitUntil work to fifteen minutes; this is not a durable job.
 */
export declare const waitUntil: <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<void, never, RuntimeContext | Exclude<R, Scope.Scope>>;
