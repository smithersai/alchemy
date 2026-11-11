import { existsSync } from "node:fs";
import * as NodePath from "node:path";
import { pathToFileURL } from "node:url";

/** The project root: `rootDir` (default `.`) resolved against `cwd` (default the process working directory). */
export const resolveRoot = (cwd: string | undefined, rootDir: string | undefined): string =>
  NodePath.resolve(cwd ?? process.cwd(), rootDir ?? ".");

/** `config` resolved against `root`, or else the first of `files` that exists in `root`. */
export const findConfigPath = (
  root: string,
  config: string | undefined,
  files: ReadonlyArray<string>,
): string | undefined =>
  config !== undefined
    ? NodePath.resolve(root, config)
    : files.map((file) => NodePath.join(root, file)).find((file) => existsSync(file));

/** A cache-busted `file:` URL, so an edited file is imported again. */
export const freshImportUrl = (path: string): string =>
  `${pathToFileURL(path).href}?t=${Date.now()}`;
