import type { ResourceBinding } from "alchemy/Resource";
import * as Effect from "effect/Effect";
import type { FunctionBinding, FunctionProps } from "./Function.vibe";
declare const FunctionConfigurationError_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "FunctionConfigurationError";
} & Readonly<A>;
export declare class FunctionConfigurationError extends FunctionConfigurationError_base<{
    message: string;
    cause?: unknown;
}> {
}
declare const checkedSlug: (id: string, slug?: string | undefined) => Effect.Effect<string, FunctionConfigurationError, import("alchemy/ResourceContext").ResourceContext | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage>;
export declare function functionSlug(id: string, slug: string): Effect.Effect<string, FunctionConfigurationError>;
export declare function functionSlug(id: string, slug?: string): ReturnType<typeof checkedSlug>;
export declare const functionEnvironment: (props: FunctionProps, bindings: ResourceBinding<FunctionBinding>[]) => Effect.Effect<Record<string, string>, FunctionConfigurationError, never>;
export {};
