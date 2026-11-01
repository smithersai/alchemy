import { Credentials } from "@distilled.cloud/cloudflare/Credentials";
import type { RuntimeContext } from "alchemy/RuntimeContext";
import * as Effect from "effect/Effect";
import type { HttpClient } from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
/**
 * Resolve credentials from a bound token's value and provide them (plus the
 * fetch-based HTTP client) to a raw SDK operation.
 */
export declare const authorizeWith: (token: {
    value: Effect.Effect<Redacted.Redacted<string>>;
}) => <A, E>(eff: Effect.Effect<A, E, Credentials | HttpClient>) => Effect.Effect<A, E, RuntimeContext>;
