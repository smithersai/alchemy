import * as Effect from "effect/Effect";
import { type BindingIam, type GcpHttpOp } from "../HttpBinding.js";
import type { CatalogsServingConfig } from "./CatalogsServingConfig.js";
/**
 * Shared HTTP scaffolding for Retail serving-config bindings.
 * NOT exported from index.ts.
 */
export declare const makeServingConfigHttpBinding: <I extends {
    placement: string;
}, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(servingConfig: CatalogsServingConfig) => Effect.Effect<(request: Omit<I, "placement">) => Effect.Effect<A, E, never>, never, never>, never, never>;
