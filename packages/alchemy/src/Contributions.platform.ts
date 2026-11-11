import { pathToFileURL } from "node:url";
import * as Effect from "effect/Effect";

/** The `file:` URL of a local path. */
export const fileUrl = (path: string) => Effect.sync(() => pathToFileURL(path).href);

/** The process's working directory. */
export const cwd = Effect.sync(() => process.cwd());

/** Whether this process runs on Bun. */
export const isBun = typeof Bun !== "undefined";
