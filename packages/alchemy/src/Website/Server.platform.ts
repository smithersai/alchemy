import * as NodeNet from "node:net";
import * as Effect from "effect/Effect";
import { moduleExtension } from "../Util/Node.ts";

/**
 * Try to bind `port` on `host`; resolves `true` when the port is free.
 * The listener is closed immediately — the port is only observed
 * available, not reserved, so the caller should bind promptly and the
 * framework still handles the (tiny) race window itself.
 */
export const isPortFree = (port: number, host: string) =>
  Effect.callback<boolean>((resume) => {
    const server = NodeNet.createServer();
    server.unref();
    server.once("error", () => resume(Effect.succeed(false)));
    server.listen(port, host, () => {
      server.close(() => resume(Effect.succeed(true)));
    });
  });

/** Set each defined value of `env` on this process's environment. */
export const setProcessEnv = (env: Record<string, string | undefined>) =>
  Effect.sync(() => {
    for (const [key, value] of Object.entries(env)) {
      if (value === undefined) continue;
      process.env[key] = String(value);
    }
  });

/**
 * The `ServerLocal` module beside this one, with the extension of this
 * runtime's layout (`.ts` from source, `.js` from the compiled `lib/`).
 * Resolved once, when this module loads.
 */
export const serverLocalModule: string = import.meta.resolve(
  `./ServerLocal${moduleExtension(import.meta.url)}`,
  import.meta.url,
);
