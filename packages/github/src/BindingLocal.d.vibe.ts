/**
 * Shared scaffolding for the GitHub `*Local` binding layers: the same
 * operations as `*Http`, authenticated with the provider's current
 * credentials instead of a token bound into a host. Provide them on an
 * `Action` or any deploy-time Effect.
 *
 * NOT exported from `index.ts`.
 */
import * as Effect from "effect/Effect";
import { type Operation } from "./BindingHttp.ts";
import { Credentials } from "./Credentials.vibe";
export declare const make: <Request extends ReadonlyArray<any>, Out, E>(op: Operation<Request, Out, E>) => Effect.Effect<(repo: import("./Repository.ts").Repository) => Effect.Effect<(...args: any[]) => Effect.Effect<Out, E, never>, never, never>, import("@distilled.cloud/github").ConfigError, Credentials>;
