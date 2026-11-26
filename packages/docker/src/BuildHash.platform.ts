// Host access for BuildHash.vibe: the SHA-256 hasher.
import * as crypto from "node:crypto";

/** A new incremental SHA-256 hash. */
export const createSha256 = () => crypto.createHash("sha256");
