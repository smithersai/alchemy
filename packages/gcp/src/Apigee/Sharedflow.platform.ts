import { createHash } from "node:crypto";

// Host access for Sharedflow.vibe: hashing and Buffer encodings.
export const sha256Hex = (value: string) => createHash("sha256").update(value).digest("hex");

export const bytesToBase64 = (bytes: Uint8Array) => Buffer.from(bytes).toString("base64");

export const base64ToBytes = (base64: string) => Buffer.from(base64, "base64");

export const bytesToUtf8 = (bytes: Uint8Array) => Buffer.from(bytes).toString("utf8");

export const utf8ToBytes = (text: string) => Buffer.from(text, "utf8");
