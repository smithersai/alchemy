import type * as Output from "alchemy/Output";
import { RuntimeContext } from "alchemy/RuntimeContext";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
/**
 * Env key carrying one field of a Neon resource into the host runtime.
 * Uppercase, so every host stores it verbatim (Prisma Compute uppercases
 * keys) and the runtime readers find it under the same name.
 */
export declare const backendEnvKey: (id: string, field: string) => string;
type EnvValue = string | Redacted.Redacted<string>;
/**
 * Carry `env` into the hosting Function/Worker through its RuntimeContext:
 * env vars on Neon Functions, Lambda, Containers and Prisma Compute,
 * `plain_text`/`secret_text` bindings on Workers. Any Platform host works;
 * `Redacted` values stay secret. Read the values back at runtime with
 * {@link backendString} / {@link backendSecret}.
 */
export declare const bindBackendEnvironment: (id: string, env: Record<string, Output.Output<EnvValue>>) => Effect.Effect<undefined, never, never>;
export declare const backendString: (key: string) => Effect.Effect<string, never, RuntimeContext>;
export declare const backendSecret: (key: string) => Effect.Effect<Redacted.Redacted<string>, never, RuntimeContext>;
export {};
