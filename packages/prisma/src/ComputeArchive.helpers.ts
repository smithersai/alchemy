/** @throws {Error} */
export function boundedLimit(name: string, value: number, hardLimit: number) {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive safe integer`);
  }
  if (value > hardLimit) {
    throw new Error(`${name} must not exceed the hard limit of ${hardLimit}`);
  }
  return value;
}

/** @throws {Error} */
export function compileIgnorePattern(input: string, prefix?: string) {
  const normalized = input.replaceAll("\\", "/").replace(/^\.\//, "");
  if (
    normalized.length === 0 ||
    normalized.startsWith("!") ||
    normalized.startsWith("/") ||
    /^[a-zA-Z]:\//.test(normalized) ||
    normalized.split("/").some((segment) => segment === "..")
  ) {
    throw new Error(`Invalid compute archive ignore pattern: ${input}`);
  }
  const scoped = prefix === undefined ? normalized : `${prefix}/${normalized}`;
  const escaped = scoped
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replaceAll("**", "\0")
    .replaceAll("*", "[^/]*")
    .replaceAll("\0", ".*");
  return new RegExp(`^${escaped}(?:/.*)?$`);
}
