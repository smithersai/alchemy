/** @throws {never} */
export function deliveryResponse(body: string | null, status: 202 | 401 | 405): Response {
  return new globalThis.Response(body, { status });
}

export function importHmacKey(secret: Uint8Array<ArrayBuffer>): Promise<CryptoKey> {
  return crypto.subtle.importKey("raw", secret, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
}

export function signHmac(key: CryptoKey, body: Uint8Array<ArrayBuffer>): Promise<ArrayBuffer> {
  return crypto.subtle.sign("HMAC", key, body);
}
