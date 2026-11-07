import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import * as Effect from "effect/Effect";
import { type Project } from "./Project.ts";
import type { Providers } from "./Providers.ts";
/**
 * A resource-valued prop: the resource itself, or an Effect that produces
 * it (so `yield* Project(...)` and `Project(...)` both type-check).
 */
type Ref<T> = T | Effect.Effect<T, never, Providers>;
export interface EnvironmentProps {
    /**
     * Parent Railway Project. Accepts a `Railway.Project` resource or an
     * Effect that produces one. Changing it replaces the Environment.
     */
    project: Ref<Project>;
    /**
     * Environment name. Unique per project. If omitted, a unique name is
     * generated from the stack, stage and logical ID. Changing it updates
     * the environment in place via `environmentRename`.
     */
    name?: string;
    /**
     * Whether to create an ephemeral (PR) environment, listed under
     * PR Environments in Railway. Create-only; ignored on update. Does not
     * enable Railway's automatic PR deployments.
     * @default false
     */
    ephemeral?: boolean;
    /**
     * Fork this environment from an existing one (`sourceEnvironmentId`).
     * Create-only; ignored on update. Pass the project's `environmentId` to
     * copy production's services, volumes, and variables.
     */
    sourceEnvironmentId?: string;
}
export type Environment = Resource<"Railway.Environment", EnvironmentProps, {
    /** Railway environment id. */
    environmentId: string;
    /** Physical environment name (unique per project). */
    name: string;
    /** Parent Railway project id. */
    projectId: string;
    /** Whether this is an ephemeral (PR) environment. */
    isEphemeral: boolean;
    /** Dashboard URL for this environment. */
    url: string;
}, never, Providers>;
declare const EnvironmentResource: import("alchemy/Resource").ResourceClass<Environment>;
/**
 * A Railway.Environment is an extra deploy environment under a Project
 * (staging, preview, …). The production environment is created with the
 * Project — do not recreate it as an Environment resource.
 *
 * @see https://docs.railway.com/guides/environments
 *
 * ### Create an extra environment
 * Alchemy generates a unique name unless you pass one. Production is
 * already on the Project as `environmentId`.
 *
 * **Example:** Staging next to production
 * ```typescript
 * const site = yield* Railway.Project("Site");
 * const staging = yield* Railway.Environment("Staging", {
 *   project: site,
 * });
 * ```
 *
 * :::note
 * Prefer omitting `name` in tests and CI so names stay unique and
 * reclaimable.
 * :::
 *
 * ### A stable name
 * Pass `name` when you need a stable environment name (`staging`).
 * Changing it later updates the environment in place.
 *
 * **Example:** Explicit name
 * ```typescript
 * const staging = yield* Railway.Environment("Staging", {
 *   project: site,
 *   name: "staging",
 * });
 * ```
 *
 * ### Create a PR preview
 * `ephemeral: true` lists the environment under PR Environments in Railway.
 * Create-only; existing environments are not converted on update.
 *
 * **Example:** Ephemeral preview environment
 * ```typescript
 * const preview = yield* Railway.Environment("Preview", {
 *   project: site,
 *   name: "pr-123",
 *   ephemeral: true,
 * });
 * ```
 *
 * ### Fork from production
 * `sourceEnvironmentId` copies services, volumes, configuration, and
 * variables from another environment. Create-only.
 *
 * **Example:** Fork production
 * ```typescript
 * const staging = yield* Railway.Environment("Staging", {
 *   project: site,
 *   sourceEnvironmentId: site.environmentId,
 * });
 * ```
 *
 * ### Module-scope declarations
 * Declare the Project once. Pass it into every child. Resource-valued
 * props accept the resource or an Effect producing it.
 *
 * **Example:** Module-scope Environment
 * ```typescript
 * // src/project.ts
 * import * as Railway from "@alchemy.run/railway";
 *
 * export const Site = Railway.Project("Site");
 * export const Staging = Railway.Environment("Staging", {
 *   project: Site,
 * });
 * ```
 *
 * @resource
 * @product Project
 */
export declare const Environment: typeof EnvironmentResource;
declare const EnvironmentNotCreated_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "Railway.EnvironmentNotCreated";
} & Readonly<A>;
export declare class EnvironmentNotCreated extends EnvironmentNotCreated_base<{
    resourceName: string;
    projectId: string;
}> {
}
declare const EnvironmentProjectRequired_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "Railway.EnvironmentProjectRequired";
} & Readonly<A>;
export declare class EnvironmentProjectRequired extends EnvironmentProjectRequired_base<{
    message: string;
}> {
}
export declare const EnvironmentProvider: () => import("effect/Layer").Layer<Provider.Provider<Environment>, never, import("@distilled.cloud/railway").GqlTransport | import("./Environment.ts").RailwayEnvironment | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage>;
export {};
