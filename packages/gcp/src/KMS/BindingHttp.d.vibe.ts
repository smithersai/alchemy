import * as Effect from "effect/Effect";
import { type BindingIam, type GcpHttpOp } from "../HttpBinding.js";
import type { CryptoKey } from "./CryptoKey.js";
/**
 * Shared HTTP scaffolding for Cloud KMS CryptoKey bindings.
 * NOT exported from index.ts.
 */
export declare const makeCryptoKeyHttpBinding: <I extends {
    name?: string;
}, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(key: CryptoKey) => Effect.Effect<(request?: Omit<I, "name"> | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
