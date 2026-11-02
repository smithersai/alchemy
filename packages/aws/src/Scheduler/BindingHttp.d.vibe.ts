import type * as scheduler from "@distilled.cloud/aws/scheduler";
import * as Effect from "effect/Effect";
import type { Role } from "../IAM/Role.ts";
import type { ScheduleGroup } from "./ScheduleGroup.vibe";
/**
 * Build the impl Effect for a group-scoped Scheduler operation: the
 * deploy-time half grants `actions` on the group's schedule ARN pattern, and
 * the runtime half injects the group's name as the request's `GroupName`.
 */
export declare const makeScheduleGroupScopedHttpBinding: <I extends {
    GroupName?: string;
}, A, E, R>(options: {
    /** Fully-qualified binding tag, e.g. `AWS.Scheduler.GetSchedule`. */
    tag: string;
    /** The distilled operation; `GroupName` is injected from the bound group. */
    operation: Effect.Effect<(input: I) => Effect.Effect<A, E>, never, R>;
    /** IAM actions granted on the group's schedule ARN pattern. */
    actions: readonly string[];
    /**
     * `GroupName` injected when no group is bound. Get/Delete leave it
     * undefined (the API defaults to the `default` group); ListSchedules pins
     * `"default"` explicitly because an absent `GroupName` there means "all
     * groups".
     */
    fallbackGroupName?: string;
    /**
     * IAM resource scope. `"group"` (default) grants on the bound group's
     * `schedule/{group}/*` pattern. `"all"` grants on `schedule/*​/*` —
     * required for `scheduler:ListSchedules`, which IAM evaluates against the
     * account-wide schedule pattern regardless of the request's `GroupName`
     * filter (AccessDenied cites `schedule/*​/*`).
     */
    resourceScope?: "group" | "all";
}) => Effect.Effect<(group?: ScheduleGroup | undefined) => Effect.Effect<(request?: Omit<I, "GroupName"> | undefined) => Effect.Effect<A, E, never>, never, never>, never, never>;
/**
 * Build the impl Effect for a Scheduler write operation
 * (`CreateSchedule`/`UpdateSchedule`): constructed with the schedule
 * execution role (plus an optional scoping {@link ScheduleGroup}), the
 * deploy-time half grants `actions` on the group's schedule ARN pattern AND
 * `iam:PassRole` on the execution role; the runtime half injects the group's
 * name, defaults `FlexibleTimeWindow` to `{ Mode: "OFF" }`, and defaults the
 * target's `RoleArn` to the bound execution role.
 */
export declare const makeScheduleWriteHttpBinding: <I extends {
    GroupName?: string;
    Target: scheduler.Target;
    FlexibleTimeWindow: scheduler.FlexibleTimeWindow;
}, A, E, R>(options: {
    /** Fully-qualified binding tag, e.g. `AWS.Scheduler.CreateSchedule`. */
    tag: string;
    /** The distilled operation; group, time window, and role are injected. */
    operation: Effect.Effect<(input: I) => Effect.Effect<A, E>, never, R>;
    /** IAM actions granted on the group's schedule ARN pattern. */
    actions: readonly string[];
}) => Effect.Effect<<Ro extends Role>(executionRole: Ro, group?: ScheduleGroup | undefined) => Effect.Effect<(request: Omit<I, "GroupName" | "Target" | "FlexibleTimeWindow"> & {
    Target: Omit<scheduler.Target, "RoleArn"> & {
        RoleArn?: string;
    };
    FlexibleTimeWindow?: scheduler.FlexibleTimeWindow;
}) => Effect.Effect<A, E, never>, never, never>, never, never>;
