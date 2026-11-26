import { AsyncLocalStorage } from "node:async_hooks";

/** The current async context from the host's `AsyncLocalStorage.snapshot()`. */
export const snapshotAsyncContext = (): ReturnType<typeof AsyncLocalStorage.snapshot> =>
  AsyncLocalStorage.snapshot();
