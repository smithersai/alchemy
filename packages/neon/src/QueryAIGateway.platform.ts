import { createHash } from "node:crypto";
import * as Effect from "effect/Effect";

/** @throws {never} */
export function sha256Hex(input: string): Effect.Effect<string> {
  return Effect.sync(() => createHash("sha256").update(input).digest("hex"));
}
