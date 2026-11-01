import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import type { WebsiteArtifactProps } from "./Artifact.js";
declare const PackageOperationFailed_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "PackageOperationFailed";
} & Readonly<A>;
export declare class PackageOperationFailed extends PackageOperationFailed_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
/** Release staging, compression and validation buffers between deployments. */
export declare const packageWebsiteInChild: (props: WebsiteArtifactProps) => Effect.Effect<{
    archive: Uint8Array<ArrayBufferLike>;
    hash: string;
}, import("effect/PlatformError").BadArgument | PackageOperationFailed | import("effect/PlatformError").PlatformError | import("effect/Cause").TimeoutError, import("effect/process/ChildProcessSpawner").ChildProcessSpawner | FileSystem.FileSystem | Path.Path>;
export {};
