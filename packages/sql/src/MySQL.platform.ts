export function isWorkerd(): boolean {
  return (
    (globalThis as { navigator?: { userAgent?: string } }).navigator?.userAgent ===
      "Cloudflare-Workers" || "WebSocketPair" in globalThis
  );
}
