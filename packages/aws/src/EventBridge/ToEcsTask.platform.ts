import { createHash } from "node:crypto";
export const digestHex = (algorithm: string, value: string | Uint8Array): string =>
  createHash(algorithm).update(value).digest("hex");
