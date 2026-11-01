import * as iam from "@distilled.cloud/gcp/unstable/iam_v1";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { GcpEnvironment } from "../Environment.js";
import type { Providers } from "../Providers.js";
export type WorkloadIdentityPoolProps = {
    /** Project that owns the pool. Defaults to the current GCP project. */
    project?: string;
    /**
     * Pool id: 4-32 lowercase letters, digits, or hyphens (the `gcp-` prefix is
     * reserved). If omitted, a unique id is generated. Changing it replaces the
     * pool. Deleted pools keep their id for 30 days; redeploying the same id in
     * that window restores the pool instead of creating a new one.
     */
    workloadIdentityPoolId?: string;
    /** Display name (maximum 32 characters). */
    displayName?: string;
    /**
     * Description. Pools have no labels, so Alchemy stamps ownership into a
     * `[alchemy …]` prefix and strips it from the `description` attribute. The
     * marker and this text share the API's 256-character limit; overflow is
     * truncated.
     */
    description?: string;
    /**
     * Disable the pool. Tokens cannot be exchanged while it is disabled, and
     * existing tokens grant access again once it is re-enabled.
     * @default false
     */
    disabled?: boolean;
};
export type WorkloadIdentityPool = Resource<"GCP.IAM.WorkloadIdentityPool", WorkloadIdentityPoolProps, {
    /**
     * Full resource name as GCP returns it, with the project number:
     * `projects/{projectNumber}/locations/global/workloadIdentityPools/{id}`.
     * Prefix it with `principalSet://iam.googleapis.com/` to grant roles to
     * federated identities.
     */
    name: string;
    /** Project that owns the pool. */
    project: string;
    /** Pool id. */
    workloadIdentityPoolId: string;
    /** Display name. */
    displayName: string | undefined;
    /** User description (Alchemy ownership marker stripped). */
    description: string | undefined;
    /** Whether the pool is disabled. */
    disabled: boolean;
    /** Pool state (`ACTIVE` or `DELETED`). */
    state: string | undefined;
}, never, Providers>;
/**
 * A Google Cloud IAM workload identity pool: a trust boundary that lets
 * external identities (GitHub Actions, AWS, any OIDC or SAML issuer) exchange
 * their tokens for short-lived Google credentials without service-account keys.
 *
 * Add an issuer with `GCP.IAM.WorkloadIdentityProvider`, then let the
 * federated principals impersonate a service account with `GCP.IAM.Member`
 * (`roles/iam.workloadIdentityUser`).
 *
 * ### Creating a Pool
 * **Example:** Pool for GitHub Actions
 * ```typescript
 * const pool = yield* GCP.IAM.WorkloadIdentityPool("GitHub", {
 *   workloadIdentityPoolId: "github-actions",
 *   displayName: "GitHub Actions",
 * });
 * ```
 *
 * ### Impersonating a Service Account
 * **Example:** Let one repository deploy as a service account
 * ```typescript
 * const deployer = yield* GCP.IAM.ServiceAccount("Deployer", {});
 * yield* GCP.IAM.Member("GitHubDeployer", {
 *   kind: "iam.serviceAccount",
 *   name: deployer.name,
 *   role: "roles/iam.workloadIdentityUser",
 *   member: Output.interpolate`principalSet://iam.googleapis.com/${pool.name}/attribute.repository/my-org/my-repo`,
 * });
 * ```
 *
 * @resource
 * @category IAM
 */
export declare const WorkloadIdentityPool: import("alchemy/Resource").ResourceClass<WorkloadIdentityPool>;
declare const WorkloadIdentityPoolNotResolved_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "GCP.IAM.WorkloadIdentityPoolNotResolved";
} & Readonly<A>;
export declare class WorkloadIdentityPoolNotResolved extends WorkloadIdentityPoolNotResolved_base<{
    resourceName: string;
}> {
}
export declare const WorkloadIdentityPoolProvider: () => import("effect/Layer").Layer<Provider.Provider<WorkloadIdentityPool>, never, GcpEnvironment | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage | iam.GcpOpContext>;
export {};
