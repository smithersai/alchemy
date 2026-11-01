import * as Effect from "effect/Effect";
declare const ModuleLoadError_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "ModuleLoadError";
} & Readonly<A>;
export declare class ModuleLoadError extends ModuleLoadError_base<{
    readonly specifier: string;
    readonly root: string;
    readonly cause?: unknown;
}> {
    get message(): string;
}
/**
 * Import a module from a *project's* dependency tree rather than our own —
 * the project's `vite`, `astro`, `waku`, `next`, etc. must be the instance
 * the framework integration drives, not whatever happens to be hoisted next
 * to this package.
 *
 * Resolution runs `createRequire(<root>/package.json).resolve(specifier)` and
 * imports the resolved absolute path as a `file://` URL (required for ESM
 * `import()` on Windows). If project-relative resolution fails (e.g. a
 * non-linked global install), it falls back to a bare `import(specifier)`.
 *
 * A CommonJS entry is loaded with `require`, not `import()`. Alchemy starts
 * every Node child with its Oxc loader (`module.registerHooks`), and once a
 * synchronous `load` hook exists Node's ESM loader runs *imported* CommonJS
 * through a re-invented `require` that lacks `require.extensions` and
 * `require.cache` (nodejs/node#59666) — `next` patches `require.extensions`
 * as it loads and dies with "Cannot read properties of undefined (reading
 * '.js')". The real CommonJS loader still consults the hooks, so project
 * TypeScript reached through `require()` keeps transpiling.
 */
export declare const loadProjectModule: <T = unknown>(root: string, specifier: string) => Effect.Effect<T, ModuleLoadError>;
/**
 * Resolve the directory of a project's installed package (the directory
 * containing its `package.json`). Useful for deep paths that are not in the
 * package's exports map (e.g. `waku/dist/lib/vite-entries/entry.server.js`).
 *
 * Prefer `createRequire(<root>/package.json).resolve(name/package.json)`.
 * When that subpath is not exported (ESM-only packages such as `vinext`),
 * search `require.resolve.paths(name)` — Node's CJS lookup, which Vite's
 * ESM `import.meta.resolve` hooks do not intercept. Do not use
 * `import.meta.resolve(name, projectPackageJson)`: after `vite.createBuilder`
 * those hooks ignore parentURL and resolve from this package instead.
 */
export declare const resolveProjectPackageDirectory: (root: string, packageName: string) => Effect.Effect<string, ModuleLoadError>;
/**
 * Best-effort version of `packageName` as resolved from `fromDirectory`
 * (`undefined` when unresolvable). Used to feature-detect a dependency of a
 * project package — e.g. the Vite that Astro itself resolves — without
 * loading the module.
 */
export declare const resolveInstalledPackageVersion: (fromDirectory: string, packageName: string) => Effect.Effect<string | undefined>;
export {};
