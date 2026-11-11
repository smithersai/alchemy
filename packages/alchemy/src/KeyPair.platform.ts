import * as NodeCrypto from "node:crypto";
import type { KeyPairAlgorithm, KeyPairProps } from "./KeyPair.vibe";

const pemEncoding = {
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
  publicKeyEncoding: { type: "spki", format: "pem" },
} as const;

export const generate = (
  props: KeyPairProps,
): {
  privateKey: string;
  publicKey: string;
  algorithm: KeyPairAlgorithm;
} => {
  const algorithm = props.algorithm ?? "ed25519";
  if (algorithm === "rsa") {
    const { privateKey, publicKey } = NodeCrypto.generateKeyPairSync("rsa", {
      modulusLength: props.modulusLength ?? 2048,
      ...pemEncoding,
    });
    return { algorithm, privateKey, publicKey };
  }
  if (algorithm === "ec") {
    const { privateKey, publicKey } = NodeCrypto.generateKeyPairSync("ec", {
      namedCurve: props.namedCurve ?? "P-256",
      ...pemEncoding,
    });
    return { algorithm, privateKey, publicKey };
  }
  const { privateKey, publicKey } = NodeCrypto.generateKeyPairSync("ed25519", pemEncoding);
  return { algorithm, privateKey, publicKey };
};
