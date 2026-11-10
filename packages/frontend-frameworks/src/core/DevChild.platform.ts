import * as NodeChildProcess from "node:child_process";
import { fileURLToPath } from "node:url";
import * as SemVer from "effect/SemVer";
import * as SemVerRange from "effect/SemVerRange";

/** `true` when `key` is set to `"1"` in this process's environment. */
export const envFlagIsSet = (key: string): boolean => process.env[key] === "1";

/**
 * Node CLI flags that transparently strip TypeScript types, so the `.ts`
 * runner entry works when running from `src/` under plain Node (Bun handles
 * `.ts` natively). Mirrors `core/BuildChild.ts`.
 */
const transformTypesFlags = (): Array<string> =>
  SemVerRange.matches(
    SemVerRange.parseUnsafe(">=22.7.0 <26.0.0-0"),
    SemVer.parseUnsafe(process.versions.node),
    { includePrerelease: true },
  )
    ? ["--experimental-transform-types", "--no-warnings=ExperimentalWarning"]
    : [];

/**
 * Flags that load `.vibe` modules from source in a child whose entry is a
 * `src/` module: VibeLang's Bun preload, or its Node loader hooks. A built
 * `dist/` entry is JavaScript and gets none.
 */
const vibeLangLoaderFlags = (entry: string, isBun: boolean): Array<string> =>
  entry.endsWith(".ts")
    ? isBun
      ? ["--preload", fileURLToPath(import.meta.resolve("vibelang/bun"))]
      : ["--import", import.meta.resolve("vibelang/register")]
    : [];

/** The executable and arguments that run the shared dev-child runner with `payload`. */
export const devChildCommand = (options: {
  readonly runtime?: "node" | undefined;
  readonly callerUrl: string;
  readonly payload: string;
}): { readonly executable: string; readonly args: Array<string> } => {
  const entry = fileURLToPath(
    new URL(
      options.callerUrl.endsWith(".ts") ? "../core/DevChildRunner.ts" : "../core/DevChildRunner.js",
      options.callerUrl,
    ),
  );
  const isBun =
    options.runtime !== "node" && typeof (globalThis as { Bun?: unknown }).Bun !== "undefined";
  const executable = options.runtime === "node" ? "node" : process.execPath;
  const args = [
    ...(isBun
      ? ["run"]
      : entry.endsWith(".ts") && options.runtime !== "node"
        ? transformTypesFlags()
        : []),
    ...vibeLangLoaderFlags(entry, isBun),
    entry,
    options.payload,
  ];
  return { executable, args };
};

export interface DevChildHandle {
  readonly child: NodeChildProcess.ChildProcess;
  exited: boolean;
  output: string;
}

/** Spawn the dev child with `cwd` and `envKey=1`; `onError` receives spawn errors. */
export const spawnDevChild = (
  executable: string,
  args: Array<string>,
  cwd: string,
  envKey: string,
  onError: (cause: Error) => void,
): DevChildHandle => {
  const child = NodeChildProcess.spawn(executable, args, {
    cwd,
    stdio: ["ignore", "pipe", "pipe"],
    detached: false,
    env: { ...process.env, [envKey]: "1" },
  });
  const handle: DevChildHandle = { child, exited: false, output: "" };
  child.on("error", onError);
  child.once("exit", () => {
    handle.exited = true;
  });
  return handle;
};

/** Stop the dev child (SIGTERM, then SIGKILL after 3 s); `done` runs once it has exited. */
export const stopDevChild = (
  child: NodeChildProcess.ChildProcess,
  exited: boolean,
  done: () => void,
): void => {
  if (child.pid === undefined || exited || child.exitCode !== null) {
    done();
    return;
  }
  const killTimer = setTimeout(() => child.kill("SIGKILL"), 3000);
  child.once("exit", () => {
    clearTimeout(killTimer);
    done();
  });
  child.kill("SIGTERM");
};
