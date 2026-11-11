import { createHash } from "node:crypto";
import * as Effect from "effect/Effect";

/** SHA-256 hex digest of a variable's plain value, computed with the host's crypto. */
export const digestOf = (plain: string) =>
  Effect.sync(() => createHash("sha256").update(Buffer.from(plain, "utf8")).digest("hex"));
