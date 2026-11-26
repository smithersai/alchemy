export { createRequire } from "node:module";
export { default as nodePath } from "node:path";
export { pathToFileURL } from "node:url";

/** Set the host process's environment variable `key` to `value`. */
export const setEnv = (key: string, value: string): void => {
  process.env[key] = value;
};
