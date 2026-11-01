import * as Effect from "effect/Effect";
import { ModuleLoadError } from "../core/Loader.vibe";
/** Vinext exposes import-only entrypoints that require.resolve cannot resolve. */
export declare const loadVinextModule: <T>(root: string, file: string) => Effect.Effect<unknown, ModuleLoadError | import("effect/Cause").UnknownError, never>;
