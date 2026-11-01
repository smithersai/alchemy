import type { Input } from "alchemy/Input";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type * as Duration from "effect/Duration";
import type { Providers } from "../Providers.vibe";
import type { AutoScalingGroup as AutoScalingGroupResource } from "./AutoScalingGroup.js";
declare const ScalingPolicyUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "ScalingPolicyUnexpectedResponse";
} & Readonly<A>;
export declare class ScalingPolicyUnexpectedResponse extends ScalingPolicyUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export type ScalingPolicyName = string;
export interface ScalingPolicyProps {
    /**
     * Policy name. If omitted, a deterministic name is generated.
     */
    policyName?: string;
    /**
     * Auto Scaling Group to attach the policy to.
     */
    autoScalingGroup: Input<string> | AutoScalingGroupResource;
    /**
     * Policy type.
     * @default "TargetTrackingScaling"
     */
    policyType?: "TargetTrackingScaling";
    /**
     * Predefined scaling metric to track.
     */
    predefinedMetricType: "ASGAverageCPUUtilization" | "ASGAverageNetworkIn" | "ASGAverageNetworkOut" | "ALBRequestCountPerTarget";
    /**
     * Desired target value for the metric.
     */
    targetValue: number;
    /**
     * Disable scale-in while target tracking is active.
     */
    disableScaleIn?: boolean;
    /**
     * Estimated warmup time for new instances, e.g. `"5 minutes"` or
     * `Duration.seconds(300)` (whole seconds on the wire).
     */
    estimatedInstanceWarmup?: Duration.Input;
}
export interface ScalingPolicy extends Resource<"AWS.AutoScaling.ScalingPolicy", ScalingPolicyProps, {
    /**
     * ARN of the scaling policy.
     */
    policyArn: string;
    /**
     * Name of the scaling policy.
     */
    policyName: ScalingPolicyName;
    /**
     * Name of the Auto Scaling Group the policy is attached to.
     */
    autoScalingGroupName: string;
    /**
     * Policy type (e.g. `TargetTrackingScaling`).
     */
    policyType: string;
    /**
     * Target value the tracked metric is held at.
     */
    targetValue: number;
    /**
     * Predefined metric being tracked.
     */
    predefinedMetricType: string;
    /**
     * CloudWatch alarms created by EC2 Auto Scaling to drive the policy.
     */
    alarms: string[];
}, never, Providers> {
}
/**
 * A target-tracking scaling policy for an Auto Scaling Group. EC2 Auto
 * Scaling creates and manages the CloudWatch alarms that keep the tracked
 * metric at `targetValue` by adjusting the group's desired capacity.
 * ### Creating a Scaling Policy
 * **Example:** Track average CPU utilization
 * ```typescript
 * import { AutoScalingGroup, ScalingPolicy } from "@alchemy.run/aws/AutoScaling";
 *
 * const group = yield* AutoScalingGroup("Fleet", {
 *   launchTemplate: template,
 *   subnetIds: [subnet.subnetId],
 *   minSize: 1,
 *   maxSize: 4,
 * });
 *
 * const policy = yield* ScalingPolicy("CpuPolicy", {
 *   autoScalingGroup: group,
 *   predefinedMetricType: "ASGAverageCPUUtilization",
 *   targetValue: 60,
 * });
 * ```
 *
 * **Example:** Scale on ALB requests per target without scale-in
 * ```typescript
 * const policy = yield* ScalingPolicy("RequestPolicy", {
 *   autoScalingGroup: group,
 *   predefinedMetricType: "ALBRequestCountPerTarget",
 *   targetValue: 1000,
 *   disableScaleIn: true,
 *   estimatedInstanceWarmup: "3 minutes",
 * });
 * ```
 *
 * @resource
 */
export declare const ScalingPolicy: import("alchemy").ResourceClass<ScalingPolicy>;
export declare const ScalingPolicyProvider: () => import("effect/Layer").Layer<Provider.Provider<ScalingPolicy>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};
