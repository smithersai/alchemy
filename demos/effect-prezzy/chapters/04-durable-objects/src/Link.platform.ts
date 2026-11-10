/** Short, URL-safe codes. */
export const newCode = () =>
  Array.from(crypto.getRandomValues(new Uint8Array(6)), (b) =>
    "abcdefghijkmnpqrstuvwxyz23456789".charAt(b % 32),
  ).join("");
