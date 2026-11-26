/** Fill `bytes` with cryptographically secure random values. */
export const fillRandomValues = (bytes: Uint8Array): void => {
  crypto.getRandomValues(bytes);
};
