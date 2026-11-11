import * as Effect from "effect/Effect";

/** `process.env[name]`, read at the call. */
export const envValue = (name: string): string | undefined => process.env[name];

/** Write one line to stderr. */
export const writeStderrLine = (line: string) => process.stderr.write(`${line}\n`);

/** This process's id, read when the Effect runs. */
export const processId = Effect.sync(() => process.pid);

/** The `run` record's description of this process, read at the call. */
export const processDescription = () => ({
  pid: process.pid,
  cwd: process.cwd(),
  argv: process.argv.slice(2),
});
