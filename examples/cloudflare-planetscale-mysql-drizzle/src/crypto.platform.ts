import * as Effect from "effect/Effect";

export const randomUUID = () => Effect.sync(() => crypto.randomUUID());
