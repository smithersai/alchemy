import { fileURLToPath } from "node:url";

/** This package's built, self-contained `aws-lambda` adapter module on disk. */
export const lambdaAdapterPath = (): string =>
  fileURLToPath(import.meta.resolve("@alchemy.run/frontend-frameworks/aws-lambda"));
