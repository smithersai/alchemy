import * as Cause from "effect/Cause";
import * as Exit from "effect/Exit";
import type * as Schema from "effect/Schema";
declare const DefinitionError_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => Cause.YieldableError & {
    readonly _tag: "DefinitionError";
} & Readonly<A>;
/**
 * A domain definition error (duplicate tag, missing `keyOf`, …), raised while
 * the kernel is built, or when a handler returns something its declaration
 * does not allow.
 */
export declare class DefinitionError extends DefinitionError_base<{
    readonly message: string;
}> {
    constructor(message: string);
}
/**
 * The `_tag` a rejection class declares: the literal its schema gives
 * `_tag`, so any tagged error class can be a rejection.
 *
 * @internal
 */
export declare const rejectionTag: (rejection: Schema.Top) => string;
/** What `decide` returned, once its Effect (if any) ran. @internal */
export type Settled = {
    readonly _tag: "Decided";
    readonly decision: unknown;
} | {
    readonly _tag: "Failed";
    readonly cause: Cause.Cause<unknown>;
};
/**
 * Settle an effectful decision. A rejection is a `YieldableError`, so it is
 * an Effect too: running it fails with the rejection itself, which is the
 * decision. Any other failure, such as a defect, stays a failure.
 *
 * @internal
 */
export declare const settle: (exit: Exit.Exit<unknown, unknown>) => Settled;
/** A decision, judged against the command's declaration. @internal */
export type Judged = {
    readonly _tag: "Accepted";
    readonly events: ReadonlyArray<{
        readonly _tag: string;
    }>;
} | {
    readonly _tag: "Rejected";
    readonly rejection: {
        readonly _tag: string;
    };
} | {
    readonly _tag: "Undeclared";
    readonly error: DefinitionError;
};
/**
 * Judge a settled decision: the events to commit, the rejection, or the
 * {@link DefinitionError} for an event or rejection the command does not
 * declare.
 *
 * @internal
 */
export declare const judge: (aggregateName: string, command: {
    readonly tag: string;
    readonly events: ReadonlyArray<{
        readonly tag: string;
    }>;
    readonly rejects: ReadonlyArray<Schema.Top>;
}, decision: unknown) => Judged;
/** The id a ref or a Schema key value addresses. @internal */
export declare const targetId: (target: unknown) => string;
/** One input for a view's evolve. @internal */
export interface LocalViewInput {
    readonly name: string;
    readonly event: {
        readonly _tag: string;
    };
    /** A ref for an aggregate source, the key value for a Schema-keyed view. */
    readonly source: unknown;
    readonly state?: unknown;
    readonly envelope: {
        readonly at: unknown;
    };
    readonly key?: unknown;
}
/**
 * Apply one input to one key of a view, with the view's own `keyOf` and
 * `evolve`, as the kernel applies a delivery: each route whose `keyOf`
 * reaches the key runs its handler. An input that reaches no route of the
 * key leaves the state as it is.
 *
 * @internal
 */
export declare const evolveView: (view: {
    readonly definition: {
        readonly state?: unknown;
        readonly initial?: unknown;
        readonly keyOf?: unknown;
        readonly evolve?: unknown;
    };
}, state: unknown, input: LocalViewInput) => unknown;
export {};
