import * as Effect from "effect/Effect";

export const randomUuid = () => Effect.sync(() => crypto.randomUUID());
