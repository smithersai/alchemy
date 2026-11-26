import { spawn, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, globSync, mkdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const excludes = [
  "**/node_modules/**",
  "**/.git/**",
  "**/.jj/**",
  "submodules/**",
  ".vibelang-toolchain/**",
  "**/.alchemy/**",
  "**/.cache/**",
];
const targets = process.argv.slice(2).filter((argument) => argument !== "--");
const directories = targets.length
  ? targets.map((target) => {
      const path = resolve(target);
      return statSync(path).isDirectory() ? path : dirname(path);
    })
  : [root];
const files = [
  ...new Set(
    directories.flatMap((directory) =>
      [...globSync("**/*.vibe", { cwd: directory, exclude: excludes })].map((file) =>
        resolve(directory, file),
      ),
    ),
  ),
].sort((left, right) => (left < right ? -1 : left > right ? 1 : 0));
const sidecar = (file) => file.slice(0, -5) + ".d.vibe.ts";
const missing = () => files.filter((file) => !existsSync(sidecar(file)));
const projects = targets.length
  ? targets.map((target) => {
      const path = resolve(target);
      return statSync(path).isDirectory() ? join(path, "tsconfig.json") : path;
    })
  : [
      ...new Set(
        files.map((file) => {
          let directory = dirname(file);
          while (!existsSync(join(directory, "tsconfig.json"))) {
            const parent = dirname(directory);
            if (parent === directory)
              throw new Error("No tsconfig.json for " + relative(root, file));
            directory = parent;
          }
          return join(directory, "tsconfig.json");
        }),
      ),
    ].sort((left, right) => (left < right ? -1 : left > right ? 1 : 0));

if (files.length === 0) {
  console.info("sidecars: no VibeLang sources");
} else {
  const started = Date.now();
  const launcher = join(root, "node_modules/vibelang/bin/vibelang");
  if (!existsSync(launcher))
    throw new Error("Install workspace dependencies before generating sidecars");
  console.info(`sidecars: generating ${files.length} declarations in ${projects.length} projects`);
  const ordered = [];
  const visited = new Set();
  const configs = new Map();
  const visiting = new Set();
  const visit = (project) => {
    project = resolve(project);
    if (statSync(project).isDirectory()) project = join(project, "tsconfig.json");
    if (visited.has(project)) return;
    if (visiting.has(project))
      throw new Error("Circular project reference: " + relative(root, project));
    visiting.add(project);
    const result = spawnSync(process.execPath, [launcher, "--showConfig", "-p", project], {
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
    if (result.status !== 0) throw new Error(result.stdout + result.stderr);
    const config = JSON.parse(result.stdout);
    configs.set(project, config);
    for (const reference of config.references ?? [])
      visit(resolve(dirname(project), reference.path));
    visiting.delete(project);
    visited.add(project);
    ordered.push(project);
  };
  if (!targets.length) visit(join(root, "tsconfig.json"));
  for (const project of projects) visit(project);
  const included = new Set(
    [...configs].flatMap(([project, config]) =>
      (config.files ?? []).map((file) => resolve(dirname(project), file)),
    ),
  );
  files.splice(0, files.length, ...files.filter((file) => included.has(file)));
  const needed = new Set();
  const select = (project) => {
    project = resolve(project);
    if (statSync(project).isDirectory()) project = join(project, "tsconfig.json");
    if (needed.has(project)) return;
    needed.add(project);
    for (const reference of configs.get(project).references ?? [])
      select(resolve(dirname(project), reference.path));
  };
  const nativeFiles = new Set(files);
  for (const [project, config] of configs) {
    if ((config.files ?? []).some((file) => nativeFiles.has(resolve(dirname(project), file))))
      select(project);
  }
  const selected = ordered.filter((project) => needed.has(project));
  console.info(
    "sidecars: generating " +
      files.length +
      " included sources in " +
      selected.length +
      " dependency projects",
  );
  let currentProject = "";
  const heartbeat = setInterval(() => {
    console.info(
      "sidecars: compiling " +
        currentProject +
        " after " +
        Math.round((Date.now() - started) / 1000) +
        "s",
    );
  }, 30_000);
  let failed = false;
  try {
    for (const [index, project] of selected.entries()) {
      currentProject = relative(root, project);
      console.info(
        "sidecars: project " + (index + 1) + "/" + selected.length + " " + relative(root, project),
      );
      const result = await new Promise((done) => {
        const native = (configs.get(project).files ?? []).filter((file) =>
          nativeFiles.has(resolve(dirname(project), file)),
        );
        const cacheDirectory = join(root, ".cache/vibelang-sidecars");
        mkdirSync(cacheDirectory, { recursive: true });
        const cacheName = createHash("sha256").update(project).digest("hex");
        // Keep declaration emission separate from the full checker cache.
        const args = native.length
          ? [
              "-p",
              project,
              "--noCheck",
              "--incremental",
              "--tsBuildInfoFile",
              join(cacheDirectory, cacheName + ".tsbuildinfo"),
            ]
          : ["-b", project];
        const child = spawn(process.execPath, [launcher, ...args], { cwd: root, stdio: "inherit" });
        const interrupt = () => child.kill("SIGINT");
        const terminate = () => child.kill("SIGTERM");
        process.on("SIGINT", interrupt);
        process.on("SIGTERM", terminate);
        child.on("error", (error) => done({ error }));
        child.on("close", (code, signal) => {
          process.off("SIGINT", interrupt);
          process.off("SIGTERM", terminate);
          done({ code, signal });
        });
      });
      if (result.code !== 0) {
        console.error(
          "sidecars: failed " +
            relative(root, project) +
            " (" +
            (result.error?.message ?? result.signal ?? result.code) +
            ")",
        );
        process.exitCode = result.code ?? 1;
        failed = true;
        break;
      }
    }
  } finally {
    clearInterval(heartbeat);
  }
  if (!failed) {
    const absent = missing();
    if (absent.length) {
      console.error(
        "sidecars: missing declarations:\n" +
          absent
            .slice(0, 10)
            .map((file) => relative(root, file))
            .join("\n"),
      );
      process.exitCode = 1;
    } else {
      console.info(
        "sidecars: " +
          files.length +
          " declarations ready in " +
          Math.round((Date.now() - started) / 1000) +
          "s",
      );
    }
  }
}
