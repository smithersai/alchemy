/** Exit the host process with `code`. */
export const exitProcess = (code: number): void => {
  process.exit(code);
};
