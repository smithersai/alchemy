import * as Effect from "effect/Effect";
import { type BindingIam, type GcpHttpOp } from "../HttpBinding.js";
import type { Service } from "./Service.vibe";
import type { ServicesConnector } from "./ServicesConnector.vibe";
/**
 * Shared HTTP scaffolding for Firebase Data Connect bindings.
 * NOT exported from index.ts.
 */
export declare const makeServiceHttpBinding: <I extends {
    name: string;
}, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(service: Service) => Effect.Effect<(request: Omit<I, "name">) => Effect.Effect<A, E, never>, never, never>, never, never>;
export declare const makeConnectorHttpBinding: <I extends {
    name: string;
}, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(connector: ServicesConnector) => Effect.Effect<(request: Omit<I, "name">) => Effect.Effect<A, E, never>, never, never>, never, never>;
