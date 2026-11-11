import * as Effect from "effect/Effect";

export const hasDnsZone = () =>
  Effect.sync(() => process.env.HETZNER_ZONE !== undefined && process.env.HETZNER_ZONE.length > 0);
