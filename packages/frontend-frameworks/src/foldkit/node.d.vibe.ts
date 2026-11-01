import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import { type FoldkitTarget, type FoldkitTargetConfig } from "./Foldkit.vibe";
/** Isolate Vite configuration execution from the deployment process. */
export declare const buildInChild: (input: {
    readonly rootDir: string;
    readonly config: FoldkitTargetConfig;
}) => Effect.Effect<import("../core/BuildOutput.vibe").BuildOutput, import("../core/Framework.vibe").FrameworkError, FileSystem.FileSystem | Path.Path>;
export declare const makeNodeTarget: (config?: FoldkitTargetConfig) => FoldkitTarget;
export declare const target: typeof makeNodeTarget;
export default makeNodeTarget;
