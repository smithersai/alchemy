import * as Neon from "@distilled.cloud/neon";
import * as Provider from "alchemy/Provider";
import { Stack } from "alchemy/Stack";
import { Stage } from "alchemy/Stage";
import * as Effect from "effect/Effect";
import { type ResolvedBranchScope } from "./BranchScope.js";
import { Function, type FunctionAttributes } from "./Function.vibe";
declare const FunctionDeploymentFailed_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "FunctionDeploymentFailed";
} & Readonly<A>;
export declare class FunctionDeploymentFailed extends FunctionDeploymentFailed_base<{
    slug: string;
    deploymentId: number;
    status: string;
    message?: string;
}> {
}
declare const FunctionDeploymentNotReady_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "FunctionDeploymentNotReady";
} & Readonly<A>;
export declare class FunctionDeploymentNotReady extends FunctionDeploymentNotReady_base<{
    slug: string;
    deploymentId: number;
}> {
}
export declare const observeFunction: (scope: ResolvedBranchScope, slug: string) => Effect.Effect<Neon.NeonFunction | undefined, FunctionDeploymentFailed | Neon.NeonOpError, Neon.NeonOpContext>;
export declare const waitForFunctionDeployment: (scope: ResolvedBranchScope, slug: string, deploymentId: number) => Effect.Effect<Neon.NeonFunction, FunctionDeploymentFailed | FunctionDeploymentNotReady | Neon.GetProjectBranchFunctionError, Neon.NeonOpContext>;
declare const FunctionLogQueryError_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "FunctionLogQueryError";
} & Readonly<A>;
export declare class FunctionLogQueryError extends FunctionLogQueryError_base<{
    reason: "invalid-limit" | "invalid-cursor" | "pagination-limit";
}> {
}
export declare const FunctionLogs: (output: FunctionAttributes, options: Provider.LogsInput) => Effect.Effect<{
    timestamp: Date;
    message: string;
}[], FunctionLogQueryError | import("effect/Cause").TimeoutError | Neon.QueryProjectBranchLogsError, Neon.NeonOpContext>;
export declare const FunctionProvider: () => import("effect/Layer").Layer<Provider.Provider<Function>, never, import("alchemy/AlchemyContext").AlchemyContext | import("alchemy/Artifacts").ArtifactStore | import("effect/process/ChildProcessSpawner").ChildProcessSpawner | import("effect/FileSystem").FileSystem | import("effect/Path").Path | Stack | Stage | Neon.NeonOpContext>;
export declare const FunctionProviderLive: () => import("effect/Layer").Layer<Provider.Provider<Function>, never, import("effect/FileSystem").FileSystem | import("effect/Path").Path | Stack | Stage | Neon.NeonOpContext>;
export {};
