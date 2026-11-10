import * as NodeOs from "node:os";

/** The current user's home directory, read at call time. */
export const homeDirectory = (): string => NodeOs.homedir();

/** The operating system platform Node.js was compiled for, read at call time. */
export const platformName = (): NodeJS.Platform => NodeOs.platform();
