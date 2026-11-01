import * as Effect from "effect/Effect";
import { type BindingIam, type GcpHttpOp } from "../HttpBinding.js";
import type { ParametersVersion } from "./ParametersVersion.js";
/**
 * Shared HTTP scaffolding for Parameter Manager version bindings.
 * NOT exported from index.ts.
 */
export declare const makeParameterVersionHttpBinding: <I, A, E, Req = void>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
    toInput: (versionName: string, request: Req | undefined) => I;
}) => Effect.Effect<(version: ParametersVersion) => Effect.Effect<(request?: Req | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
