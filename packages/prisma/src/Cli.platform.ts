export function resolveModule(specifier: string) {
  return import.meta.resolve(specifier);
}

/** @throws {never} */
export function executablePath() {
  return process.execPath;
}
