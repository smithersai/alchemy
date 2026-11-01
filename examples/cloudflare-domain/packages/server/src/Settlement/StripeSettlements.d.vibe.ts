import * as Stripe from "@alchemy.run/stripe";
import * as Effect from "effect/Effect";
/**
 * Card top-ups settle through Stripe. Every `payment_intent.succeeded` whose
 * metadata names an account becomes a `RecordSettlement`, a command that
 * never rejects (money that settled on a closed account is refunded by
 * `SettlementRefund`).
 *
 * `consumeEvents` provisions the Stripe webhook endpoint pointed at this
 * Worker, binds its signing secret, and verifies every delivery. The payment
 * intent id is the command id, so a redelivered event is a no-op.
 */
export declare const StripeSettlements: Effect.Effect<void, never, Stripe.EventSource | import("@alchemy.run/domain/Aggregate").Key<"Account">>;
