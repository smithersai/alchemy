import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import { type BuildOutput } from "./BuildOutput.vibe";
import { DeployTargetError, type DeployTarget } from "./DeployTarget.vibe";
import { type NodeServeEntryOptions } from "./NodeServe.vibe";
/** Fetch entry emitted for Neon Functions; no listening socket is created. */
export declare const NEON_SERVE_ENTRY_FILE_NAME = "serve-neon.mjs";
/** Generate a Node 24 Fetch module from a framework's portable handler description. */
export declare const makeNeonServeEntrySource: (options: NodeServeEntryOptions) => string;
/** Replace a Node target's listening wrapper with a Fetch wrapper, preserving its actual framework build. */
export declare const finishNeonOutput: (output: BuildOutput) => Effect.Effect<BuildOutput, DeployTargetError, FileSystem.FileSystem | Path.Path>;
/** Reuse framework build/configuration hooks while selecting Neon's Fetch runtime. */
export declare const makeNeonTarget: <T extends DeployTarget>(node: T) => T;
