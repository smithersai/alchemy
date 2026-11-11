import { createRequire } from "node:module";

export function currentWorkingDirectory() {
  return process.cwd();
}

export function resolvePackageFrom(filename: string, specifier: string) {
  return createRequire(filename).resolve(specifier);
}
