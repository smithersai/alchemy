import { fileURLToPath } from "node:url";
import * as Effect from "effect/Effect";
import { nodeLoaderArgs } from "../../Util/Node.ts";

/** Set each unset `process.env` key from `env`; a value the caller set wins. */
export const applyDevEnv = (env: Record<string, string>): Effect.Effect<void> =>
  Effect.sync(() => {
    for (const [key, value] of Object.entries(env)) {
      process.env[key] ??= value;
    }
  });

/** The command line that starts `alchemy dev`'s exec child under this runtime. */
export const execChildCommand: Effect.Effect<[string, ...string[]]> = Effect.sync(() => {
  let command: [string, ...string[]];
  const entry = fileURLToPath(import.meta.resolve("alchemy/bin/exec.js"));
  if (typeof globalThis.Bun !== "undefined") {
    command = ["bun", "run", ...process.execArgv, entry];
  } else {
    // Node: the exec entry runs with alchemy's Oxc loader hooks,
    // exactly as bin/cli.js started this process. Select the loader from
    // this module's source or compiled location; the entry is always JS.
    // Node's own TypeScript support is never relied on. `process.execPath`,
    // not "node": the hooks are gated on THIS node's version. A
    // duplicate --import inherited via execArgv is harmless — the
    // second import of the same URL hits the module cache.
    command = [process.execPath, ...process.execArgv, ...nodeLoaderArgs(import.meta.url), entry];
  }
  return command;
});

/** The caller's `NODE_EXTRA_CA_CERTS`, as child environment, when it is set. */
export const extraCaCertsEnv: Effect.Effect<{ NODE_EXTRA_CA_CERTS?: string }> = Effect.sync(() =>
  process.env.NODE_EXTRA_CA_CERTS ? { NODE_EXTRA_CA_CERTS: process.env.NODE_EXTRA_CA_CERTS } : {},
);
