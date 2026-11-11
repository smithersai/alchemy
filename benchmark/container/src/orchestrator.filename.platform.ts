import { fileURLToPath } from "node:url";

export const originalModuleFilename = fileURLToPath(
  new URL("./orchestrator.vibe", import.meta.url),
);
