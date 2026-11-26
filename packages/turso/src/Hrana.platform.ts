// Host access for Hrana.vibe: base64 for Hrana blob values.

/** Base64 text of a blob value. */
export const encodeBase64 = (bytes: Uint8Array): string => Buffer.from(bytes).toString("base64");

/** Bytes of a base64 blob value, as a `Buffer`. */
export const decodeBase64 = (base64: string): Buffer => Buffer.from(base64, "base64");
