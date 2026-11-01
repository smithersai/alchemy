import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import { type ArtifactFile } from "./ArtifactFile.js";
declare const ArtifactUploadOperationFailed_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "ArtifactUploadOperationFailed";
} & Readonly<A>;
export declare class ArtifactUploadOperationFailed extends ArtifactUploadOperationFailed_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export declare const executeArtifactUpload: (uploadUrl: string, artifact: Uint8Array | ArtifactFile, contentType: string) => Effect.Effect<undefined, ArtifactUploadOperationFailed, HttpClient.HttpClient>;
export {};
