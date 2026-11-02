import * as alerting from "@distilled.cloud/cloudflare/alerting";
import * as Effect from "effect/Effect";
import type { AlertType, NotificationPolicyMechanisms } from "./NotificationPolicy.ts";
export interface ObservedPolicy {
    readonly id: string;
    readonly name?: string;
    readonly alertType?: AlertType;
    readonly enabled?: boolean;
    readonly description?: string;
    readonly alertInterval?: string;
    readonly mechanisms?: unknown;
    readonly filters?: unknown;
    readonly created?: string;
    readonly modified?: string;
}
export declare const undef: <T>(v: T | null | undefined) => T | undefined;
export declare const narrowPolicy: (raw: {
    id?: string | null;
    name?: string | null;
    alertType?: string | null;
    enabled?: boolean | null;
    description?: string | null;
    alertInterval?: string | null;
    mechanisms?: unknown;
    filters?: unknown;
    created?: string | null;
    modified?: string | null;
}) => ObservedPolicy | undefined;
export declare const observePolicy: (accountId: string, policyId: string) => Effect.Effect<ObservedPolicy | undefined, alerting.InvalidRoute | alerting.CloudflareOpError, alerting.CloudflareOpContext>;
export declare const findPolicyByName: (accountId: string, name: string) => Effect.Effect<ObservedPolicy | undefined, alerting.CloudflareOpError, alerting.CloudflareOpContext>;
export declare const createPolicyName: (id: string, name: string | undefined) => Effect.Effect<string, never, import("alchemy").ResourceContext | import("alchemy").Stack | import("alchemy").Stage>;
export type PolicyBody = Omit<alerting.CreatePolicyRequest, "accountId">;
/**
 * Binding contract of a notification policy (`NotificationPolicy`,
 * `CustomAlert`): destinations contributed by the runtimes that consume its
 * notifications, e.g. `Cloudflare.Alerting.consumeNotifications`.
 */
export interface NotificationPolicyBinding {
    /** Webhook destinations to notify, alongside the declared `mechanisms`. */
    webhooks?: ReadonlyArray<{
        id: string;
    }>;
}
/**
 * The declared mechanisms plus the webhooks bound onto the policy. The engine
 * sid-sorts bindings, so the merged order is stable across deploys.
 */
export declare const boundMechanisms: (mechanisms: NotificationPolicyMechanisms | undefined, bindings: ReadonlyArray<{
    data: NotificationPolicyBinding;
}>) => PolicyBody["mechanisms"];
export declare const policyEqualsObserved: (desired: PolicyBody, observed: ObservedPolicy) => boolean;
export declare const normalizedEquals: (a: unknown, b: unknown) => boolean;
/** Drop null/undefined members and sort object keys for stable comparison. */
export declare const normalize: (value: unknown) => unknown;
