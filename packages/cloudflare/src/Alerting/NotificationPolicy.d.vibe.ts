import * as alerting from "@distilled.cloud/cloudflare/alerting";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { CloudflareEnvironment } from "../CloudflareEnvironment.ts";
import type { Providers } from "../Providers.ts";
import { type NotificationPolicyBinding } from "./internal.vibe";
declare const NotificationPolicyUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "NotificationPolicyUnexpectedResponse";
} & Readonly<A>;
export declare class NotificationPolicyUnexpectedResponse extends NotificationPolicyUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export type { NotificationPolicyBinding } from "./internal.vibe";
declare const TypeId: "Cloudflare.Alerting.NotificationPolicy";
type TypeId = typeof TypeId;
/**
 * The event that triggers a notification dispatch. The full catalog (and
 * which types your plan can use) is returned by the available-alerts
 * endpoint. The union is kept open so new Cloudflare alert types aren't
 * blocked by stale types.
 */
export type AlertType = alerting.CreatePolicyRequest["alertType"];
/**
 * Optional filters restricting which events trigger the policy. Which keys
 * are valid (or required — Cloudflare returns `FiltersRequired`) depends on
 * the alert type.
 */
export type NotificationPolicyFilters = alerting.CreatePolicyRequest["filters"];
/**
 * Destinations notified when the policy fires. At least one mechanism is
 * required (Cloudflare returns `MechanismRequired` otherwise). Email ids
 * are email addresses; webhook/pagerduty ids reference destination UUIDs.
 */
export interface NotificationPolicyMechanisms {
    /** Email destinations — `id` is the recipient email address. */
    email?: ReadonlyArray<{
        id: string;
    }>;
    /** Webhook destinations — `id` references a {@link NotificationWebhook}. */
    webhooks?: ReadonlyArray<{
        id: string;
    }>;
    /** PagerDuty destinations — `id` references a connected PagerDuty service. */
    pagerduty?: ReadonlyArray<{
        id: string;
    }>;
}
export interface NotificationPolicyProps {
    /**
     * Name of the policy. If omitted, a unique name is generated.
     * Mutable — renames are applied in place.
     * @default ${app}-${id}-${stage}-${suffix}
     */
    name?: string;
    /**
     * The event that triggers a notification dispatch (e.g.
     * `universal_ssl_event_type`, `billing_usage_alert`). Changing the alert
     * type triggers a replacement: the valid filter set depends on the alert
     * type, so a policy alerting on a different event is a different policy.
     */
    alertType: AlertType;
    /**
     * Whether the policy is enabled.
     * @default true
     */
    enabled?: boolean;
    /**
     * Optional human-readable description of the policy.
     */
    description?: string;
    /**
     * How often to re-alert from the same incident (e.g. `"30m"`). Not
     * supported by all alert types.
     */
    alertInterval?: string;
    /**
     * Destinations notified when the policy fires. At least one destination is
     * required, either declared here or bound by a runtime that consumes the
     * policy's notifications (`Cloudflare.Alerting.consumeNotifications`).
     */
    mechanisms?: NotificationPolicyMechanisms;
    /**
     * Optional filters restricting which events trigger the policy. Some
     * alert types require specific filters (`FiltersRequired`).
     */
    filters?: NotificationPolicyFilters;
}
export interface NotificationPolicyAttributes {
    /** Cloudflare-assigned notification policy UUID. */
    policyId: string;
    /** Account that owns this policy. */
    accountId: string;
    /** Name of the policy. */
    name: string;
    /** The alert type the policy fires on. */
    alertType: AlertType;
    /** Whether the policy is enabled. */
    enabled: boolean;
    /** ISO8601 creation timestamp. */
    created: string | undefined;
    /** ISO8601 last-modified timestamp. */
    modified: string | undefined;
}
export type NotificationPolicy = Resource<TypeId, NotificationPolicyProps, NotificationPolicyAttributes, NotificationPolicyBinding, Providers>;
/**
 * A Cloudflare Notifications policy.
 *
 * A notification policy connects an alert type (the event Cloudflare
 * watches for) to one or more destinations — email addresses, webhook
 * destinations, or PagerDuty services — optionally narrowed by filters.
 * ### Creating a policy
 * **Example:** Email notifications for Universal SSL events
 * ```typescript
 * yield* Cloudflare.Alerting.NotificationPolicy("SslAlerts", {
 *   alertType: "universal_ssl_event_type",
 *   mechanisms: { email: [{ id: "ops@example.com" }] },
 * });
 * ```
 *
 * **Example:** Disabled policy with a description
 * ```typescript
 * yield* Cloudflare.Alerting.NotificationPolicy("SslAlerts", {
 *   alertType: "universal_ssl_event_type",
 *   enabled: false,
 *   description: "Paused during migration",
 *   mechanisms: { email: [{ id: "ops@example.com" }] },
 * });
 * ```
 *
 * ### Webhook destinations
 * **Example:** Dispatch to a webhook destination
 * ```typescript
 * const webhook = yield* Cloudflare.Alerting.NotificationWebhook("AlertsHook", {
 *   url: "https://alerts.example.com/cf",
 * });
 *
 * yield* Cloudflare.Alerting.NotificationPolicy("SslAlerts", {
 *   alertType: "universal_ssl_event_type",
 *   mechanisms: { webhooks: [{ id: webhook.webhookId }] },
 * });
 * ```
 *
 * ### Filters
 * **Example:** Health check alerts for specific zones
 * ```typescript
 * yield* Cloudflare.Alerting.NotificationPolicy("HealthAlerts", {
 *   alertType: "health_check_status_notification",
 *   mechanisms: { email: [{ id: "ops@example.com" }] },
 *   filters: {
 *     healthCheckId: [healthCheckId],
 *     newHealth: ["Unhealthy"],
 *   },
 * });
 * ```
 *
 * ### Handling notifications in code
 * **Example:** Run an Effect for each notification
 * `consumeNotifications` adds a webhook destination at the consuming
 * runtime, so the policy needs no `mechanisms`.
 * ```typescript
 * const policy = yield* Cloudflare.Alerting.NotificationPolicy("SslAlerts", {
 *   alertType: "universal_ssl_event_type",
 * });
 *
 * // in a Worker's Construction phase, with NotificationEventSourceLive provided
 * yield* Cloudflare.Alerting.consumeNotifications(policy, (notification) =>
 *   Effect.log(notification.text),
 * );
 * ```
 *
 * ### SQL custom alerts <!-- api-prose -->
 * Alerts on a SQL query (Cloudflare's `custom_analytics` alert type) have
 * their own resource with typed triggers: `Cloudflare.Alerting.CustomAlert`.
 *
 * ### Workers Issues notifications
 * **Example:** Notify on new Worker issues
 * ```typescript
 * const policy = yield* Cloudflare.Alerting.NotificationPolicy("IssuePolicy", {
 *   alertType: "workers_observability_real_time_issue",
 *   mechanisms: { email: [{ id: "ops@example.com" }] },
 * });
 *
 * yield* Cloudflare.Workers.IssueAutomation("IssueAlerts", {
 *   policyId: policy.policyId,
 *   afterOccurrences: 5,
 * });
 * ```
 *
 * @see https://developers.cloudflare.com/notifications/
 *
 * @resource
 * @product Alerting
 * @category Observability & Analytics
 */
export declare const NotificationPolicy: import("alchemy").ResourceClass<NotificationPolicy>;
/**
 * Returns true if the given value is a NotificationPolicy resource.
 */
export declare const isNotificationPolicy: (value: unknown) => value is NotificationPolicy;
export declare const NotificationPolicyProvider: () => import("effect/Layer").Layer<Provider.Provider<NotificationPolicy>, never, CloudflareEnvironment | import("alchemy").Stack | import("alchemy").Stage | alerting.CloudflareOpContext>;
/**
 * Compare the desired policy body against observed cloud state.
 * `mechanisms`/`filters` are compared structurally with `null`/`undefined`
 * dropped and object keys sorted, since Cloudflare echoes optional fields
 * as `null`.
 */
