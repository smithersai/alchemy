import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import * as Path from "effect/Path";
import * as Schema from "effect/Schema";
import type { Plugin } from "vite";
import * as Core from "../core/index.js";
import type { NodeServeHtmlHandling, NodeServeNotFoundHandling } from "../core/NodeServe.vibe";
import { type ViteBuildConfig } from "../vite/Vite.vibe";
/** The completed-build contract exposed by @foldkit/vite-plugin >= 0.25.0. */
export declare const BuildMetadata: Schema.Struct<{
    readonly root: Schema.String;
    readonly clientDirectory: Schema.String;
    readonly serverDirectory: Schema.String;
    readonly serverEntry: Schema.String;
    readonly manifest: Schema.Struct<{
        readonly schemaVersion: Schema.Literals<readonly [1]>;
        readonly client: Schema.String;
        readonly server: Schema.String;
        readonly serverEntry: Schema.String;
        readonly prerendered: Schema.$Array<Schema.String>;
    }>;
}>;
export type BuildMetadata = typeof BuildMetadata.Type;
export interface FoldkitTargetConfig {
    /** Serializable overrides for the project's Vite configuration. */
    readonly vite?: ViteBuildConfig | undefined;
    /** AWS topology: browser-only, prerendered assets, or a server with assets. Omit for automatic detection. */
    readonly output?: "spa" | "static" | "server" | undefined;
    /** Override the default SPA fallback for browser-only builds. */
    readonly notFoundHandling?: NodeServeNotFoundHandling | undefined;
    /** Override static HTML routing. */
    readonly htmlHandling?: NodeServeHtmlHandling | undefined;
}
export interface FoldkitTarget extends Core.DeployTarget<FoldkitTargetConfig> {
}
export type FoldkitTargetInput = Core.DeployTargetInput<FoldkitTarget, FoldkitTargetConfig>;
export interface FoldkitOptions extends FoldkitTargetConfig {
    /** Project directory. @default process.cwd() */
    readonly root?: string | undefined;
    /** Deployment target. @default "@alchemy.run/frontend-frameworks/foldkit/aws" */
    readonly target?: FoldkitTargetInput | undefined;
    /** Native Vite development server options. */
    readonly dev?: {
        readonly port?: number | undefined;
    } | undefined;
}
export declare const DEFAULT_TARGET_SPECIFIER = "@alchemy.run/frontend-frameworks/foldkit/aws";
interface ViteBuilder {
    readonly config: {
        readonly root: string;
        readonly base: string;
        readonly plugins: ReadonlyArray<Pick<Plugin, "name" | "api">>;
        readonly build: {
            readonly outDir: string;
        };
    };
    readonly environments: Record<string, {
        readonly config: {
            readonly root: string;
            readonly base: string;
            readonly build: {
                readonly outDir: string;
            };
        };
    }>;
    readonly buildApp: () => Promise<unknown>;
    readonly build: (environment: unknown) => Promise<unknown>;
}
/** Capture the plugin API before building, but only read it after buildApp succeeds. */
export declare const metadataReader: (plugins: ViteBuilder["config"]["plugins"]) => (() => {
    readonly root: string;
    readonly clientDirectory: string;
    readonly serverDirectory: string;
    readonly serverEntry: string;
    readonly manifest: {
        readonly schemaVersion: 1;
        readonly client: string;
        readonly server: string;
        readonly serverEntry: string;
        readonly prerendered: readonly string[];
    };
}) | undefined;
/** Package only deployment artifacts, including independently configured client/server directories. */
export declare const readFoldkitOutput: (root: string, clientDirectory: string, metadata?: BuildMetadata, output?: FoldkitTargetConfig["output"]) => Effect.Effect<{
    output: {
        distDirectory: string;
        clientDirectory: string;
        serverModules: undefined;
        externalWorkspaces: Set<string>;
    };
    entry: undefined;
} | {
    output: {
        distDirectory: string;
        clientDirectory: string;
        serverModules: Core.OutputFile[];
        externalWorkspaces: Set<string>;
    };
    entry: string;
}, Core.FrameworkError, FileSystem.FileSystem | Path.Path>;
/** Build with the project's plugin and host its native development server. */
export declare const make: (options?: FoldkitOptions) => Effect.Effect<Core.Framework["Service"], never, FileSystem.FileSystem | Path.Path>;
export declare const layer: (options?: FoldkitOptions) => Layer.Layer<Core.Framework, never, FileSystem.FileSystem | Path.Path>;
export {};
