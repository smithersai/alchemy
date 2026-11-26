import { createHash } from "node:crypto";

export function md5Base64(bytes: Uint8Array): string {
  return createHash("md5").update(bytes).digest("base64");
}
