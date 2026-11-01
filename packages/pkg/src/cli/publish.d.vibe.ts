import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import * as Schema from "effect/Schema";
declare const PublishError_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "PublishError";
} & Readonly<A>;
export declare class PublishError extends PublishError_base<{
    readonly message: string;
}> {
}
export interface PublishOptions {
    readonly cwd: string;
    readonly dir: string;
    readonly registry: string;
}
/**
 * Publish a `pkg pack` directory from the current GitHub Actions job. The
 * workflow must first have uploaded the manifest as an artifact of the run
 * under the name `pkg pack` printed; the registry verifies that artifact
 * through GitHub, then either reports the tarballs it lacks, which are
 * uploaded before trying again, or writes the tags.
 */
export declare const publish: (options: PublishOptions) => Effect.Effect<{
    readonly packages: readonly {
        readonly name: string;
        readonly group: string;
        readonly url: string;
        readonly tags: readonly string[];
    }[];
}, import("effect/PlatformError").PlatformError | PublishError | Schema.SchemaError, FileSystem.FileSystem | import("effect/http/HttpClient").HttpClient | Path.Path>;
export {};
