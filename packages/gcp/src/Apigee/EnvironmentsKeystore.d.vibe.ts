import * as apigee from "@distilled.cloud/gcp/apigee_v1";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { GcpEnvironment } from "../Environment.js";
import type { Providers } from "../Providers.js";
export type EnvironmentsKeystoreProps = {
    /**
     * Apigee organization id or `organizations/{org}`. Defaults to the
     * current GCP project id. Immutable — changing it replaces the keystore.
     */
    organization?: string;
    /**
     * Environment id or `organizations/{org}/environments/{env}`. Immutable —
     * changing it replaces the keystore.
     */
    environment: string;
    /**
     * Keystore id (last path segment). If omitted, a unique name is generated
     * from the stack, stage, and logical id. Must match
     * `[\w[:space:].-]{1,255}`. Immutable — changing it replaces the keystore.
     */
    keystoreId?: string;
};
export type EnvironmentsKeystore = Resource<"GCP.Apigee.EnvironmentsKeystore", EnvironmentsKeystoreProps, {
    /** Full resource name `organizations/{org}/environments/{env}/keystores/{keystore}`. */
    name: string;
    /** Keystore id (last path segment). */
    keystoreId: string;
    /** Apigee organization id. */
    organizationId: string;
    /** Environment id. */
    environmentId: string;
    /** Alias ids stored in this keystore. */
    aliases: string[];
}, never, Providers>;
/**
 * An Apigee environment keystore or truststore for TLS certificates.
 *
 * Keystores have no labels or description, so `list` enumerates every
 * keystore in Apigee environments mapped to this GCP project for
 * `pnpm nuke:gcp`. Name is identity — changing `keystoreId`,
 * `organization`, or `environment` replaces the keystore. Aliases are
 * managed by `EnvironmentsKeystoresAlias`.
 *
 * ### Creating a Keystore
 * **Example:** Generated name
 * ```typescript
 * const keystore = yield* GCP.Apigee.EnvironmentsKeystore("Tls", {
 *   environment: "eval",
 * });
 * ```
 *
 * **Example:** Named keystore
 * ```typescript
 * const keystore = yield* GCP.Apigee.EnvironmentsKeystore("Tls", {
 *   environment: "eval",
 *   keystoreId: "app-tls",
 * });
 * ```
 *
 * @resource
 * @category Apigee
 */
export declare const EnvironmentsKeystore: import("alchemy/Resource").ResourceClass<EnvironmentsKeystore>;
declare const EnvironmentsKeystoreNotResolved_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "GCP.Apigee.EnvironmentsKeystoreNotResolved";
} & Readonly<A>;
export declare class EnvironmentsKeystoreNotResolved extends EnvironmentsKeystoreNotResolved_base<{
    resourceName: string;
}> {
}
export declare const EnvironmentsKeystoreProvider: () => import("effect/Layer").Layer<Provider.Provider<EnvironmentsKeystore>, never, GcpEnvironment | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage | apigee.GcpOpContext>;
export {};
