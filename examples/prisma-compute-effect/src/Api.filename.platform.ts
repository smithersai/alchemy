import { fileURLToPath } from "node:url";

export const originalModuleFilename = fileURLToPath(new URL("./Api.vibe", import.meta.url));
