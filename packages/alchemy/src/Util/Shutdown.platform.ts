import * as Effect from "effect/Effect";

export const listen = (onSignal: (signal: NodeJS.Signals) => void) =>
  Effect.sync(() => {
    process.prependListener("SIGINT", onSignal);
    process.prependListener("SIGTERM", onSignal);
  });

export const unlisten = (onSignal: (signal: NodeJS.Signals) => void) =>
  Effect.sync(() => {
    process.off("SIGINT", onSignal);
    process.off("SIGTERM", onSignal);
  });
