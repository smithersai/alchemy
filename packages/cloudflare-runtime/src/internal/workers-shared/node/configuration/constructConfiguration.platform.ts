import { relative } from "node:path";

/** `file` relative to the process working directory. */
export function relativeToCwd(file: string): string {
  return relative(process.cwd(), file);
}
