import { fileURLToPath } from "node:url";

/** This package's waku AWS adapter module on disk. */
export const awsAdapterPath = (): string =>
  fileURLToPath(import.meta.resolve("@alchemy.run/frontend-frameworks/waku/aws-adapter"));
