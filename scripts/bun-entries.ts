import { existsSync, mkdirSync } from "node:fs";
import { isBuiltin } from "node:module";
import { dirname, isAbsolute, join, resolve } from "node:path";
import * as rolldown from "rolldown";

type WorkerFactory = (options: {
  readonly nested: (entry: string) => Promise<rolldown.InputOptions>;
  readonly loadRolldown: () => Promise<typeof rolldown>;
}) => rolldown.Plugin;

const workerQuery = /(\?|&)worker(?:&|$)/;
const workerResolve = "alchemy:bun-entry-worker";
const nativeOutput = (file: string): string => {
  if (!/\.(vibe|tsx?)$/.test(file)) return file;
  const normalized = file.replaceAll("\\", "/");
  const marker = normalized.lastIndexOf("/src/");
  if (marker < 0) throw new Error("Bun entry has no native source mapping: " + file);
  const output =
    normalized.slice(0, marker) +
    "/lib/" +
    normalized.slice(marker + 5).replace(/\.(vibe|tsx?)$/, ".js");
  if (!existsSync(output))
    throw new Error("Bun entry needs its native output built first: " + output);
  return output;
};

/**
 * Compile an entry with source TypeScript import elision, retaining the native
 * module identities of its ordinary dependencies. Worker resources use the
 * existing worker-module plugin and an isolated nested bundle.
 */
export const buildBunEntries = async (
  directory: string,
  entries: ReadonlyArray<string>,
): Promise<void> => {
  const source = new URL(
    "../packages/cloudflare/src/Workers/Sources/WorkerModulePlugin.ts",
    import.meta.url,
  );
  const { workerModulePlugin } = (await import(source.href)) as {
    readonly workerModulePlugin: WorkerFactory;
  };
  for (const subpath of entries) {
    if (subpath.startsWith("/") || subpath.split("/").includes("..")) {
      throw new Error("Bun entry must be a package-relative source path: " + subpath);
    }
    const entry = join(directory, "src", subpath + ".ts");
    const output = join(directory, "lib-bun", subpath + ".js");
    mkdirSync(dirname(output), { recursive: true });
    const nativeVibe: rolldown.Plugin = {
      name: "alchemy:bun-entry-native-vibe",
      async resolveId(id, importer) {
        if (workerQuery.test(id)) return null;
        const found = await this.resolve(id, importer, { skipSelf: true });
        if (found && !found.external && found.id.endsWith(".vibe")) {
          return nativeOutput(found.id);
        }
        return null;
      },
    };
    const entryOnly: rolldown.Plugin = {
      name: "alchemy:bun-entry-dependencies",
      resolveId(id, importer, options) {
        if (options.custom?.[workerResolve] || workerQuery.test(id)) return null;
        if (!id.startsWith(".") && !isAbsolute(id)) return { id, external: true };
        if (!importer) return null;
        if (/[?#]/.test(id)) throw new Error("Unsupported Bun entry resource query: " + id);
        return { id: nativeOutput(resolve(dirname(importer), id)), external: "relative" };
      },
    };
    const worker = workerModulePlugin({
      nested: async () => ({
        cwd: directory,
        external: (id) => isBuiltin(id),
        plugins: [worker, nativeVibe],
      }),
      loadRolldown: async () => rolldown,
    });
    const hook = worker.resolveId;
    if (!hook || typeof hook === "function") {
      throw new Error("Worker module plugin has no resource resolver");
    }
    const original = hook.handler;
    hook.handler = function (id, importer, options) {
      const context = new Proxy(this, {
        get(target, key, receiver) {
          if (key === "resolve") {
            return (
              source: string,
              from: string | undefined,
              opts?: rolldown.PluginContextResolveOptions,
            ) =>
              target.resolve(source, from, {
                ...opts,
                custom: { ...opts?.custom, [workerResolve]: true },
              });
          }
          return Reflect.get(target, key, receiver);
        },
      });
      return original.call(context, id, importer, options);
    };
    console.log("[bun-entry] " + subpath + ": bundle");
    const bundle = await rolldown.rolldown({
      cwd: directory,
      input: entry,
      plugins: [worker, entryOnly],
      treeshake: false,
    });
    try {
      await bundle.write({ file: output, format: "esm", keepNames: true, sourcemap: false });
    } finally {
      await bundle.close();
    }
    console.log("[bun-entry] " + subpath + ": ready");
  }
};
