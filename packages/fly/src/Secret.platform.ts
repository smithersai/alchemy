import * as crypto from "node:crypto";
// Generated platform helpers for this VibeLang module.
export function $platform(arg0: string, arg1: "utf8") {
  return Buffer.from(arg0, arg1);
}

export function createHash(algorithm: string) {
  return crypto.createHash(algorithm);
}
