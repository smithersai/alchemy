import * as NodeFs from "node:fs";
import * as NodeHttp from "node:http";
import { createRequire } from "node:module";
import type * as NodeNet from "node:net";
import type * as NodeVm from "node:vm";

/** `Symbol.for("__cloudflare-context__")`, the key OpenNext reads. */
const CLOUDFLARE_CONTEXT_SYMBOL: unique symbol = Symbol.for("__cloudflare-context__");

type GlobalWithContext<C> = typeof globalThis & {
  [CLOUDFLARE_CONTEXT_SYMBOL]?: C | undefined;
};

/**
 * The context currently planted by an open dev server. The `vm.runInContext`
 * patch consults this mutable reference so the (process-global, one-time)
 * patch always reflects the latest scope: cleared on release, re-set by the
 * next `start`.
 */
let currentContext: unknown;
let vmPatched = false;

/**
 * Mirror of OpenNext's `monkeyPatchVmModuleEdgeContext`: Next dev evaluates
 * edge functions (middleware, edge routes) with `vm.runInContext`, whose
 * sandbox does not inherit `globalThis` symbols — inject the context into
 * every contextified object so `getCloudflareContext()` works there too.
 * Patched once per process; a cleared {@link currentContext} makes it a
 * pass-through.
 */
const patchVmRunInContext = (): void => {
  if (vmPatched) return;
  vmPatched = true;
  // The ESM namespace of "node:vm" is frozen; patch the (shared, mutable)
  // CJS exports object — the one Next's sandbox `require`s.
  const vm = createRequire(import.meta.url)("vm") as typeof NodeVm;
  const original = vm.runInContext.bind(vm);
  const patched: typeof vm.runInContext = (code, contextifiedObject, options) => {
    if (currentContext !== undefined) {
      const runtimeContext = contextifiedObject as GlobalWithContext<unknown>;
      runtimeContext[CLOUDFLARE_CONTEXT_SYMBOL] ??= currentContext;
    }
    return original(code, contextifiedObject, options);
  };
  vm.runInContext = patched;
};

/** Plant `context` on the global symbol and arm the vm patch; returns the previous value. */
export const plantContext = <C>(context: C): C | undefined => {
  const global = globalThis as GlobalWithContext<C>;
  const previous = global[CLOUDFLARE_CONTEXT_SYMBOL];
  global[CLOUDFLARE_CONTEXT_SYMBOL] = context;
  currentContext = context;
  patchVmRunInContext();
  return previous;
};

/** Restore the value {@link plantContext} returned. */
export const restoreContext = <C>(previous: C | undefined): void => {
  (globalThis as GlobalWithContext<C>)[CLOUDFLARE_CONTEXT_SYMBOL] = previous;
  currentContext = previous;
};

/** `realpath(root)`, or `root` itself when it cannot be resolved. */
export const realRoot = (root: string): string => {
  try {
    return NodeFs.realpathSync.native(root);
  } catch {
    return root;
  }
};

export type RequestHandler = (
  req: NodeHttp.IncomingMessage,
  res: NodeHttp.ServerResponse,
) => Promise<void>;

export interface HttpServerHandle {
  readonly server: NodeHttp.Server;
  readonly port: number;
  readonly setHandler: (handler: RequestHandler) => void;
  readonly sockets: Set<NodeNet.Socket>;
}

/**
 * Listen on `hostname:port` (503 until a handler is set). `onListening`
 * gets the handle, or `onError` the failure (`"no-address"` when the server
 * has no TCP address).
 */
export const listenHttpServer = (
  hostname: string,
  port: number | undefined,
  onListening: (handle: HttpServerHandle) => void,
  onError: (cause: unknown, noAddress: boolean) => void,
): void => {
  let handler:
    | ((req: NodeHttp.IncomingMessage, res: NodeHttp.ServerResponse) => Promise<void>)
    | undefined;
  const sockets = new Set<NodeNet.Socket>();
  const server = NodeHttp.createServer((req, res) => {
    if (handler !== undefined) {
      void handler(req, res);
    } else {
      res.statusCode = 503;
      res.end("Next.js dev server is starting");
    }
  });
  server.on("connection", (socket) => {
    sockets.add(socket);
    socket.on("close", () => sockets.delete(socket));
  });
  server.once("error", (cause) => onError(cause, false));
  server.listen(port ?? 0, hostname, () => {
    const address = server.address();
    if (address === null || typeof address === "string") {
      onError(address, true);
      return;
    }
    onListening({
      server,
      sockets,
      port: address.port,
      setHandler: (h) => {
        handler = h;
      },
    });
  });
};

/** Destroy live sockets, then close the server; `done` runs once closed. */
export const closeHttpServer = (handle: HttpServerHandle, done: () => void): void => {
  // Destroy live (keep-alive / HMR websocket) sockets so close() never
  // hangs on an idle connection.
  for (const socket of handle.sockets) socket.destroy();
  handle.server.close(() => done());
};
