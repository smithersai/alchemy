import * as Effect from "effect/Effect";
/**
 * Log one line a framework child process wrote as an `output` record: the
 * line as written, with the stream as an annotation. The key matches
 * alchemy's `LogRecord` annotation, so the process that renders logs tags
 * the resource the surrounding lifecycle operation annotated.
 */
export declare const logChildOutput: (line: string, stream: "stdout" | "stderr") => Effect.Effect<void, never, never>;
/**
 * Line-buffered {@link logChildOutput} for output that arrives in chunks
 * outside an Effect (Node stream listeners). Logs through the services of
 * the Effect that created it.
 */
export declare const makeChildOutput: Effect.Effect<{
    stdout: {
        push(chunk: string): void;
        flush(): void;
    };
    stderr: {
        push(chunk: string): void;
        flush(): void;
    };
}, never, never>;
