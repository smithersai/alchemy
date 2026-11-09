import { createHash } from "node:crypto";
import * as Effect from "effect/Effect";

/** SHA-256 hex digest of a Function's source, with the host's crypto. */
export const hashSource = (source: string) =>
  Effect.sync(() => createHash("sha256").update(source).digest("hex"));

/** Base64 of the source's UTF-8 bytes, for the canvas start command. */
export const encodeSourceBase64 = (source: string) =>
  Effect.sync(() => Buffer.from(source, "utf8").toString("base64"));
