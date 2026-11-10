import * as NodePath from "node:path";

/** Resolves `input` against the `root` directory, as `node:path` `resolve` does. */
export const resolveFromRoot = (root: string, input: string): string =>
  NodePath.resolve(root, input);
