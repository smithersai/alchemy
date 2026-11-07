import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.ts";
declare const ScheduleGroupConflict_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "ScheduleGroupConflict";
} & Readonly<A>;
export declare class ScheduleGroupConflict extends ScheduleGroupConflict_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
declare const ScheduleGroupUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "ScheduleGroupUnexpectedResponse";
} & Readonly<A>;
export declare class ScheduleGroupUnexpectedResponse extends ScheduleGroupUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface ScheduleGroupProps {
    /**
     * Schedule group name. If omitted, Alchemy generates a deterministic name.
     */
    name?: string;
    /**
     * User-defined tags for the schedule group.
     */
    tags?: Record<string, string>;
}
/**
 * An EventBridge Scheduler schedule group.
 *
 * Schedule groups provide a namespace for schedules so higher-level helpers can
 * organize recurring jobs separately from one-shot or operational schedules.
 * ### Creating Schedule Groups
 * **Example:** Basic Group
 * ```typescript
 * const group = yield* ScheduleGroup("Operations", {
 *   tags: {
 *     domain: "ops",
 *   },
 * });
 * ```
 *
 * @resource
 */
export interface ScheduleGroup extends Resource<"AWS.Scheduler.ScheduleGroup", ScheduleGroupProps, {
    /**
     * ARN of the schedule group.
     */
    scheduleGroupArn: string;
    /**
     * Name of the schedule group.
     */
    scheduleGroupName: string;
    /**
     * Current state of the schedule group (`ACTIVE` or `DELETING`).
     */
    state: string | undefined;
    /**
     * Tags on the schedule group, as observed. Lets `alchemy drift` detect
     * out-of-band changes.
     */
    tags?: Record<string, string>;
}, never, Providers> {
}
export declare const ScheduleGroup: import("alchemy").ResourceClass<ScheduleGroup>;
export declare const ScheduleGroupProvider: () => import("effect/Layer").Layer<Provider.Provider<ScheduleGroup>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};
