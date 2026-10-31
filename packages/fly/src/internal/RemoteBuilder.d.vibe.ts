import { type Docker, type RegistryCredentials } from "@alchemy.run/docker/Docker";
import * as builders from "@distilled.cloud/fly-io/builders";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
declare const RemoteBuilderError_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "Fly.RemoteBuilderError";
} & Readonly<A>;
export declare class RemoteBuilderError extends RemoteBuilderError_base<{
    operation: string;
    message: string;
}> {
}
/**
 * Build `imageRef` from `contextDir` on a Fly remote builder and push it to
 * `registry` from there.
 */
export declare const buildOnRemoteBuilder: (input: {
    docker: Docker["Service"];
    appName: string;
    contextDir: string;
    imageRef: string;
    platform: string;
    registry: RegistryCredentials;
    note?: (message: string) => Effect.Effect<void>;
}) => Effect.Effect<void, RemoteBuilderError | import("@alchemy.run/docker/RegistryError").DockerImagePublicationError | builders.EnsureDepotRemoteBuilderError, FileSystem.FileSystem | Path.Path | builders.FlyIoOpContext>;
export {};
