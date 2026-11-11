/** A `Blob` from the host's global constructor. */
export const newBlob = (...args: ConstructorParameters<typeof Blob>): Blob => new Blob(...args);
