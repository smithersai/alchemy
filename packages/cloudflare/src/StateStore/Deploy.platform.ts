export { randomBytes } from "node:crypto";
export { resolve4, Resolver } from "node:dns/promises";

/** A `File` from the host's global constructor. */
export const newFile = (...args: ConstructorParameters<typeof File>): File => new File(...args);
