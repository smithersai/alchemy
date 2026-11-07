import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
/**
 * Resolves a Vite Worker's `main` against the Vite root when it is a path
 * or names a file there. Any other specifier (a package export, a virtual
 * module) is handed to Vite unchanged, as `@cloudflare/vite-plugin` does.
 */
export declare const resolveViteMain: (root: string, main: string) => Effect.Effect<string, never, FileSystem.FileSystem | Path.Path>;
