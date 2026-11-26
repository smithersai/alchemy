import * as NodeOs from "node:os";

// Host access for AuthProvider.vibe: the platform name and the home directory.
export const hostPlatform = () => process.platform;

export const homedir = () => NodeOs.homedir();
