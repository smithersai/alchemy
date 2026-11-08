import type { Stats } from "node:fs";
import * as NodeFs from "node:fs/promises";

export function statPath(path: string): Promise<Stats> {
  return NodeFs.stat(path);
}

export function readFileBytes(path: string): Promise<Buffer> {
  return NodeFs.readFile(path);
}

export function readFileUtf8(path: string): Promise<string> {
  return NodeFs.readFile(path, "utf-8");
}

/** Copies `source` into a Node `Buffer`. */
export function toBuffer(source: Uint8Array): Buffer {
  return Buffer.from(source);
}

/** Resolves after `ms` milliseconds. */
export function delay(ms: number): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
