import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import { type ModuleLoadError } from "../core/Loader.vibe";
import { type VinextBuildConfig } from "./BuildConfig.vibe";
export type VinextPrerenderResult = {
    readonly ran: boolean;
    /** Absolute path of the RSC worker entry after path-table injection. */
    readonly entryPath?: string;
};
/**
 * After `vite build`, run vinext's prerender phase when the project
 * configured `vinext({ prerender: true })` (or `{ routes: "*" }`).
 *
 * Alchemy's Website Vite path only runs `vite build`, which vinext does
 * not prerender by itself — that step lives in `vinext build`. This hook
 * is not a reimplementation: it resolves the project's `vinext` and calls
 * `runPrerender` / `emitPrerenderPathManifest`. The path-table injection
 * is the only Alchemy-owned glue.
 */
export declare const runVinextPrerenderIfConfigured: (rootDir: string, cache?: "kv" | "redis" | "s3", buildConfig?: VinextBuildConfig | undefined) => Effect.Effect<{
    ran: false;
    entryPath?: undefined;
} | {
    ran: true;
    entryPath: string | undefined;
}, ModuleLoadError | import("effect/PlatformError").PlatformError | SyntaxError | import("effect/Cause").UnknownError, FileSystem.FileSystem | Path.Path>;
/** Absolute path to the project's `vinext` package root. */
export declare const resolveVinextRoot: (root: string) => Effect.Effect<string, ModuleLoadError>;
