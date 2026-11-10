import * as Effect from "effect/Effect";

/** Set `process.exitCode`, read when the Effect runs. */
export const setProcessExitCode = (code: number) =>
  Effect.sync(() => {
    process.exitCode = code;
  });

/** Call `onSignal` on every SIGINT and SIGTERM this process receives. */
export const listenShutdownSignals = (onSignal: () => void) =>
  Effect.sync(() => {
    process.on("SIGINT", onSignal);
    process.on("SIGTERM", onSignal);
  });

/**
 * After `delayMs`, write `text()` to stderr. The timer never keeps the
 * process alive.
 */
export const writeStderrAfter = (delayMs: number, text: () => string): void => {
  const timer = setTimeout(() => {
    process.stderr.write(text());
  }, delayMs);
  timer.unref();
};
