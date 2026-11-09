/** Base64-encode a UTF-8 string with the host's `Buffer`. */
export const encodeBase64Utf8 = (data: string): string =>
  Buffer.from(data, "utf8").toString("base64");

/** Decode base64 into a UTF-8 string with the host's `Buffer`. */
export const decodeBase64Utf8 = (data: string): string =>
  Buffer.from(data, "base64").toString("utf8");
