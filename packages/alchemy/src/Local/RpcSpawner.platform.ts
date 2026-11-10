export { fileURLToPath } from "node:url";

/** @throws {never} */
export const isBun = (): boolean => typeof globalThis.Bun !== "undefined";

/** @throws {never} */
export const processExecPath = (): string => process.execPath;

export const processEnvEntries = (): [string, string | undefined][] => Object.entries(process.env);

/**
 * Open the parent link to a sidecar at `url`. A heartbeat keeps the link
 * active so no idle timer on either end can close it; the sidecar ignores
 * messages on this link.
 */
export const openParentLink = (url: string): WebSocket => {
  const ws = new WebSocket(new URL("/parent", url));
  const heartbeat = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) ws.send("heartbeat");
  }, 30_000);
  heartbeat.unref?.();
  ws.addEventListener("close", () => clearInterval(heartbeat));
  return ws;
};

/** Whether the parent link is connecting or open. */
export const isParentLinkOpen = (ws: WebSocket): boolean =>
  ws.readyState === WebSocket.CONNECTING || ws.readyState === WebSocket.OPEN;
