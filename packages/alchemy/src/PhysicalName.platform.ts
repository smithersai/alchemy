import { createHash } from "node:crypto";

/** The bytes of a hex string. */
export const hexBytes = (hex: string): Uint8Array => Buffer.from(hex, "hex");

/** The SHA-256 digest of a UTF-8 string. */
export const sha256 = (text: string): Uint8Array => createHash("sha256").update(text).digest();
