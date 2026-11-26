/** Calls `callback` after one macrotask, through the host's `setTimeout(callback, 0)`. */
export const setTimeoutZero = (callback: (value: unknown) => void): void => {
  setTimeout(callback, 0);
};
