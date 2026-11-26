import { fileURLToPath } from "node:url";

export const originalModuleFilename = fileURLToPath(
  new URL("./container-worker.vibe", import.meta.url),
);
