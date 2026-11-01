/**
 * A stand-in adapter for a fraud vendor: large withdrawals score as risky.
 * Swap it for an HTTP adapter in production.
 */
export declare const SiftFraudCheck: import("effect/Layer").Layer<import("@alchemy.run/domain/ExternalSystem").ExternalSystemKey<"FraudCheck">, never, never>;
