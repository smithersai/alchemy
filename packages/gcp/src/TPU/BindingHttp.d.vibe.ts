import * as Effect from "effect/Effect";
import { type BindingIam, type GcpHttpOp } from "../HttpBinding.ts";
import type { Node } from "./Node.vibe";
import type { QueuedResource } from "./QueuedResource.vibe";
/**
 * Shared HTTP scaffolding for Cloud TPU node bindings.
 * NOT exported from index.ts.
 */
export declare const makeTpuNodeHttpBinding: <I extends {
    name?: string;
}, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(node: Node) => Effect.Effect<(request?: Omit<I, "name"> | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
/**
 * Shared HTTP scaffolding for Cloud TPU queued resource bindings.
 * NOT exported from index.ts.
 */
export declare const makeTpuQueuedResourceHttpBinding: <I extends {
    name?: string;
}, A, E>(options: {
    tag: string;
    iam: BindingIam;
    operation: GcpHttpOp<I, A, E>;
}) => Effect.Effect<(resource: QueuedResource) => Effect.Effect<(request?: Omit<I, "name"> | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
