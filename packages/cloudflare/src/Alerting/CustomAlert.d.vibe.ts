import * as alerting from "@distilled.cloud/cloudflare/alerting";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { CloudflareEnvironment } from "../CloudflareEnvironment.ts";
import type { Providers } from "../Providers.ts";
import { type NotificationPolicyBinding } from "./internal.vibe";
import type { NotificationPolicyMechanisms } from "./NotificationPolicy.vibe";
declare const CustomAlertUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "CustomAlertUnexpectedResponse";
} & Readonly<A>;
export declare class CustomAlertUnexpectedResponse extends CustomAlertUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
declare const TypeId: "Cloudflare.Alerting.CustomAlert";
type TypeId = typeof TypeId;
/**
 * A time window in minutes or hours, at least one minute (e.g. `"5m"`,
 * `"1h"`).
 */
export type CustomAlertWindow = `${number}m` | `${number}h`;
/**
 * Fire when the query result crosses a fixed value.
 */
export interface CustomAlertThresholdTrigger {
    type: "threshold";
    /** How the query result is compared to `value`. */
    operator: "<" | ">" | "<=" | ">=" | "==" | "!=";
    /** The value the query result is compared to. */
    value: number;
    /** The time range the query covers on each evaluation. */
    window: CustomAlertWindow;
    /** Don't fire while the query result is below this value. */
    minimumThreshold?: number;
}
/**
 * Fire when the query result moves away from its recent baseline.
 */
export interface CustomAlertAnomalyTrigger {
    type: "anomaly";
    /** Fire on spikes, drops, or both. */
    direction: "spike" | "drop" | "both";
    /** How many standard deviations from the baseline count as an anomaly. */
    zScore: number;
    /** The time range the query covers on each evaluation. */
    window: CustomAlertWindow;
    /** The longer time range the baseline is computed over. */
    baselineWindow: CustomAlertWindow;
    /** Don't fire while the query result is below this value. */
    minimumThreshold?: number;
}
/**
 * Fire when the query result falls below a service level objective,
 * checked over a short and a long window.
 */
export interface CustomAlertSloTrigger {
    type: "slo";
    /** The objective the query result is held to (e.g. `99.9`). */
    target: number;
    /** The short window the objective is checked over. */
    shortWindow: CustomAlertWindow;
    /** The long window the objective is checked over. */
    longWindow: CustomAlertWindow;
    /** Don't fire while the query result is below this value. */
    minimumThreshold?: number;
}
/**
 * When a custom alert fires.
 */
export type CustomAlertTrigger = CustomAlertThresholdTrigger | CustomAlertAnomalyTrigger | CustomAlertSloTrigger;
export interface CustomAlertProps {
    /**
     * Name of the alert. If omitted, a unique name is generated.
     * Mutable — renames are applied in place.
     * @default ${app}-${id}-${stage}-${suffix}
     */
    name?: string;
    /**
     * Optional human-readable description of the alert.
     */
    description?: string;
    /**
     * A [SQL API](https://developers.cloudflare.com/analytics/sql-api/) query
     * returning the number the trigger evaluates, e.g.
     * `SELECT count() AS value FROM logs.workersLogs WHERE …`. The query must
     * scope itself to the account (`accountTag = '…'`). Cloudflare checks
     * it when the alert is saved and rejects it with `InvalidAlertQuery`.
     */
    query: string;
    /** When the alert fires. */
    trigger: CustomAlertTrigger;
    /**
     * How often Cloudflare runs the query.
     * @default "1m"
     */
    every?: CustomAlertWindow;
    /**
     * Destinations notified when the alert fires. At least one destination is
     * required, either declared here or bound by a runtime that consumes the
     * alert's notifications (`Cloudflare.Alerting.consumeNotifications`).
     */
    mechanisms?: NotificationPolicyMechanisms;
    /**
     * How often to re-alert while the alert keeps firing (e.g. `"30m"`).
     */
    alertInterval?: string;
    /**
     * Whether the alert is enabled.
     * @default true
     */
    enabled?: boolean;
}
export interface CustomAlertAttributes {
    /** Cloudflare-assigned notification policy UUID. */
    policyId: string;
    /** Account that owns this alert. */
    accountId: string;
    /** Name of the alert. */
    name: string;
    /** Whether the alert is enabled. */
    enabled: boolean;
    /** ISO8601 creation timestamp. */
    created: string | undefined;
    /** ISO8601 last-modified timestamp. */
    modified: string | undefined;
}
export type CustomAlert = Resource<TypeId, CustomAlertProps, CustomAlertAttributes, NotificationPolicyBinding, Providers>;
/**
 * A Cloudflare custom alert: a SQL query Cloudflare runs on a schedule,
 * with a trigger that decides when to notify.
 *
 * The query runs against the
 * [SQL API](https://developers.cloudflare.com/analytics/sql-api/), so it
 * can read Workers logs and traces, HTTP requests, Analytics Engine
 * datasets and the other analytics datasets. Notifications go to the same
 * destinations as a `NotificationPolicy` (email, webhooks, PagerDuty).
 * ### Alerting on a threshold
 * **Example:** Alert when a Worker logs more than 100 errors in 5 minutes
 * ```typescript
 * yield* Cloudflare.Alerting.CustomAlert("ErrorSpike", {
 *   query: `SELECT count() AS value FROM logs.workersLogs
 *           WHERE accountTag = '${accountId}' AND level = 'error'`,
 *   trigger: { type: "threshold", operator: ">", value: 100, window: "5m" },
 *   every: "5m",
 *   mechanisms: { email: [{ id: "ops@example.com" }] },
 * });
 * ```
 *
 * ### Alerting on anomalies
 * **Example:** Alert when request volume spikes or drops
 * ```typescript
 * yield* Cloudflare.Alerting.CustomAlert("TrafficAnomaly", {
 *   query: `SELECT count() AS value FROM events.httpRequests
 *           WHERE accountTag = '${accountId}'`,
 *   trigger: {
 *     type: "anomaly",
 *     direction: "both",
 *     zScore: 3,
 *     window: "5m",
 *     baselineWindow: "1h",
 *   },
 *   mechanisms: { webhooks: [{ id: webhook.webhookId }] },
 * });
 * ```
 *
 * ### Alerting on an SLO
 * **Example:** Alert when the success rate drops below 99.9%
 * ```typescript
 * yield* Cloudflare.Alerting.CustomAlert("Availability", {
 *   query: `SELECT 100 * countIf(httpStatus < 500) / count() AS value
 *           FROM logs.workersLogs WHERE accountTag = '${accountId}'`,
 *   trigger: { type: "slo", target: 99.9, shortWindow: "5m", longWindow: "1h" },
 *   mechanisms: { pagerduty: [{ id: pagerDutyId }] },
 * });
 * ```
 *
 * @see https://developers.cloudflare.com/notifications/
 *
 * @resource
 * @product Alerting
 * @category Observability & Analytics
 */
export declare const CustomAlert: import("alchemy").ResourceClass<CustomAlert>;
/**
 * Returns true if the given value is a CustomAlert resource.
 */
export declare const isCustomAlert: (value: unknown) => value is CustomAlert;
export declare const CustomAlertProvider: () => import("effect/Layer").Layer<Provider.Provider<CustomAlert>, never, CloudflareEnvironment | import("alchemy").Stack | import("alchemy").Stage | alerting.CloudflareOpContext>;
export {};
