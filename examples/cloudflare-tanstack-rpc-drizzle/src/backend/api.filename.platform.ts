import { fileURLToPath } from "node:url";

export const originalModuleFilename = fileURLToPath(new URL("./api.vibe", import.meta.url));
