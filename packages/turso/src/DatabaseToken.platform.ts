// Host access for DatabaseToken.vibe: decoding a JWT segment.

/** UTF-8 text of a base64url JWT segment. */
export const decodeBase64UrlUtf8 = (segment: string): string =>
  Buffer.from(segment, "base64url").toString("utf8");
