import { spawnSync } from "node:child_process";
import { readdirSync, existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
function runCompiler(compiler, args, options) {
  if (compiler) return spawnSync(compiler, args, options);
  const manifestPath = require.resolve("vibelang/package.json");
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const entry = typeof manifest.bin === "string" ? manifest.bin : manifest.bin.vibelang;
  return spawnSync(process.execPath, [resolve(dirname(manifestPath), entry), ...args], options);
}

const ignored = new Set([
  "node_modules",
  ".git",
  ".jj",
  "submodules",
  ".repos",
  ".vibelang-toolchain",
  ".cache",
  ".alchemy",
  ".turbo",
  ".next",
  ".output",
  "coverage",
]);

/** Every first-party .vibe source, including tests and source directories named lib. */
export function vibeFiles(root) {
  const files = [];
  function walk(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      if (ignored.has(entry.name)) continue;
      const path = join(directory, entry.name);
      if (entry.isDirectory()) {
        const parts = relative(root, path).split(sep);
        if (["dist", "lib", "build"].includes(entry.name) && !parts.includes("src")) continue;
        walk(path);
      } else if (entry.isFile() && entry.name.endsWith(".vibe")) {
        files.push(resolve(path));
      }
    }
  }
  walk(resolve(root));
  return files.sort((a, b) => a.localeCompare(b));
}

const projectName = (path) => {
  if (existsSync(path) && !path.endsWith(".json")) return join(path, "tsconfig.json");
  return path;
};

/** Resolve source ownership through the compiler, including solution-style projects. */
export function vibeProjects(root, compiler = process.env.VIBELANG_BINARY) {
  root = resolve(root);
  const files = vibeFiles(root);
  const cache = new Map();
  function config(path) {
    path = resolve(projectName(path));
    if (cache.has(path)) return cache.get(path);
    const result = runCompiler(compiler, ["-p", path, "--showConfig", "--pretty", "false"], {
      cwd: root,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
    if (result.error || result.status !== 0) {
      throw new Error(
        "Cannot read " +
          relative(root, path) +
          ": " +
          (result.error?.message || result.stdout + result.stderr),
      );
    }
    const parsed = JSON.parse(result.stdout);
    const record = {
      path,
      files: new Set((parsed.files || []).map((file) => resolve(dirname(path), file))),
    };
    cache.set(path, record);
    record.references = (parsed.references || []).map((ref) => resolve(dirname(path), ref.path));
    return record;
  }
  function owners(path, file, seen = new Set()) {
    path = resolve(projectName(path));
    if (seen.has(path)) return [];
    seen.add(path);
    const project = config(path);
    const own = project.files.has(file) ? [project.path] : [];
    for (const reference of project.references) own.push(...owners(reference, file, seen));
    return own;
  }
  const projects = new Set();
  for (const file of files) {
    let directory = dirname(file);
    let found = [];
    for (;;) {
      const candidates = readdirSync(directory)
        .filter(
          (name) =>
            name === "vibe.config.json" ||
            name === "jsconfig.json" ||
            /^tsconfig(?:\..+)?\.json$/.test(name),
        )
        .sort(
          (a, b) =>
            Number(b === "vibe.config.json") - Number(a === "vibe.config.json") ||
            a.localeCompare(b),
        );
      for (const name of candidates) found.push(...owners(join(directory, name), file));
      if (found.length || directory === root) break;
      const parent = dirname(directory);
      if (parent === directory || relative(root, parent).startsWith("..")) break;
      directory = parent;
    }
    if (!found.length) throw new Error("No TypeScript project includes " + relative(root, file));
    for (const project of found) projects.add(project);
  }
  return { files, projects: [...projects].sort((a, b) => a.localeCompare(b)) };
}

export function checkVibe(root = process.cwd(), compiler = process.env.VIBELANG_BINARY) {
  const { files, projects } = vibeProjects(root, compiler);
  console.log(
    "[vibe:typecheck] " + files.length + " source file(s), " + projects.length + " project(s)",
  );
  let status = 0;
  for (const project of projects) {
    console.log("[vibe:typecheck] " + relative(root, project));
    const result = runCompiler(compiler, ["-p", project, "--noEmit", "--pretty", "false"], {
      cwd: root,
      stdio: "inherit",
    });
    if (result.error) throw result.error;
    if (result.status !== 0) status = result.status || 1;
  }
  return status;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    process.exitCode = checkVibe(process.cwd());
  } catch (error) {
    console.error("[vibe:typecheck] " + error.message);
    process.exitCode = 1;
  }
}
