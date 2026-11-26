import * as crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import * as Effect from "effect/Effect";

/** `main` as a filesystem path: a `file://` URL is converted, anything else is returned unchanged. */
export const mainAsPath = (main: string) =>
  Effect.sync(() => {
    try {
      return fileURLToPath(main);
    } catch {
      return main;
    }
  });

/** An 8-character random nonce for a bundle staging directory name. */
export const randomNonce = (): string => crypto.randomUUID().slice(0, 8);

/** The process's current working directory, read at call time. */
export const currentDirectory = (): string => process.cwd();
