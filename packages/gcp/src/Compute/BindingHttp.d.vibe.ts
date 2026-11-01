import * as Effect from "effect/Effect";
import { type BindingIam, type GcpHttpOp } from "../HttpBinding.js";
import type { Instance } from "./Instance.vibe";
/**
 * Shared HTTP scaffolding for Compute Engine instance bindings.
 * NOT exported from index.ts.
 */
export declare const makeInstanceHttpBinding: <I extends {
    instance?: string;
    zone?: string;
    project?: string;
}, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(instance: Instance) => Effect.Effect<(request?: Omit<I, "instance" | "zone" | "project"> | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
