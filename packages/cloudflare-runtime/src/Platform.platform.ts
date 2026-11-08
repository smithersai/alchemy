/** Ends the host process with `code`. */
export function exitProcess(code: number): never {
  return process.exit(code);
}

/**
 * Whether this module runs under Bun.
 * @throws {never}
 */
export function isBun(): boolean {
  return typeof Bun !== "undefined";
}
