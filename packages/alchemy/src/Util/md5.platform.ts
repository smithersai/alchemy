import { createHash } from "node:crypto";
import * as Effect from "effect/Effect";

export const md5Digest = (data: string | Uint8Array): Effect.Effect<string> =>
  Effect.sync(() => createHash("md5").update(data).digest("hex"));
