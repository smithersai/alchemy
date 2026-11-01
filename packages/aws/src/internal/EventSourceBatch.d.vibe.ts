import * as Effect from "effect/Effect";
import * as Option from "effect/Option";
import type * as Tracer from "effect/Tracer";
/**
 * Link a producer context carried in a W3C `traceparent` (e.g. an SQS
 * message attribute) to the batch's consumer span.
 */
export declare const traceparentLink: (traceparent: string | undefined) => Option.Option<Tracer.SpanLink>;
/**
 * Wrap one delivered event-source batch in a `process <destination>`
 * CONSUMER span (OTEL messaging semconv) linked to each record's producer
 * context, and log the cause when the handler fails so a whole-batch retry
 * is never silent.
 */
export declare const processBatch: (options: {
    readonly system: string;
    readonly destination: string;
    readonly count: number;
    readonly links?: ReadonlyArray<Tracer.SpanLink>;
}) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>;
