import * as scheduler from "@distilled.cloud/aws/scheduler";
import type { Input } from "alchemy/Input";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.vibe";
declare const SchedulerScheduleUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "SchedulerScheduleUnexpectedResponse";
} & Readonly<A>;
export declare class SchedulerScheduleUnexpectedResponse extends SchedulerScheduleUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface ScheduleProps {
    /**
     * Schedule name. If omitted, Alchemy generates a deterministic name.
     */
    name?: string;
    /**
     * Optional schedule group. Defaults to the AWS default group.
     */
    groupName?: Input<string>;
    /**
     * Required schedule expression, such as `rate(5 minutes)` or `cron(...)`.
     */
    scheduleExpression: string;
    /**
     * Optional start date.
     */
    startDate?: Date;
    /**
     * Optional end date.
     */
    endDate?: Date;
    /**
     * Optional description.
     */
    description?: string;
    /**
     * Optional timezone for cron or at expressions.
     */
    scheduleExpressionTimezone?: string;
    /**
     * Desired schedule state.
     */
    state?: string;
    /**
     * Optional KMS key ARN.
     */
    kmsKeyArn?: Input<string>;
    /**
     * Scheduler target configuration.
     */
    target: Input<scheduler.Target>;
    /**
     * Flexible time window configuration.
     */
    flexibleTimeWindow?: Input<scheduler.FlexibleTimeWindow>;
    /**
     * Action after a one-time schedule completes.
     */
    actionAfterCompletion?: string;
}
/**
 * An EventBridge Scheduler schedule.
 *
 * `Schedule` is the canonical time-based delivery primitive. High-level helpers
 * like `every`, `cron`, and `at` can synthesize the target role and scheduler
 * target configuration on top of this resource.
 * ### Creating Schedules
 * **Example:** Hourly Schedule
 * ```typescript
 * const schedule = yield* Schedule("HourlyJob", {
 *   scheduleExpression: "rate(1 hour)",
 *   target: {
 *     Arn: fn.functionArn,
 *     RoleArn: role.roleArn,
 *   },
 *   flexibleTimeWindow: {
 *     Mode: "OFF",
 *   },
 * });
 * ```
 *
 * @resource
 */
export interface Schedule extends Resource<"AWS.Scheduler.Schedule", ScheduleProps, {
    /**
     * ARN of the schedule.
     */
    scheduleArn: string;
    /**
     * Name of the schedule.
     */
    scheduleName: string;
    /**
     * Name of the schedule group containing the schedule.
     */
    groupName: string;
    /**
     * Current state of the schedule (`ENABLED` or `DISABLED`).
     */
    state: string | undefined;
    /**
     * The schedule definition (expression, timezone, dates, target,
     * flexible window, KMS key, completion action), as observed. Lets
     * `alchemy drift` detect out-of-band changes.
     */
    configuration?: ScheduleConfiguration;
}, never, Providers> {
}
export declare const Schedule: import("alchemy").ResourceClass<Schedule>;
/** The managed configuration of a schedule, as observed. */
export interface ScheduleConfiguration {
    scheduleExpression?: string;
    scheduleExpressionTimezone?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
    kmsKeyArn?: string;
    target?: scheduler.Target;
    flexibleTimeWindow?: scheduler.FlexibleTimeWindow;
    actionAfterCompletion?: string;
}
export declare const ScheduleProvider: () => import("effect/Layer").Layer<Provider.Provider<Schedule>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};
