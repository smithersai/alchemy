import assert from "node:assert";

/** `$ALCHEMY_BUNDLE_CONCURRENCY`, read at the call. */
export const bundleConcurrencySetting = (): string | undefined =>
  process.env.ALCHEMY_BUNDLE_CONCURRENCY;

/** This process's working directory, read at the call. */
export const currentDirectory = (): string => process.cwd();

/** Node's `assert`: throws an `AssertionError` with `message` when `condition` is falsy. */
export function assertCondition(condition: unknown, message: string): asserts condition {
  assert(condition, message);
}
