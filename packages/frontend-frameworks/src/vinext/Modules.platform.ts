import { join } from "node:path";
import { pathToFileURL } from "node:url";

/** The file URL of `file` under a vinext package directory's `dist/`. */
export const vinextDistUrl = (directory: string, file: string): string =>
  pathToFileURL(join(directory, "dist", file)).href;
