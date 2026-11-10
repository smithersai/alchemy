/** A `File` from the host's global constructor. */
export const newFile = (...args: ConstructorParameters<typeof File>): File => new File(...args);
