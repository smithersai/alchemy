import * as cloudwatch from "@distilled.cloud/aws/cloudwatch";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { AWSEnvironment, type AccountID } from "../Environment.ts";
import type { Providers } from "../Providers.ts";
import type { RegionID } from "../Region.ts";
declare const AlarmUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "AlarmUnexpectedResponse";
} & Readonly<A>;
export declare class AlarmUnexpectedResponse extends AlarmUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export type AlarmName = string;
export type AlarmArn = `arn:aws:cloudwatch:${RegionID}:${AccountID}:alarm:${string}`;
export type AlarmStateValue = cloudwatch.StateValue;
export interface AlarmProps extends Omit<cloudwatch.PutMetricAlarmInput, "AlarmName" | "Tags"> {
    /**
     * Name of the alarm. If omitted, a unique name is generated.
     */
    name?: AlarmName;
    /**
     * Optional tags to apply to the alarm.
     */
    tags?: Record<string, string>;
}
export interface Alarm extends Resource<"AWS.CloudWatch.Alarm", AlarmProps, {
    /** Physical name of the alarm. */
    alarmName: AlarmName;
    /** ARN of the alarm. */
    alarmArn: AlarmArn;
    /** Current state of the alarm (`OK`, `ALARM`, or `INSUFFICIENT_DATA`). */
    stateValue: AlarmStateValue | undefined;
    /** Human-readable reason for the current state. */
    stateReason: string | undefined;
    /** The full MetricAlarm description as last read from CloudWatch. */
    metricAlarm: cloudwatch.MetricAlarm;
    /** Tags on the alarm, including the internal Alchemy ownership tags. */
    tags: Record<string, string>;
}, never, Providers> {
}
/**
 * A CloudWatch metric alarm — watches a single metric (or metric-math
 * expression) and transitions between `OK`, `ALARM`, and
 * `INSUFFICIENT_DATA`, optionally firing actions on state change.
 * ### Creating Alarms
 * **Example:** Threshold Alarm
 * ```typescript
 * const alarm = yield* Alarm("HighErrors", {
 *   MetricName: "Errors",
 *   Namespace: "AWS/Lambda",
 *   Statistic: "Sum",
 *   Period: 60,
 *   EvaluationPeriods: 1,
 *   Threshold: 1,
 *   ComparisonOperator: "GreaterThanOrEqualToThreshold",
 * });
 * ```
 *
 * **Example:** Alarm on a Lambda Function's Errors
 * ```typescript
 * const fn = yield* MyFunction;
 *
 * const alarm = yield* Alarm("FnErrors", {
 *   MetricName: "Errors",
 *   Namespace: "AWS/Lambda",
 *   Dimensions: [{ Name: "FunctionName", Value: fn.functionName }],
 *   Statistic: "Sum",
 *   Period: 60,
 *   EvaluationPeriods: 1,
 *   Threshold: 1,
 *   ComparisonOperator: "GreaterThanOrEqualToThreshold",
 *   TreatMissingData: "notBreaching",
 * });
 * ```
 *
 * ### Reading Alarm State at Runtime
 * **Example:** Read the Alarm's State from a Function
 * ```typescript
 * // init — bind the alarm to the function (see DescribeAlarms)
 * const describeAlarms = yield* AWS.CloudWatch.DescribeAlarms(alarm);
 *
 * // runtime
 * const result = yield* describeAlarms();
 * const state = result.MetricAlarms?.[0]?.StateValue;
 * ```
 *
 * @resource
 */
export declare const Alarm: import("alchemy").ResourceClass<Alarm>;
export declare const AlarmProvider: () => import("effect/Layer").Layer<Provider.Provider<Alarm>, never, AWSEnvironment | import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};
