import { createHash } from "node:crypto";

export function sha256Hex(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

export function utf8ToBase64(value: string): string {
  return Buffer.from(value, "utf8").toString("base64");
}

export function base64ToHex(value: string): string {
  return Buffer.from(value, "base64").toString("hex");
}
