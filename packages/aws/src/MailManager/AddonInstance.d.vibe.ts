import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.js";
declare const AddonInstanceUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "AddonInstanceUnexpectedResponse";
} & Readonly<A>;
export declare class AddonInstanceUnexpectedResponse extends AddonInstanceUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface AddonInstanceProps {
    /**
     * ID of the {@link AddonSubscription} this instance is created from.
     * Immutable — changing the subscription replaces the instance.
     */
    addonSubscriptionId: string;
    /**
     * Tags applied to the instance. Alchemy ownership tags are merged in
     * automatically.
     */
    tags?: Record<string, string>;
}
export interface AddonInstance extends Resource<"AWS.MailManager.AddonInstance", AddonInstanceProps, {
    /** Server-assigned ID of the Add On instance. */
    addonInstanceId: string;
    /** ARN of the Add On instance. */
    addonInstanceArn: string;
    /** ID of the subscription the instance was created from. */
    addonSubscriptionId: string;
    /** Name of the Add On product. */
    addonName: string | undefined;
}, never, Providers> {
}
/**
 * An SES Mail Manager Add On instance — a usable deployment of a subscribed
 * Add On that rule-set conditions and traffic-policy statements reference as
 * an analyzer.
 *
 * Instances are immutable after creation (only tags update in place).
 * ### Creating Add On Instances
 * **Example:** Instance from a Subscription
 * ```typescript
 * import * as MailManager from "@alchemy.run/aws/MailManager";
 *
 * const subscription = yield* MailManager.AddonSubscription("Spamhaus", {
 *   addonName: "SPAMHAUS_DBL",
 * });
 * const instance = yield* MailManager.AddonInstance("SpamhausInstance", {
 *   addonSubscriptionId: subscription.addonSubscriptionId,
 * });
 * ```
 *
 * ### Referencing from a Traffic Policy
 * **Example:** Analyzer Condition
 * ```typescript
 * const policy = yield* MailManager.TrafficPolicy("Edge", {
 *   defaultAction: "ALLOW",
 *   policyStatements: [
 *     {
 *       Action: "DENY",
 *       Conditions: [
 *         {
 *           BooleanExpression: {
 *             Evaluate: {
 *               Analysis: {
 *                 Analyzer: instance.addonInstanceArn,
 *                 ResultField: "IN_DBL",
 *               },
 *             },
 *             Operator: "IS_TRUE",
 *           },
 *         },
 *       ],
 *     },
 *   ],
 * });
 * ```
 *
 * @resource
 */
export declare const AddonInstance: import("alchemy").ResourceClass<AddonInstance>;
export declare const AddonInstanceProvider: () => import("effect/Layer").Layer<Provider.Provider<AddonInstance>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};
