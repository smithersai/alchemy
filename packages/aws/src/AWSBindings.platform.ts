import { createHash } from "node:crypto";
import * as Effect from "effect/Effect";

/** The 12-hex-digit SHA-256 prefix of a host FQN, for federated role names. */
export const roleNameHash = (fqn: string): Effect.Effect<string> =>
  Effect.sync(() => createHash("sha256").update(fqn).digest("hex").slice(0, 12));
