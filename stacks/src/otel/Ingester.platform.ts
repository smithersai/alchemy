/**
 * The PostHog relay's upstream headers: `raw`'s headers without hop-by-hop
 * and Cloudflare-internal ones, with the client IP as `x-forwarded-for`.
 */
export const relayHeaders = (raw: Request): Headers => {
  const headers = new Headers(raw.headers);
  headers.delete("host");
  headers.delete("cookie");
  for (const key of headers.keys()) {
    if (key.startsWith("cf-")) headers.delete(key);
  }
  const cfIp = raw.headers.get("cf-connecting-ip") ?? raw.headers.get("x-real-ip") ?? undefined;
  if (cfIp) headers.set("x-forwarded-for", cfIp);
  return headers;
};
