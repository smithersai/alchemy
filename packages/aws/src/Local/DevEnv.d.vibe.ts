import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
/**
 * `alchemy dev` trusts the local AWS emulator's CA bundle, once it has been
 * downloaded, so SDK clients in the dev process and its sidecars accept the
 * emulator's TLS certificate.
 */
export declare const devEnv: Effect.Effect<Record<string, string>, never, FileSystem.FileSystem>;
