import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import * as Schema from "effect/Schema";
declare const TraceOperationFailed_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "TraceOperationFailed";
} & Readonly<A>;
export declare class TraceOperationFailed extends TraceOperationFailed_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface TraceInput {
    readonly seeds: string[];
    readonly base: string;
    readonly root: string;
    readonly next: boolean;
}
/** Keep dependency-parser heaps outside the long-lived deployment process. */
export declare const traceWebsiteFiles: (input: TraceInput) => Effect.Effect<readonly string[], import("effect/PlatformError").BadArgument | import("effect/PlatformError").PlatformError | Schema.SchemaError | TraceOperationFailed, import("effect/process/ChildProcessSpawner").ChildProcessSpawner | FileSystem.FileSystem | Path.Path>;
export {};
