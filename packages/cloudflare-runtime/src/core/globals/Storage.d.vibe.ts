import * as Context from "effect/Context";
import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import type { Service } from "../workerd/Config.js";
declare const Storage_base: Context.ServiceClass<Storage, "Storage", Service>;
export declare class Storage extends Storage_base {
}
export declare const make: (filePath: string) => Service;
export declare const layerDisk: (filePath: string) => Layer.Layer<Storage, import("effect/PlatformError").PlatformError, FileSystem.FileSystem>;
export declare const layerTemp: (options?: {
    readonly directory?: string | undefined;
    readonly prefix?: string | undefined;
}) => Layer.Layer<Storage, import("effect/PlatformError").PlatformError, FileSystem.FileSystem>;
export {};
