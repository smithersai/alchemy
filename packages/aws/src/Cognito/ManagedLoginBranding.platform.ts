/** Base64 of an asset's bytes, for a stable comparison key. */
export const encodeAssetBytes = (bytes: Uint8Array): string =>
  Buffer.from(bytes).toString("base64");
