const isLoopbackHost = (hostname: string) =>
  hostname === "localhost" ||
  hostname.endsWith(".localhost") ||
  hostname === "127.0.0.1" ||
  hostname === "[::1]";

/** @throws {Error} */
export function normalizeUrl(value: string) {
  const url = new URL(value);
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("Prisma Management API URL must use HTTP or HTTPS.");
  }
  if (url.username.length > 0 || url.password.length > 0) {
    throw new Error("Prisma Management API URL must not contain credentials.");
  }
  if (url.protocol === "http:" && !isLoopbackHost(url.hostname)) {
    throw new Error("Prisma Management API URL must use HTTPS unless it targets a loopback host.");
  }
  if (
    (url.pathname !== "/" && url.pathname !== "") ||
    url.search.length > 0 ||
    url.hash.length > 0
  ) {
    throw new Error(
      "Prisma Management API URL must be an origin without a path, query, or fragment.",
    );
  }
  return url.origin;
}
