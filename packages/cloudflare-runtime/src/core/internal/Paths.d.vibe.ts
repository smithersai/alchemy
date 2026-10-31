import { Context } from "effect";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import * as Path from "effect/Path";
import { SystemError } from "../RuntimeError.shared.js";
declare const Paths_base: Context.ServiceClass<Paths, "cloudflare-runtime/Paths", {
    readonly cache: (...prefix: Array<string>) => Effect.Effect<string, SystemError>;
    readonly config: (...prefix: Array<string>) => Effect.Effect<string, SystemError>;
    readonly data: (...prefix: Array<string>) => Effect.Effect<string, SystemError>;
    readonly state: (...prefix: Array<string>) => Effect.Effect<string, SystemError>;
}>;
export declare class Paths extends Paths_base {
}
export declare const PathsLive: Layer.Layer<Paths, never, FileSystem.FileSystem | Path.Path>;
export declare const data: (...prefix: Array<string>) => Effect.Effect<string, SystemError, Paths>;
export declare const config: (...prefix: Array<string>) => Effect.Effect<string, SystemError, Paths>;
export declare const cache: (...prefix: Array<string>) => Effect.Effect<string, SystemError, Paths>;
export declare const state: (...prefix: Array<string>) => Effect.Effect<string, SystemError, Paths>;
export {};
