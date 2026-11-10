/** Fills `array` from the host's `crypto.getRandomValues`. */
export const getRandomValues = <T extends ArrayBufferView>(array: T): T =>
  crypto.getRandomValues(array);
