import * as NodePath from "node:path";
import type * as Effect from "effect/Effect";
import type * as Vite from "vite";
import { toOutputFile, type OutputFile } from "./BuildOutput.ts";

/**
 * Module names in a BuildOutput are always POSIX-separated — they become
 * workerd module names and worker-upload paths, where `\` is never valid.
 * Filesystem paths stay platform-native; only names go through this.
 */
export const toModuleName = (...segments: Array<string>): string =>
  NodePath.join(...segments).replaceAll("\\", "/");

/** `NodePath.resolve(path)`, POSIX-separated. */
export const resolvePosixPath = (path: string): string =>
  NodePath.resolve(path).replaceAll("\\", "/");

export const joinPath = (...segments: Array<string>): string => NodePath.join(...segments);

export const dirnamePath = (path: string): string => NodePath.dirname(path);

export const relativePath = (from: string, to: string): string => NodePath.relative(from, to);

// `@vitejs/plugin-rsc` writes these modules separately after build completes instead of emitting them as chunks.
// So, we need to detect them and read them from the file system manually.
const RSC_MANIFEST = {
  "virtual:vite-rsc/assets-manifest": "__vite_rsc_assets_manifest.js",
  "virtual:vite-rsc/environment-imports": "__vite_rsc_env_imports_manifest.js",
} as const;
type RscManifestId = keyof typeof RSC_MANIFEST;

const isRscManifestId = (id: string): id is RscManifestId => id in RSC_MANIFEST;

/** The entry-chunk information `CollectorOptions.selectEntry` receives. */
interface ServerEntryChunk {
  readonly fileName: string;
  readonly name: string;
  readonly facadeModuleId: string | null;
}

/** What the collector plugin records while the build runs. */
export interface CollectorPluginState<E> {
  distDirectory: string | undefined;
  clientDirectory: string | undefined;
  serverEntry: string | undefined;
  serverEntryPriority: number;
  readonly serverModules: Map<string, Effect.Effect<OutputFile, E>>;
  readonly serverOutputs: Map<string, { root: string; outDir: string }>;
  readonly externalDirectories: Set<string>;
}

export interface CollectorPluginOptions<E> {
  readonly entryEnvironment: string;
  readonly clientEnvironment: string;
  readonly skipEnvironments: Set<string>;
  readonly selectEntry: ((chunk: ServerEntryChunk) => boolean) | undefined;
  readonly workerEntryPrefix: string;
  readonly readFile: (path: string, name: string) => Effect.Effect<OutputFile, E>;
}

/** The `alchemy:build-output` Vite plugin, recording into `state`. */
export const makeCollectorPlugin = <E>(
  state: CollectorPluginState<E>,
  options: CollectorPluginOptions<E>,
) =>
  ({
    name: "alchemy:build-output",
    sharedDuringBuild: true,
    configResolved(config) {
      state.distDirectory ??= NodePath.resolve(config.root, config.build.outDir);
    },
    writeBundle(_, bundle) {
      const environment = this.environment.name;
      if (options.skipEnvironments.has(environment)) {
        return;
      }
      // Vite module ids are POSIX-separated even on Windows, so normalize
      // the root the same way before the prefix comparison.
      const root = NodePath.resolve(this.environment.config.root).replaceAll("\\", "/");
      for (const id of this.getModuleIds()) {
        const posixId = id.replaceAll("\\", "/");
        if (
          !NodePath.isAbsolute(id) ||
          posixId.includes("node_modules") ||
          posixId.startsWith(root)
        ) {
          continue;
        }
        state.externalDirectories.add(NodePath.dirname(id));
      }
      const outDir = NodePath.resolve(root, this.environment.config.build.outDir);
      if (environment === options.clientEnvironment) {
        state.clientDirectory = outDir;
        return;
      }
      state.serverOutputs.set(environment, { root, outDir });
      const prefix = NodePath.relative(state.distDirectory ?? root, outDir);
      for (const file of Object.values(bundle)) {
        // Vite's build metadata (`.vite/manifest.json`), not a Worker module.
        if (file.fileName.startsWith(".vite/")) continue;
        const name = toModuleName(prefix, file.fileName);
        const content = file.type === "chunk" ? file.code : file.source;
        state.serverModules.set(name, toOutputFile(name, content));
        if (file.type === "chunk") {
          if (environment === options.entryEnvironment && file.isEntry) {
            // Deterministic entry selection: an explicitly selected chunk
            // wins over the wrapped worker-entry facade, which wins over any
            // other entry chunk. Some frameworks emit multiple entry chunks
            // in the entry environment (e.g. Waku's `index` + `build`), and
            // only the configured main is guaranteed to be a worker module.
            const chunk: ServerEntryChunk = {
              fileName: file.fileName,
              name,
              facadeModuleId: file.facadeModuleId,
            };
            const priority = options.selectEntry?.(chunk)
              ? 3
              : file.facadeModuleId?.startsWith(options.workerEntryPrefix)
                ? 2
                : 1;
            if (priority >= state.serverEntryPriority) {
              state.serverEntry = name;
              state.serverEntryPriority = priority;
            }
          }
          for (const id of file.imports) {
            if (!isRscManifestId(id)) continue;
            const fileName = RSC_MANIFEST[id];
            const manifestName = toModuleName(prefix, fileName);
            if (state.serverModules.has(manifestName)) continue;
            state.serverModules.set(
              manifestName,
              options.readFile(NodePath.resolve(outDir, fileName), manifestName),
            );
          }
        }
      }
      if (environment === options.entryEnvironment && !state.serverEntry) {
        throw new Error("Server entry not found");
      }
    },
  }) satisfies Vite.Plugin;
