import * as Effect from "effect/Effect";
import { type BindingIam, type GcpHttpOp } from "../HttpBinding.ts";
import type { Model } from "./Model.vibe";
import type { ModelsVersion } from "./ModelsVersion.vibe";
/**
 * Shared HTTP scaffolding for AI Platform (legacy ML Engine) bindings.
 * NOT exported from index.ts.
 */
export declare const makeModelHttpBinding: <I extends {
    name?: string;
}, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(model: Model) => Effect.Effect<(request?: Omit<I, "name"> | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
/**
 * Versions have no IAM policy of their own; `iam.on` (`ml.model`) is
 * granted on the version's parent model.
 */
export declare const makeVersionHttpBinding: <I extends {
    name?: string;
}, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(version: ModelsVersion) => Effect.Effect<(request?: Omit<I, "name"> | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
