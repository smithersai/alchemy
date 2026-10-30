import * as Cause from "effect/Cause";
import * as Context from "effect/Context";
import * as DateTime from "effect/DateTime";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as Layer from "effect/Layer";
import * as Schema from "effect/Schema";
import type { DurableDeferred, WorkflowEngine } from "effect/workflow";
import * as Aggregate from "./Aggregate.js";
import type * as Command from "./Command.vibe";
import * as ExternalSystem from "./ExternalSystem.js";
import type * as Key from "./Key.js";
import * as Model from "./Model.js";
import type * as Saga from "./Saga.vibe";
import type * as DomainStream from "./Stream.vibe";
import type * as View from "./View.vibe";
/** How far a story got with one step. */
export interface StepReport {
    /** The step's number, from 1. */
    readonly step: number;
    /** The step's kind: `Given`, `When`, `Then`, ... */
    readonly kind: Step["_tag"];
    readonly status: "passed" | "failed" | "not-run";
    /** A one-line summary of the step. Redacted values print as `<redacted>`. */
    readonly summary: string;
}
declare const StoryFailure_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => Cause.YieldableError & {
    readonly _tag: "StoryFailure";
} & Readonly<A>;
/**
 * A failed story expectation. `message` starts with `reason`, then lists every
 * step (✓ passed, ✗ failed, blank: not run) and the events each touched
 * aggregate committed so far.
 */
export declare class StoryFailure extends StoryFailure_base<{
    /** The step that failed (the last step for a failure at the end of the story). */
    readonly step: number;
    readonly message: string;
    /** Why the story failed, without the step list. */
    readonly reason: string;
    readonly steps: ReadonlyArray<StepReport>;
    /** The tags of the events committed so far, per touched aggregate (`Aggregate/id`). */
    readonly events: Readonly<Record<string, ReadonlyArray<string>>>;
}> {
}
/** Marker for "the view key does not exist". */
declare const none: unique symbol;
/**
 * One step of a story. Build steps with the step constructors in this module.
 */
export type Step = {
    readonly _tag: "Given";
    readonly ref: Aggregate.Ref;
    readonly events: ReadonlyArray<{
        readonly _tag: string;
    }>;
} | {
    readonly _tag: "When";
    readonly ref: Aggregate.Ref;
    readonly command: {
        readonly _tag: string;
    };
    readonly commandId?: string;
} | {
    readonly _tag: "Then";
    readonly ref: Aggregate.Ref;
    readonly events: ReadonlyArray<{
        readonly _tag: string;
    }>;
} | {
    readonly _tag: "Rejected";
    readonly rejection: {
        readonly _tag: string;
    };
} | {
    readonly _tag: "Replied";
    readonly reply: unknown;
} | {
    readonly _tag: "State";
    readonly ref: Aggregate.Ref;
    readonly expected: unknown;
} | {
    readonly _tag: "View";
    readonly view: View.Any;
    /** A ref, or the value of a Schema key. */
    readonly key: Key.RefOf<Key.Any>;
    readonly expected: unknown;
} | {
    readonly _tag: "Emitted";
    readonly view: View.Any;
    /** A ref, or the value of a Schema key. */
    readonly key: Key.RefOf<Key.Any>;
    readonly expected: unknown;
} | {
    readonly _tag: "Streamed";
    readonly stream: DomainStream.Any;
    /** A ref, or the value of a Schema key. */
    readonly key: Key.RefOf<Key.Any>;
    readonly events: ReadonlyArray<{
        readonly _tag: string;
    }>;
} | {
    readonly _tag: "Call";
    readonly tag: string | undefined;
    readonly op: ExternalSystem.Op;
    readonly args: unknown;
} | {
    readonly _tag: "Answer";
    readonly tag: string | undefined;
    readonly op: ExternalSystem.Op;
    readonly exit: Exit.Exit<unknown, unknown>;
} | {
    readonly _tag: "Returned";
    readonly tag: string | undefined;
    readonly op: ExternalSystem.Op;
    readonly expected: {
        readonly _tag: "Success";
        readonly value: unknown;
    } | {
        readonly _tag: "Failure";
        readonly error: unknown;
    } | {
        readonly _tag: "Died";
    };
} | {
    readonly _tag: "Clock";
    readonly at: string | number | DateTime.DateTime;
} | {
    readonly _tag: "Advance";
    readonly by: Duration.Input;
} | {
    readonly _tag: "Signal";
    readonly saga: Saga.Any;
    readonly key: unknown;
    readonly deferred: DurableDeferred.Any;
    readonly value: unknown;
} | {
    readonly _tag: "Saga";
    readonly saga: Saga.Any;
    readonly key: unknown;
    readonly expected: Saga.Status<unknown, unknown> | {
        readonly _tag: "Died";
    };
} | {
    readonly _tag: "Provide";
    readonly service: Context.Key<unknown, unknown>;
    readonly value: unknown;
};
/** The step with this `_tag`. */
export type StepOf<Tag extends Step["_tag"]> = Extract<Step, {
    readonly _tag: Tag;
}>;
/**
 * A `when` step. Its type carries the command's class, so the steps after it
 * are checked against what the command declares.
 */
export interface WhenStep<C = unknown> extends StepOf<"When"> {
    readonly "~command"?: C;
}
/** A `rejected` step; its type carries the rejection. */
export interface RejectedStep<R = unknown> extends StepOf<"Rejected"> {
    readonly "~rejection"?: R;
}
/** A `replied` step; its type carries the reply. */
export interface RepliedStep<A = unknown> extends StepOf<"Replied"> {
    readonly "~reply"?: A;
}
/** A `provide` step; its type carries the service it provides. */
export interface ProvideStep<I = unknown> extends StepOf<"Provide"> {
    readonly "~provides"?: I;
}
type CommandClassOf<A extends Aggregate.Any, Cmd> = Extract<A["definition"]["commands"][number], {
    readonly tag: Cmd extends {
        readonly _tag: infer T;
    } ? T : never;
}>;
type RejectionOf<C extends Command.Any> = Aggregate.InstanceOf<C["rejects"][number]>;
type ReplyOf<C extends Command.Any> = C["reply"] extends Schema.Top ? C["reply"]["Type"] : void;
type NameOf<X, Key extends string, Fallback extends string> = X extends {
    readonly [K in Key]: infer N extends string;
} ? N : Fallback;
/** What a `when` step must be: an error message when a service it needs is not provided yet. */
type CheckWhen<H, K extends Command.Any, P> = [Exclude<Command.ContextOf<K>, P>] extends [never] ? H : `${K["tag"]} needs Story.provide(${NameOf<Exclude<Command.ContextOf<K>, P>, "key", "its service">}) before it`;
/** What a `rejected` step must be: an error message when the last command does not declare it. */
type CheckRejected<H, R, C> = C extends Command.Any ? [R] extends [RejectionOf<C>] ? H : `${C["tag"]} does not reject with ${NameOf<R, "_tag", "this rejection">}` : H;
/** What a `replied` step must be: the last command's reply, or an error message when it declares none. */
type CheckReplied<H, A, C> = C extends Command.Any ? [A] extends [ReplyOf<C>] ? H : C["reply"] extends Schema.Top ? RepliedStep<ReplyOf<C>> : `${C["tag"]} declares no reply` : H;
/**
 * The steps of a story, checked in order: a `rejected` step takes only a
 * rejection the last `when` command declares, a `replied` step only its reply
 * type, and a `when` needs a `provide` step before it for every service its
 * command's middleware provides. A failing step is replaced by a message
 * saying what is wrong, so the type error names it. A step typed as plain
 * {@link Step} turns the checks off until the next `when`, since it may be any
 * step.
 */
export type Checked<S extends ReadonlyArray<Step>, C = unknown, P = never, Out extends ReadonlyArray<unknown> = []> = S extends readonly [infer H extends Step, ...infer T extends ReadonlyArray<Step>] ? [H] extends [WhenStep<infer K>] ? K extends Command.Any ? Checked<T, K, P, [...Out, CheckWhen<H, K, P>]> : Checked<T, unknown, P, [...Out, H]> : [H] extends [ProvideStep<infer I>] ? Checked<T, C, P | I, [...Out, H]> : [H] extends [RejectedStep<infer R>] ? Checked<T, C, P, [...Out, CheckRejected<H, R, C>]> : [H] extends [RepliedStep<infer A>] ? Checked<T, C, P, [...Out, CheckReplied<H, A, C>]> : [Step] extends [H] ? Checked<T, unknown, any, [...Out, H]> : Checked<T, C, P, [...Out, H]> : [...Out, ...S];
/** History: events already committed on a stream before the story starts. */
declare const given: <A extends Aggregate.Any>(ref: Aggregate.Ref<A>, ...events: ReadonlyArray<Aggregate.EventOf<A>>) => StepOf<"Given">;
/** Send a command. Its policies run until they finish or suspend on an external system call. */
declare const when: <A extends Aggregate.Any, Cmd extends Aggregate.CommandOf<A>>(ref: Aggregate.Ref<A>, command: Cmd, options?: {
    readonly commandId?: string;
}) => WhenStep<CommandClassOf<A, Cmd>>;
/** The next events committed on a stream. With no events: nothing new was committed. */
declare const then: <A extends Aggregate.Any>(ref: Aggregate.Ref<A>, ...events: ReadonlyArray<Aggregate.EventOf<A>>) => StepOf<"Then">;
/**
 * The last command was rejected with exactly this rejection. It must be one
 * the last `when` command declares in `rejects`.
 */
declare const rejected: <R extends {
    readonly _tag: string;
}>(rejection: R) => RejectedStep<R>;
/** The last command's reply, of the type the last `when` command declares. */
declare const replied: <A>(reply: A) => RepliedStep<A>;
/** Assert on an aggregate instance's current state: an expected (partial) state, or a function. */
declare const state: <A extends Aggregate.Any>(ref: Aggregate.Ref<A>, expected: Partial<Aggregate.StateOf<A>> | ((state: Aggregate.StateOf<A>) => void)) => StepOf<"State">;
/** Assert on a view key: an expected (partial) state, a function, or {@link none}. */
declare const view: <V extends View.Any>(view: V, key: Key.RefOf<View.KeyOf<V>>, expected: Partial<View.StateOf<V>> | ((state: View.StateOf<V>) => void) | typeof none) => StepOf<"View">;
/**
 * Assert on every event a view key has emitted: the expected (partial) events
 * in order, or a function over the entries (each event with the state after it).
 */
declare const emitted: <V extends View.Any>(view: V, key: Key.RefOf<View.KeyOf<V>>, expected: ReadonlyArray<Partial<View.EventOf<V>>> | ((entries: ReadonlyArray<View.Entry<View.StateOf<V>, View.EventOf<V>>>) => void)) => StepOf<"Emitted">;
/**
 * The next entries appended to a stream key (by its projection). With no
 * events: nothing new was appended.
 */
declare const streamed: <S extends DomainStream.Any>(stream: S, key: Key.RefOf<DomainStream.KeyOf<S>>, ...events: ReadonlyArray<DomainStream.EventOf<S>>) => StepOf<"Streamed">;
/** Move the clock: later commands are stamped with it, and scheduled commands now due fire. */
declare const clock: (at: string | number | DateTime.DateTime) => StepOf<"Clock">;
/** Move the clock forward by a duration, like `"1 day"`: the same as `clock` at the current time plus `by`. */
declare const advance: (by: Duration.Input) => StepOf<"Advance">;
type SagaClientOf<S> = S extends Context.Key<any, infer C> ? C : never;
type SagaKeyOf<S> = SagaClientOf<S> extends Saga.Client<infer K, any, any, any> ? K | {
    readonly id: K;
} : never;
type SagaStatusOf<S> = SagaClientOf<S> extends Saga.Client<any, any, infer A, infer E> ? Saga.Status<A, E> : never;
/** Complete a `DurableDeferred` a saga run waits on, then let it run. */
declare const signal: <S extends Saga.Any, Success extends Schema.Constraint>(saga: S, key: SagaKeyOf<S>, deferred: DurableDeferred.DurableDeferred<Success, any>, value: Success["Type"]) => StepOf<"Signal">;
/**
 * Check where a saga run is: running, completed with a result, rejected,
 * interrupted, or died. `{ _tag: "Died" }` matches any defect; with a
 * `defect`, it must read the same.
 */
declare const saga: <S extends Saga.Any>(saga: S, key: SagaKeyOf<S>, expected: SagaStatusOf<S> | {
    readonly _tag: "Died";
}) => StepOf<"Saga">;
/**
 * Provide a service to subsequent commands, as their middleware would (for
 * example the current actor). Replaces any earlier value of the same service.
 */
declare const provide: <I, S>(service: Context.Key<I, S>, value: S) => ProvideStep<I>;
/** Options for {@link make}. */
interface StoryOptions<Policies, LE, LR, Systems> {
    /** The policies' and projections' Layers. Required when the model has either. */
    readonly layer?: Layer.Layer<Policies, LE, LR>;
    /**
     * External systems to fake. Each call to one waits until the story answers it
     * with `succeed`, `fail` or `die`. Systems not listed are called for real,
     * through the Layers you provide to the story, and the story asserts what
     * each call returned with `returned`, `failed` or `died`.
     */
    readonly stub?: ReadonlyArray<Systems>;
}
declare const make: <Name extends string, Provided, Policies, LE = never, LR = never, Systems extends ExternalSystem.Any = never>(domain: Model.ModelClass<Name, Provided, Policies>, ...[options]: [Policies] extends [never] ? [options?: StoryOptions<Policies, LE, LR, Systems>] : [options: StoryOptions<Policies, LE, LR, Systems> & {
    readonly layer: unknown;
}]) => <const S extends ReadonlyArray<Step>>(...steps: S & Checked<S>) => Effect.Effect<void, StoryFailure | LE, Exclude<LR, Provided | ExternalSystem.Identifier<Systems> | WorkflowEngine.WorkflowEngine>>;
/**
 * Given / when / then specifications of a domain model, run against the real
 * model in memory: policies run for real, calls to stubbed external systems
 * wait until you answer them, calls to the others run through their adapters
 * while the story records them, and a clock you control stamps commands and
 * fires scheduled ones. A story fails on any committed event, rejection,
 * external system call or saga defect it doesn't account for.
 *
 * ### Writing a story
 * **Example:** A withdrawal and an overdraft
 * ```typescript
 * import { it } from "@effect/vitest";
 * import { Story } from "@alchemy.run/domain/Story";
 * import { Account, InsufficientFunds, MoneyDeposited, MoneyWithdrawn, WithdrawMoney } from "../src/Account.ts";
 * import { Bank, BankPolicies } from "../src/Bank.ts";
 *
 * const story = Story.make(Bank, { layer: BankPolicies });
 * const account = Account.ref("a-1");
 *
 * it.effect("withdraws within the balance, and refuses beyond it", () =>
 *   story(
 *     Story.given(account, new MoneyDeposited({ amount: 100, balanceAfter: 100 })),
 *     Story.when(account, new WithdrawMoney({ amount: 30 })),
 *     Story.then(account, new MoneyWithdrawn({ amount: 30, balanceAfter: 70 })),
 *     Story.replied({ balance: 70 }),
 *     Story.when(account, new WithdrawMoney({ amount: 100 })),
 *     Story.rejected(new InsufficientFunds({ balance: 70, requested: 100 })),
 *   ),
 * );
 * ```
 *
 * ### External systems and the clock
 * **Example:** Answer an external system call, then move the clock
 * ```typescript
 * Story.call(FraudCheck.score, { accountId: account.id, amount: 60_000 }),
 * Story.succeed(FraudCheck.score, { risk: 0.95 }),
 * Story.clock("2026-01-02T09:00:00Z"),
 * Story.advance("1 day"),
 * ```
 *
 * **Example:** Name calls when several are waiting
 * ```typescript
 * Story.call("a-1", FraudCheck.score, { accountId: a1.id }),
 * Story.call("a-2", FraudCheck.score, { accountId: a2.id }),
 * Story.succeed("a-2", FraudCheck.score, { risk: 0.1 }),
 * Story.succeed("a-1", FraudCheck.score, { risk: 0.95 }),
 * ```
 *
 * **Example:** Assert a real call to a system that is not stubbed
 * ```typescript
 * const story = Story.make(Bank, { layer: BankHandlers, stub: [FraudCheck] });
 *
 * story(
 *   Story.when(account, new RecordSettlement({ settlementId: "st_1", amount: 500 })),
 *   Story.call(Payments.refund, { settlementId: "st_1", amount: 500 }),
 *   Story.returned(Payments.refund, { refundId: "re_st_1" }),
 * ).pipe(Effect.provide(StripePayments));
 * ```
 *
 * **Example:** Fail a call with the operation's declared error, or a defect
 * ```typescript
 * Story.call(LockVendor.deleteCode, { codeId: "pc_1" }),
 * Story.fail(LockVendor.deleteCode, new LockVendorRefused({ reason: "gateway-lost" })),
 * Story.call(LockVendor.deleteCode, { codeId: "pc_2" }),
 * Story.die(LockVendor.deleteCode, new Error("socket closed")),
 * ```
 *
 * ### Sagas
 * **Example:** Check where a saga run is, and send it a signal
 * ```typescript
 * Story.saga(ExecuteTransfer, transfer, { _tag: "Running" }),
 * Story.signal(ExecuteTransfer, transfer, Decision, "approved"),
 * ```
 *
 * @primitive
 */
export declare const Story: {
    readonly make: typeof make;
    readonly given: typeof given;
    readonly when: typeof when;
    readonly then: typeof then;
    readonly rejected: typeof rejected;
    readonly replied: typeof replied;
    readonly state: typeof state;
    readonly view: typeof view;
    readonly emitted: typeof emitted;
    readonly streamed: typeof streamed;
    readonly call: {
        <Args>(op: ExternalSystem.Op<Args, any>, args: Partial<Args>): StepOf<"Call">;
        <Args>(tag: string, op: ExternalSystem.Op<Args, any>, args: Partial<Args>): StepOf<"Call">;
    };
    readonly succeed: {
        <Success>(op: ExternalSystem.Op<any, Success>, value: Success): StepOf<"Answer">;
        <Success>(tag: string, op: ExternalSystem.Op<any, Success>, value: Success): StepOf<"Answer">;
    };
    readonly fail: {
        <Error>(op: ExternalSystem.Op<any, any, Error>, error: NoInfer<Error>): StepOf<"Answer">;
        <Error>(tag: string, op: ExternalSystem.Op<any, any, Error>, error: NoInfer<Error>): StepOf<"Answer">;
    };
    readonly die: {
        (op: ExternalSystem.Op, defect: unknown): StepOf<"Answer">;
        (tag: string, op: ExternalSystem.Op, defect: unknown): StepOf<"Answer">;
    };
    readonly returned: {
        <Success>(op: ExternalSystem.Op<any, Success>, value: Success): StepOf<"Returned">;
        <Success>(tag: string, op: ExternalSystem.Op<any, Success>, value: Success): StepOf<"Returned">;
    };
    readonly failed: {
        <Error>(op: ExternalSystem.Op<any, any, Error>, error: NoInfer<Error>): StepOf<"Returned">;
        <Error>(tag: string, op: ExternalSystem.Op<any, any, Error>, error: NoInfer<Error>): StepOf<"Returned">;
    };
    readonly died: {
        (op: ExternalSystem.Op): StepOf<"Returned">;
        (tag: string, op: ExternalSystem.Op): StepOf<"Returned">;
    };
    readonly clock: typeof clock;
    readonly advance: typeof advance;
    readonly provide: typeof provide;
    readonly signal: typeof signal;
    readonly saga: typeof saga;
    /** Marker for "the view key does not exist". */
    readonly none: typeof none;
};
export {};
