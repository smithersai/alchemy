import * as Effect from "effect/Effect";
import { type BindingIam, type GcpHttpOp } from "../HttpBinding.js";
import type { Instance } from "./Instance.js";
/**
 * Shared HTTP scaffolding for Memorystore Memcached instance bindings.
 * NOT exported from index.ts.
 */
export declare const makeMemcacheInstanceHttpBinding: <I extends {
    name?: string;
}, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(instance: Instance) => Effect.Effect<(request?: Omit<I, "name"> | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
