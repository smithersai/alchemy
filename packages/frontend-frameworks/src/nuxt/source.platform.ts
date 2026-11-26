import * as NodeCrypto from "node:crypto";
import * as NodePath from "node:path";
import { fileURLToPath } from "node:url";

/** Hex sha256 of `input`. */
export const sha256HexSync = (input: string | Uint8Array): string =>
  NodeCrypto.createHash("sha256").update(input).digest("hex");

export const joinPath = (...segments: Array<string>): string => NodePath.join(...segments);

export const dirnamePath = (path: string): string => NodePath.dirname(path);

export const relativePath = (from: string, to: string): string => NodePath.relative(from, to);

export const resolvePath = (...segments: Array<string>): string => NodePath.resolve(...segments);

/** The process working directory. */
export const currentDirectory = (): string => process.cwd();

/** This package's `package.json`, two directories above this module. */
export const packageJsonPath = (): string =>
  NodePath.join(NodePath.dirname(fileURLToPath(import.meta.url)), "../../package.json");
