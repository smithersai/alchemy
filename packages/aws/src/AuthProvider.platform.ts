import * as NodeCrypto from "node:crypto";
import * as NodeOs from "node:os";

/** Hex SHA-1 of a string, as the AWS CLI names its SSO cache files. */
export const sha1Hex = (value: string): string =>
  NodeCrypto.createHash("sha1").update(value).digest("hex");

/** The user's home directory. */
export const homeDirectory = (): string => NodeOs.homedir();
