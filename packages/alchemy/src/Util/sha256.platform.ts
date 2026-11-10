export const digestSha256 = (data: BufferSource): Promise<ArrayBuffer> =>
  crypto.subtle.digest("SHA-256", data);
