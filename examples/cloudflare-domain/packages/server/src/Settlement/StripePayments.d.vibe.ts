/**
 * A stand-in adapter for a payment processor. Swap it for a Stripe HTTP
 * adapter in production.
 */
export declare const StripePayments: import("effect/Layer").Layer<import("@alchemy.run/domain/ExternalSystem").ExternalSystemKey<"Payments">, never, never>;
