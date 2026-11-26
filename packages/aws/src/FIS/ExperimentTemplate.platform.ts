import * as crypto from "node:crypto";
export const randomUuid = (): string => crypto.randomUUID();
