import * as crypto from "node:crypto";

export function createHash(algorithm: string) { return crypto.createHash(algorithm); }
