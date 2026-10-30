import * as Effect from "effect/Effect";
import { WorkflowEngine } from "effect/workflow";
/**
 * What the in-memory platform gives its workflow engine: its clock, its work
 * queue, and its timers. Runs and clocks go through these, so a story's
 * `drain` runs sagas to where they wait, and moving its clock fires their sleeps.
 */
export interface Host {
    readonly now: () => number;
    /** Queue a run; it runs in the background, counted as running until it finishes. */
    readonly enqueue: (run: Effect.Effect<void>) => Effect.Effect<void>;
    /** Fire `fire` at `at` on the platform's clock; scheduling the same key again replaces it. */
    readonly timer: (key: string, at: number, fire: Effect.Effect<void>) => Effect.Effect<void>;
    /** Record a run that failed, so a story can report it. */
    readonly failed: (cause: unknown) => void;
    /** Record a run that ended with a defect, so a story can report it. */
    readonly died: (workflow: string, executionId: string, defect: unknown) => void;
}
/**
 * A `WorkflowEngine` that keeps every execution's journal in memory and runs
 * on the in-memory platform. Like the Durable Object engine, a run replays the
 * workflow from the top and stops where it waits; the next wake-up runs it again.
 */
export declare const make: (host: Host) => WorkflowEngine.WorkflowEngine["Service"];
