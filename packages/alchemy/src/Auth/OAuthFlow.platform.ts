import http from "node:http";

/** A local HTTP server for the browser's OAuth redirect; not yet listening. */
export const createCallbackServer = (handler: http.RequestListener): http.Server =>
  http.createServer(handler);
