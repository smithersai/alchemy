import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

/** The path of the built S3 cache handler this package ships. */
export const cacheHandlerPath = (): string =>
  fileURLToPath(import.meta.resolve("@alchemy.run/frontend-frameworks/nextjs/cache-handler"));

/** The version of `sharp` the project at `root` resolves, if any. */
export const readProjectSharpVersion = (root: string): string | undefined => {
  try {
    const require = createRequire(`${root.replace(/\/+$/, "")}/package.json`);
    const packageJson = require.resolve("sharp/package.json");
    return (require(packageJson) as { version: string }).version;
  } catch {
    return undefined;
  }
};

/** The parent process environment. */
export const processEnv = (): Record<string, string> => process.env as Record<string, string>;
