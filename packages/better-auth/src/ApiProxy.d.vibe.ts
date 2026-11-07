import type { RuntimeContext } from "alchemy";
import * as Effect from "effect/Effect";
import { BetterAuthApiError } from "./Errors.ts";
/**
 * Every `auth.api.*` endpoint mirrored as an Effect: same arguments, same
 * success type, with the thrown `APIError` surfaced as a typed
 * {@link BetterAuthApiError} failure. Non-`APIError` throws become defects.
 *
 * Known (accepted) lossage vs the raw promise API: conditional-type
 * inference collapses overload sets to their last signature, so the
 * `asResponse`/`returnHeaders` return-type refinements degrade on some
 * endpoints. Use the raw `auth` escape hatch for those.
 */
export type BetterAuthApi<Api> = {
    readonly [K in keyof Api]: Api[K] extends (...args: infer Args) => Promise<infer A> ? (...args: Args) => Effect.Effect<A, BetterAuthApiError, RuntimeContext> : never;
};
/**
 * Build the effectified `api` Proxy over the per-execution auth instance.
 *
 * @internal
 */
export declare const makeApiProxy: <A extends {
    api: unknown;
}>(makeAuth: Effect.Effect<A, never, RuntimeContext>) => BetterAuthApi<A["api"]>;
