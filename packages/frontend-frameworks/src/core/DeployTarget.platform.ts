import * as NodePath from "node:path";

/** `main` as an absolute path: kept when already absolute, else resolved against `root`. */
export const resolveEntryPath = (root: string, main: string): string =>
  NodePath.isAbsolute(main) ? main : NodePath.resolve(root, main);
