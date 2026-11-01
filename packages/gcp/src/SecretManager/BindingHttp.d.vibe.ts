import * as Effect from "effect/Effect";
import { type BindingIam, type GcpHttpOp } from "../HttpBinding.js";
import type { LocationsSecret } from "./LocationsSecret.vibe";
import type { Secret } from "./Secret.js";
export type SecretBindingTarget = Secret | LocationsSecret;
/**
 * Shared HTTP scaffolding for Secret Manager bindings.
 * NOT exported from index.ts.
 */
export declare const makeSecretHttpBinding: <I, A, E, Req = void>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
    toInput: (secretName: string, request: Req | undefined) => I;
}) => Effect.Effect<(secret: SecretBindingTarget) => Effect.Effect<(request?: Req | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
