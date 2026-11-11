// Host access for rpc.vibe: the `Fly-Src` key and signature, and the Machine environment.
import * as crypto from "node:crypto";

/** Fly's `Fly-Src` verification key. */
export type FlySrcKey = crypto.KeyObject;

/** Decode a hex DER SubjectPublicKeyInfo ed25519 key; throws on a malformed key. */
export const createFlySrcKey = (spkiHex: string): FlySrcKey =>
  crypto.createPublicKey({
    key: Buffer.from(spkiHex, "hex"),
    format: "der",
    type: "spki",
  });

/** Whether the base64 `signature` signs `source` under `key`; throws on malformed input. */
export const verifyFlySrcSignature = (source: string, key: FlySrcKey, signature: string): boolean =>
  crypto.verify(null, Buffer.from(source), key, Buffer.from(signature, "base64"));

/** A Machine environment variable; `""` when unset. */
export const envVar = (name: string): string => process.env[name] ?? "";
