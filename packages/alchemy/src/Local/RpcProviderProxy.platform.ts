export const openWebSocket = (url: string): WebSocket => new WebSocket(url);

/** @throws {never} */
export const isClosingOrClosed = (socket: WebSocket): boolean =>
  socket.readyState === WebSocket.CLOSING || socket.readyState === WebSocket.CLOSED;

/**
 * The dev sidecar entry, resolved through package exports. The active export
 * conditions select `src/` under Bun or the dev loader and `lib/` in a
 * published Node install.
 */
export const resolveSidecarEntryUrl = (): string => import.meta.resolve("alchemy/Local/Sidecar");
