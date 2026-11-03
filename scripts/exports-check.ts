import { readdir, readFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";

export interface InternalReference {
  readonly file: string;
  readonly line: number;
  readonly specifier: string;
}

async function sourceFiles(directory: string): Promise<string[]> {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
  const files: string[] = [];
  for (const entry of entries) {
    if (["node_modules", ".git", ".jj", ".cache"].includes(entry.name)) continue;
    const file = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await sourceFiles(file)));
    else if (
      entry.isFile() &&
      /\.(?:[cm]?[jt]sx?|vibex?)$/.test(entry.name) &&
      !/\.d\.vibex?\.ts$/.test(entry.name)
    )
      files.push(file);
  }
  return files;
}

// Preserve the source-only boundary rule for quoted package references,
// including references in .vibe files and inline TypeScript bodies.
export async function findInternalReferences(
  root: string,
  packageDirectories: readonly string[],
  blockedPackages: readonly string[],
): Promise<InternalReference[]> {
  if (blockedPackages.length === 0) return [];
  const files: string[] = [];
  for (const directory of packageDirectories) {
    files.push(...(await sourceFiles(join(root, "packages", directory, "src"))));
  }
  files.push(...(await sourceFiles(join(root, "examples"))));
  const found: InternalReference[] = [];
  for (const file of files) {
    const text = await readFile(file, "utf8");
    for (const match of text.matchAll(/(['"])([^'"\r\n]+)\1/g)) {
      const specifier = match[2]!;
      if (
        !blockedPackages.some(
          (name) =>
            specifier.startsWith(name + "/") &&
            specifier
              .slice(name.length + 1)
              .split("/")
              .includes("internal"),
        )
      )
        continue;
      found.push({
        file: relative(root, file).split(sep).join("/"),
        line: text.slice(0, match.index).split("\n").length,
        specifier,
      });
    }
  }
  return found;
}
