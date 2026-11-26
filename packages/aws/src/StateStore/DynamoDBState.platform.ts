export { createHash } from "node:crypto";

/** A random UUID from the host's `crypto`. */
export const randomUUID = (): string => crypto.randomUUID();
