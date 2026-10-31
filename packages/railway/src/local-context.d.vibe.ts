import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
export interface RailwayLocalContextSource {
    readonly context: string;
    readonly dockerfilePath?: string;
}
declare const ServiceImageOrMainRequired_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "Railway.ServiceImageOrMainRequired";
} & Readonly<A>;
export declare class ServiceImageOrMainRequired extends ServiceImageOrMainRequired_base<{
    message: string;
}> {
}
declare const ServiceSourceInvalid_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "Railway.ServiceSourceInvalid";
} & Readonly<A>;
export declare class ServiceSourceInvalid extends ServiceSourceInvalid_base<{
    message: string;
}> {
}
declare const ServiceDockerfilePathInvalid_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "Railway.ServiceDockerfilePathInvalid";
} & Readonly<A>;
export declare class ServiceDockerfilePathInvalid extends ServiceDockerfilePathInvalid_base<{
    dockerfilePath: string;
    message: string;
}> {
}
declare const ServiceContextPathInvalid_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "Railway.ServiceContextPathInvalid";
} & Readonly<A>;
export declare class ServiceContextPathInvalid extends ServiceContextPathInvalid_base<{
    path: string;
    expected: "directory" | "file";
}> {
    get message(): string;
}
declare const ServiceDockerfileOutsideContext_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "Railway.ServiceDockerfileOutsideContext";
} & Readonly<A>;
export declare class ServiceDockerfileOutsideContext extends ServiceDockerfileOutsideContext_base<{
    context: string;
    dockerfile: string;
}> {
}
declare const ServiceContextSymlinkUnsupported_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "Railway.ServiceContextSymlinkUnsupported";
} & Readonly<A>;
export declare class ServiceContextSymlinkUnsupported extends ServiceContextSymlinkUnsupported_base<{
    path: string;
}> {
}
declare const ServiceContextPathUnsupported_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "Railway.ServiceContextPathUnsupported";
} & Readonly<A>;
export declare class ServiceContextPathUnsupported extends ServiceContextPathUnsupported_base<{
    path: string;
}> {
}
declare const ServiceContextTooLarge_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "Railway.ServiceContextTooLarge";
} & Readonly<A>;
export declare class ServiceContextTooLarge extends ServiceContextTooLarge_base<{
    limit: number;
    size: number;
}> {
}
export type RailwayServiceSource = {
    readonly mode: "main";
    readonly main: string;
} | {
    readonly mode: "context";
    readonly context: string;
    readonly dockerfilePath: string | undefined;
} | {
    readonly mode: "image";
    readonly image: string;
} | {
    readonly mode: "repo";
    readonly repo: string;
};
export declare const resolveRailwayServiceSource: (props: {
    readonly main?: string;
    readonly context?: string;
    readonly image?: string;
    readonly repo?: string;
    readonly dockerfilePath?: string;
}) => Effect.Effect<{
    readonly mode: "main";
    readonly main: string;
    readonly context?: undefined;
    readonly dockerfilePath?: undefined;
    readonly image?: undefined;
    readonly repo?: undefined;
} | {
    readonly main?: undefined;
    readonly mode: "context";
    readonly context: string;
    readonly dockerfilePath: string | undefined;
    readonly image?: undefined;
    readonly repo?: undefined;
} | {
    readonly main?: undefined;
    readonly context?: undefined;
    readonly dockerfilePath?: undefined;
    readonly mode: "image";
    readonly image: string;
    readonly repo?: undefined;
} | {
    readonly main?: undefined;
    readonly context?: undefined;
    readonly dockerfilePath?: undefined;
    readonly image?: undefined;
    readonly mode: "repo";
    readonly repo: string;
}, ServiceImageOrMainRequired | ServiceSourceInvalid, never>;
export declare const hashRailwayLocalContext: (source: RailwayLocalContextSource) => Effect.Effect<string, import("@alchemy.run/docker/BuildHash").BuildHashInvalidProps | import("effect/PlatformError").PlatformError | ServiceContextPathInvalid | ServiceContextPathUnsupported | ServiceContextSymlinkUnsupported | ServiceContextTooLarge | ServiceDockerfileOutsideContext | ServiceDockerfilePathInvalid, FileSystem.FileSystem | Path.Path>;
export declare const prepareRailwayLocalContext: (source: RailwayLocalContextSource) => Effect.Effect<{
    codeHash: string;
    dockerfilePath: string;
    tarball: NonSharedBuffer;
}, unknown, FileSystem.FileSystem | Path.Path | import("effect/Scope").Scope>;
export {};
