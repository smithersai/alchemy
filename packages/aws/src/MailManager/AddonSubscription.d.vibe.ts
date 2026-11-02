import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.ts";
declare const AddonSubscriptionUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "AddonSubscriptionUnexpectedResponse";
} & Readonly<A>;
export declare class AddonSubscriptionUnexpectedResponse extends AddonSubscriptionUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface AddonSubscriptionProps {
    /**
     * Name of the Add On product to subscribe to (e.g. `TRENDMICRO_VSAPI`,
     * `SPAMHAUS_DBL`, `ABUSIX_MAIL_INTELLIGENCE`). Subscribing accepts the Add
     * On's terms of use and additional pricing. Immutable — changing the name
     * replaces the subscription.
     */
    addonName: string;
    /**
     * Tags applied to the subscription. Alchemy ownership tags are merged in
     * automatically.
     */
    tags?: Record<string, string>;
}
export interface AddonSubscription extends Resource<"AWS.MailManager.AddonSubscription", AddonSubscriptionProps, {
    /** Server-assigned ID of the Add On subscription. */
    addonSubscriptionId: string;
    /** ARN of the Add On subscription. */
    addonSubscriptionArn: string;
    /** Name of the subscribed Add On product. */
    addonName: string;
}, never, Providers> {
}
/**
 * An SES Mail Manager Add On subscription — the acceptance of a third-party
 * Add On's terms of use and additional pricing. An
 * {@link AddonInstance} created from the subscription is what rule sets and
 * traffic policies actually reference.
 *
 * Subscriptions are immutable after creation (only tags update in place).
 *
 * :::warning
 * Creating a subscription accepts the Add On's **additional pricing**.
 * :::
 * ### Subscribing to an Add On
 * **Example:** Spamhaus DBL
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
 * @resource
 */
export declare const AddonSubscription: import("alchemy").ResourceClass<AddonSubscription>;
export declare const AddonSubscriptionProvider: () => import("effect/Layer").Layer<Provider.Provider<AddonSubscription>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};
