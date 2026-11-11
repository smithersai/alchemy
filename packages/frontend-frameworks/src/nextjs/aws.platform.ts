import type * as NodeChildProcessModule from "node:child_process";
import { createRequire } from "node:module";
import type * as NodeNet from "node:net";

/** `require.resolve(specifier)` from the project at `root`. */
export const resolveFromProject = (root: string, specifier: string): string => {
  const require = createRequire(`${root.replace(/\/+$/, "")}/package.json`);
  return require.resolve(specifier);
};

/** A copy of this process's environment. */
export const processEnv = (): NodeJS.ProcessEnv => ({ ...process.env });

/** The process working directory. */
export const currentDirectory = (): string => process.cwd();

/** Allocate an ephemeral port on 127.0.0.1; exactly one of the callbacks runs. */
export const probeEphemeralPort = (
  onPort: (port: number) => void,
  onError: (cause: unknown, noAddress: boolean) => void,
): void => {
  const net = createRequire(import.meta.url)("net") as typeof NodeNet;
  const server = net.createServer();
  server.once("error", (cause) => onError(cause, false));
  server.listen(0, "127.0.0.1", () => {
    const address = server.address();
    if (address === null || typeof address === "string") {
      server.close();
      onError(null, true);
      return;
    }
    const port = address.port;
    server.close(() => onPort(port));
  });
};

interface ChildOutputSink {
  readonly stdout: { push(text: string): void; flush(): void };
  readonly stderr: { push(text: string): void; flush(): void };
}

/** Spawn `node <cli> dev -p <port>` in `root`, forwarding its output into `childOutput`. */
export const spawnNextCli = (
  options: {
    readonly root: string;
    readonly cli: string;
    readonly port: number;
    readonly host?: string | undefined;
  },
  childOutput: ChildOutputSink,
) => {
  const cp = createRequire(import.meta.url)("child_process") as typeof NodeChildProcessModule;
  const child = cp.spawn(
    "node",
    [
      options.cli,
      "dev",
      "-p",
      String(options.port),
      ...(options.host !== undefined ? ["-H", options.host] : []),
    ],
    {
      cwd: options.root,
      stdio: ["ignore", "pipe", "pipe"],
      detached: false,
    },
  );
  let exited = false;
  let output = "";
  const capture = (chunk: unknown) => {
    output += String(chunk);
    if (output.length > 65536) output = output.slice(-32768);
  };
  child.stdout?.on("data", (chunk: unknown) => {
    capture(chunk);
    childOutput.stdout.push(String(chunk));
  });
  child.stderr?.on("data", (chunk: unknown) => {
    capture(chunk);
    childOutput.stderr.push(String(chunk));
  });
  // Output without a trailing newline is still a line once the
  // streams close.
  child.once("close", () => {
    childOutput.stdout.flush();
    childOutput.stderr.flush();
  });
  child.once("exit", () => {
    exited = true;
  });
  return {
    child,
    handle: {
      exited: () => exited,
      output: () => output,
    },
  };
};

/** SIGTERM the child (SIGKILL after 3 s); `done` runs once it has exited. */
export const stopChild = (child: NodeChildProcessModule.ChildProcess, done: () => void): void => {
  if (child.exitCode !== null) {
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

/** `true` once `url` answers with any HTTP status (2 s per attempt). */
export const probeHttp = async (url: string): Promise<boolean> => {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(2000),
  });
  return response.status < 600;
};
