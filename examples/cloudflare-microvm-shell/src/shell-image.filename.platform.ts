import { fileURLToPath } from "node:url";

export const originalModuleFilename = fileURLToPath(new URL("./shell-image.vibe", import.meta.url));
