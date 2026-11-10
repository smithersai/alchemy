import * as Effect from "effect/Effect";

export const shortRandomUUID = () => Effect.sync(() => crypto.randomUUID().slice(0, 8));
