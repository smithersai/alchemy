import * as Effect from "effect/Effect";
import type * as RpcServer from "./RpcServer.vibe";
import { SESSION_ENV_PARAM } from "./RpcServerEnvironment.ts";
import type { ServerRpcSession } from "./RpcServerSession.ts";

type Handlers = Parameters<Parameters<typeof RpcServer.layerServer>[0]>[0];

type SocketData =
  | { type: "session"; session: ServerRpcSession<any> }
  | { type: "pending"; sessionEnv: string | undefined }
  | { type: "parent" };

/** Start the Bun websocket server that carries the sidecar's RPC sessions and parent link. */
export const serve = ({ parentConnected, parentDisconnected, createRpcSession }: Handlers) =>
  Effect.sync(() =>
    Bun.serve<SocketData>({
      port: 0,
      fetch: (request, server) => {
        const url = new URL(request.url);
        if (
          server.upgrade(request, {
            data:
              url.pathname === "/parent"
                ? { type: "parent" }
                : {
                    type: "pending",
                    sessionEnv: url.searchParams.get(SESSION_ENV_PARAM) ?? undefined,
                  },
          })
        ) {
          return;
        }
        return new Response("Upgrade failed", { status: 400 });
      },
      websocket: {
        // Bun closes sockets idle for 120s by default. A session can wait
        // minutes on one provider call, and losing the parent link tears
        // the sidecar down; the parent also sends heartbeats on its link.
        // A dead peer still closes the socket at the TCP level.
        idleTimeout: 0,
        open: (ws) => {
          if (ws.data && ws.data.type === "parent") {
            parentConnected();
          } else {
            const sessionEnv =
              ws.data && ws.data.type === "pending" ? ws.data.sessionEnv : undefined;
            ws.data = {
              type: "session",
              session: createRpcSession(ws, sessionEnv),
            };
          }
        },
        message: (ws, message) => {
          if (ws.data.type === "session") {
            ws.data.session.dispatch.message(message);
          }
        },
        close: (ws, code, reason) => {
          if (ws.data.type === "session") {
            ws.data.session.dispatch.close(code, reason);
          } else if (ws.data.type === "parent") {
            parentDisconnected(`code ${code}${reason ? `, ${reason}` : ""}`);
          }
        },
      },
    }),
  );

/** Stop the server without awaiting it: awaiting `stop(true)` can outlive the process's own shutdown. */
export const stop = (server: Effect.Success<ReturnType<typeof serve>>) =>
  Effect.sync(() => {
    void server.stop(true);
  });
