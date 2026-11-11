import { fileURLToPath } from "node:url";

export const originalModuleFilename = fileURLToPath(
  new URL("./effectful-container.vibe", import.meta.url),
);
