import { Context } from "effect";
import { type CloudflareVitePluginOptions } from "@alchemy.run/cloudflare-runtime/vite";
import * as FrameworkCore from "@alchemy.run/frontend-frameworks/core";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import type * as Scope from "effect/Scope";
import type * as ViteModule from "vite";
declare const ViteError_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "ViteError";
} & Readonly<A>;
export declare class ViteError extends ViteError_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export type BuildOutput = FrameworkCore.BuildOutput;
declare const Vite_base: Context.ServiceClass<Vite, "@alchemy/Vite", {
    readonly build: (pluginOptions?: CloudflareVitePluginOptions, config?: ViteModule.InlineConfig) => Effect.Effect<BuildOutput, ViteError>;
    readonly dev: (pluginOptions?: CloudflareVitePluginOptions, config?: ViteModule.InlineConfig) => Effect.Effect<{
        url: string;
        server: ViteModule.ViteDevServer;
    }, ViteError, Scope.Scope>;
}>;
export declare class Vite extends Vite_base {
}
export declare const ViteLive: Layer.Layer<Vite, never, FileSystem.FileSystem>;
export {};
