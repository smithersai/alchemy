import { type RuntimeContext } from "alchemy/RuntimeContext";
import * as Context from "effect/Context";
import type * as Effect from "effect/Effect";
import type { StripeEventClass } from "./Events.js";
export interface ConsumeEventsProps<E extends readonly StripeEventClass[] = readonly StripeEventClass[]> {
    /**
     * Event classes to subscribe to. The handler `event` parameter is the
     * union of these classes.
     */
    events: E;
    /**
     * Path on the host. Defaults to `/webhooks/stripe`.
     */
    path?: string;
}
export type SelectedStripeEvent<E extends readonly StripeEventClass[]> = InstanceType<E[number]>;
export declare const webhookPath: (path?: string) => string;
export declare const webhookSecretEnvName: (path?: string) => string;
/**
 * Deterministic logical id for the {@link WebhookEndpoint} created by
 * {@link consumeEvents} when the caller does not pass an explicit id.
 * Derived from the delivery path so two subscriptions on different paths
 * don't collide.
 */
export declare const webhookEndpointLogicalId: (path?: string) => string;
/**
 * Subscribe to Stripe webhook events on the host.
 *
 * `consumeEvents` provisions the {@link WebhookEndpoint} itself: it derives
 * the delivery URL from the host's `url`, enables the selected event
 * types, and binds the endpoint's minted signing secret onto the host so
 * deliveries are verified. No separate endpoint declaration is needed.
 *
 * Provide `Stripe.ConsumeEventsLive` on the host's Effect.Effect, e.g. a Cloudflare
 * Worker.
 *
 * ### Handling events
 * **Example:** Customer created and invoice paid
 * ```typescript
 * yield* Stripe.consumeEvents("Events", {
 *   events: [Stripe.CustomerCreated, Stripe.InvoicePaid],
 * }, Effect.fn(function* (event) {
 *   // event: CustomerCreated | InvoicePaid
 *   yield* Effect.log(event.type);
 * }));
 * ```
 *
 * @binding
 * @product Webhook
 */
export declare function consumeEvents<const E extends readonly StripeEventClass[], Req = never>(props: ConsumeEventsProps<E>, process: (event: SelectedStripeEvent<E>) => Effect.Effect<void, never, Req | RuntimeContext>): Effect.Effect<void, never, EventSource>;
export declare function consumeEvents<const E extends readonly StripeEventClass[], Req = never>(id: string, props: ConsumeEventsProps<E>, process: (event: SelectedStripeEvent<E>) => Effect.Effect<void, never, Req | RuntimeContext>): Effect.Effect<void, never, EventSource>;
export type EventSourceService = <E extends readonly StripeEventClass[], Req = never>(id: string, props: ConsumeEventsProps<E>, process: (event: SelectedStripeEvent<E>) => Effect.Effect<void, never, Req>) => Effect.Effect<void, never, never>;
declare const EventSource_base: Context.ServiceClass<EventSource, "Stripe.EventSource", EventSourceService>;
export declare class EventSource extends EventSource_base {
}
export {};
