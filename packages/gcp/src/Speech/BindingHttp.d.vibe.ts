import * as Effect from "effect/Effect";
import { type BindingIam, type GcpHttpOp } from "../HttpBinding.js";
import type { CustomClass } from "./CustomClass.vibe";
import type { PhraseSet } from "./PhraseSet.vibe";
/**
 * Shared HTTP scaffolding for Speech-to-Text bindings.
 * NOT exported from index.ts.
 */
export declare const makeCustomClassHttpBinding: <I, A, E, Req = void>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
    toInput: (name: string, request: Req | undefined) => I;
}) => Effect.Effect<(resource: CustomClass) => Effect.Effect<(request?: Req | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
export declare const makePhraseSetHttpBinding: <I, A, E, Req = void>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
    toInput: (name: string, request: Req | undefined) => I;
}) => Effect.Effect<(resource: PhraseSet) => Effect.Effect<(request?: Req | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
