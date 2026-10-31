import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Metric from "effect/Metric";
import * as Schema from "effect/Schema";
import * as Tracer from "effect/Tracer";
/**
 * Span attributes a declaration adds for its values: a command's input, an
 * event, a rejection. Nothing from a payload is recorded unless you return
 * it here, and a `Redacted` value you return is recorded as `<redacted>`.
 */
export type Attributes<V> = (value: V) => Readonly<Record<string, unknown>>;
/**
 * How a hosted model records telemetry. Tuning, not meaning, so it lives on
 * the Layer: `Bank.layer(handlers, { telemetry: { views: false } })`.
 */
export interface Options {
    /**
     * Trace every view applying an event. Views apply every event they fold,
     * so this is the busiest span.
     * @default true
     */
    readonly views?: boolean;
}
/** @internal */
export interface Resolved {
    readonly views: boolean;
}
/** @internal */
export declare const resolve: (options: Options | undefined) => Resolved;
/** A span's identity, stored with what it caused so later work can continue or link to it. @internal */
export declare const TraceJson: Schema.Struct<{
    readonly traceId: Schema.String;
    readonly spanId: Schema.String;
    readonly sampled: Schema.Boolean;
}>;
export type TraceJson = typeof TraceJson.Type;
/** The current span, as JSON, if any. @internal */
export declare const currentTrace: Effect.Effect<TraceJson | undefined>;
/** A stored trace, as a parent or link target. @internal */
export declare const spanOf: (trace: TraceJson) => Tracer.ExternalSpan;
declare const Correlation_base: Context.ServiceClass<Correlation, "alchemy/Domain/Correlation", {
    readonly id: string;
}>;
/**
 * The flow work belongs to: the id of the first command in a chain of
 * commands, events and reactions. Policies and sagas provide it, so every
 * command they send carries it on.
 *
 * @internal
 */
export declare class Correlation extends Correlation_base {
}
/** The correlation id for a new command: the one it was caused by, else its own id. @internal */
export declare const correlationFor: (commandId: string) => Effect.Effect<string>;
/**
 * The attributes a declaration adds for one of its values, if it declares
 * `attributes`. Values are flattened, capped, and `Redacted` values hidden.
 *
 * @internal
 */
export declare const attributesOf: (cls: unknown, value: unknown) => Record<string, unknown>;
/** Commands handled, by `domain.aggregate`, `domain.command` and `domain.outcome`. */
export declare const commands: Metric.Counter<number>;
/** How long an aggregate took to decide and commit a command, in milliseconds. */
export declare const commandDuration: Metric.Histogram<number>;
/** Events committed, by `domain.aggregate` and `domain.event`. */
export declare const events: Metric.Counter<number>;
/** Milliseconds from an event's commit to a reaction handling it, by `domain.consumer`. */
export declare const lag: Metric.Histogram<number>;
/** Reaction runs, by `domain.kind`, `domain.consumer` and `domain.outcome`. */
export declare const runs: Metric.Counter<number>;
/** Inputs per projection batch. */
export declare const batchSize: Metric.Histogram<number>;
/** External system calls, by `domain.system`, `domain.operation` and `domain.outcome`. */
export declare const externalCalls: Metric.Counter<number>;
/** @internal */
export declare const record: <M extends Metric.Metric<number, any>>(metric: M, attributes: Record<string, string>, value?: number) => Effect.Effect<void, never, never>;
/** The outcome of an exit, for metrics and spans: ok, the failure's tag, or defect. @internal */
export declare const outcomeOf: (failure: unknown) => string;
export {};
