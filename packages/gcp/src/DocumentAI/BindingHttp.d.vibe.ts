import type { GcpOpContext } from "@distilled.cloud/gcp/documentai_v1";
import * as Effect from "effect/Effect";
import { type BindingIam } from "../HttpBinding.js";
import type { Processor } from "./Processor.js";
import type { Schema } from "./Schema.js";
import type { SchemasSchemaVersion } from "./SchemasSchemaVersion.js";
/**
 * Distilled ops are OperationMethods: yield them once at Layer construction
 * (after providing Credentials + HttpClient) so the inner runtime Effect is
 * `Effect<A, E>` and does not leak `GcpOpContext`.
 */
type GcpHttpOp<I, A, E> = Effect.Effect<((input: I) => Effect.Effect<A, E>), never, GcpOpContext> & ((input: I) => Effect.Effect<A, E, GcpOpContext>);
/**
 * Shared HTTP scaffolding for Document AI bindings.
 * NOT exported from index.ts.
 */
export declare const makeProcessorHttpBinding: <I extends {
    name: string;
}, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(resource: Processor) => Effect.Effect<(request?: Omit<I, "name"> | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
export declare const makeSchemaHttpBinding: <I extends {
    name: string;
}, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(resource: Schema) => Effect.Effect<(request?: Omit<I, "name"> | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
export declare const makeSchemaVersionHttpBinding: <I extends {
    name: string;
}, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(resource: SchemasSchemaVersion) => Effect.Effect<(request?: Omit<I, "name"> | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
export {};
