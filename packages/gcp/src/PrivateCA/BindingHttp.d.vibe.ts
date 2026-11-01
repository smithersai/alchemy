import * as Effect from "effect/Effect";
import { type BindingIam, type GcpHttpOp } from "../HttpBinding.js";
import type { CertificateAuthority } from "./CertificateAuthority.js";
/**
 * Shared HTTP scaffolding for Certificate Authority Service bindings.
 * NOT exported from index.ts.
 */
export declare const makeCertificateAuthorityHttpBinding: <I extends {
    name?: string;
}, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(ca: CertificateAuthority) => Effect.Effect<(request?: Omit<I, "name"> | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
