import type { GcpOpContext } from "@distilled.cloud/gcp/composer_v1";
import type { Output } from "alchemy/Output";
import * as Effect from "effect/Effect";
import { type BindingIam } from "../HttpBinding.js";
import type { Environment } from "./Environment.js";
import type { EnvironmentsUserWorkloadsConfigMap } from "./EnvironmentsUserWorkloadsConfigMap.js";
import type { EnvironmentsUserWorkloadsSecret } from "./EnvironmentsUserWorkloadsSecret.js";
type GcpHttpOp<I, A, E> = Effect.Effect<(input: I) => Effect.Effect<A, E>, never, GcpOpContext> & ((input: I) => Effect.Effect<A, E, GcpOpContext>);
type NamedResource = {
    readonly name: Output<string, never>;
    readonly LogicalId: string;
};
/**
 * Shared HTTP scaffolding for Cloud Composer bindings whose request
 * identifies the resource by a single name path parameter.
 * Distilled ops are OperationMethods: yield them once at Layer
 * construction (after providing Credentials + HttpClient) so the inner
 * runtime Effect is `Effect<A, E>` and does not leak `GcpOpContext`.
 * NOT exported from index.ts.
 */
export declare const makeNamedHttpBinding: <Resource extends NamedResource, I, A, E>(options: {
    tag: string;
    iam: BindingIam;
    nameKey?: string;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(resource: Resource) => Effect.Effect<(request?: object | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
/**
 * Shared HTTP scaffolding for Cloud Composer environment bindings.
 * NOT exported from index.ts.
 */
export declare const makeEnvironmentHttpBinding: <I, A, E>(options: {
    tag: string;
    iam: BindingIam;
    nameKey: string;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(resource: Environment) => Effect.Effect<(request?: object | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
export declare const makeUserWorkloadsConfigMapHttpBinding: <I, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(resource: EnvironmentsUserWorkloadsConfigMap) => Effect.Effect<(request?: object | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
export declare const makeUserWorkloadsSecretHttpBinding: <I, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(resource: EnvironmentsUserWorkloadsSecret) => Effect.Effect<(request?: object | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
export {};
