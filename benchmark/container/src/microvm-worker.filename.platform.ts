import { fileURLToPath } from "node:url";

export const originalModuleFilename = fileURLToPath(
  new URL("./microvm-worker.vibe", import.meta.url),
);
