import * as iam from "@distilled.cloud/gcp/unstable/iam_v1";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { GcpEnvironment } from "../Environment.ts";
import type { Providers } from "../Providers.ts";
export type WorkloadIdentityProviderOidc = {
    /** Issuer URL (HTTPS), e.g. `https://token.actions.githubusercontent.com`. */
    issuerUri: string;
    /**
     * Accepted `aud` values. When empty, the token audience must be the
     * provider's full resource name.
     */
    allowedAudiences?: string[];
    /** Inline JWKS (JSON). When omitted, keys are fetched from the issuer. */
    jwksJson?: string;
};
export type WorkloadIdentityProviderProps = {
    /** Project that owns the pool. Defaults to the current GCP project. */
    project?: string;
    /** Id of the pool the provider belongs to. Changing it replaces the provider. */
    workloadIdentityPoolId: string;
    /**
     * Provider id: 4-32 lowercase letters, digits, or hyphens (the `gcp-`
     * prefix is reserved). If omitted, a unique id is generated. Changing it
     * replaces the provider. Deleted providers keep their id for 30 days;
     * redeploying the same id in that window restores the provider.
     */
    workloadIdentityPoolProviderId?: string;
    /** Display name (maximum 32 characters). */
    displayName?: string;
    /**
     * Description. Providers have no labels, so Alchemy stamps ownership into a
     * `[alchemy …]` prefix and strips it from the `description` attribute.
     */
    description?: string;
    /**
     * Disable the provider. Tokens from its issuer cannot be exchanged while it
     * is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * Maps issuer token claims to Google attributes, e.g.
     * `{ "google.subject": "assertion.sub" }`. When omitted, the existing
     * mapping is left as is.
     */
    attributeMapping?: Record<string, string>;
    /**
     * CEL expression a token must satisfy, e.g.
     * `assertion.repository == "my-org/my-repo"`. When omitted, the existing
     * condition is left as is.
     */
    attributeCondition?: string;
    /** OpenID Connect issuer. Set exactly one of `oidc`, `aws`, or `saml`. */
    oidc?: WorkloadIdentityProviderOidc;
    /** AWS account whose identities may federate. */
    aws?: {
        accountId: string;
    };
    /** SAML 2.0 identity provider metadata (XML). */
    saml?: {
        idpMetadataXml: string;
    };
};
export type WorkloadIdentityProvider = Resource<"GCP.IAM.WorkloadIdentityProvider", WorkloadIdentityProviderProps, {
    /**
     * Full resource name as GCP returns it, with the project number:
     * `projects/{projectNumber}/locations/global/workloadIdentityPools/{pool}/providers/{id}`.
     */
    name: string;
    /** Project that owns the pool. */
    project: string;
    /** Pool id. */
    workloadIdentityPoolId: string;
    /** Provider id. */
    workloadIdentityPoolProviderId: string;
    /** Display name. */
    displayName: string | undefined;
    /** User description (Alchemy ownership marker stripped). */
    description: string | undefined;
    /** Whether the provider is disabled. */
    disabled: boolean;
    /** Attribute mapping. */
    attributeMapping: Record<string, string> | undefined;
    /** Attribute condition. */
    attributeCondition: string | undefined;
    /** OpenID Connect issuer settings. */
    oidc: WorkloadIdentityProviderOidc | undefined;
    /** AWS settings. */
    aws: {
        accountId: string;
    } | undefined;
    /** Provider state (`ACTIVE` or `DELETED`). */
    state: string | undefined;
}, never, Providers>;
/**
 * An issuer in a Google Cloud IAM workload identity pool (a "workload
 * identity pool provider"). Tokens from the issuer that pass the attribute
 * condition can be exchanged for short-lived Google credentials.
 *
 * ### GitHub Actions
 * **Example:** Trust one repository and let its `main` branch deploy
 * ```typescript
 * const pool = yield* GCP.IAM.WorkloadIdentityPool("GitHub", {
 *   workloadIdentityPoolId: "github-actions",
 * });
 * yield* GCP.IAM.WorkloadIdentityProvider("GitHubOidc", {
 *   workloadIdentityPoolId: pool.workloadIdentityPoolId,
 *   workloadIdentityPoolProviderId: "github",
 *   attributeMapping: {
 *     "google.subject": "assertion.sub",
 *     "attribute.repository": "assertion.repository",
 *   },
 *   attributeCondition: `assertion.repository == "my-org/my-repo"`,
 *   oidc: { issuerUri: "https://token.actions.githubusercontent.com" },
 * });
 * ```
 *
 * ### AWS
 * **Example:** Trust roles in one AWS account
 * ```typescript
 * yield* GCP.IAM.WorkloadIdentityProvider("Aws", {
 *   workloadIdentityPoolId: pool.workloadIdentityPoolId,
 *   attributeMapping: {
 *     "google.subject": "assertion.arn",
 *     "attribute.aws_role": "assertion.arn.extract('assumed-role/{role}/')",
 *   },
 *   aws: { accountId: "123456789012" },
 * });
 * ```
 *
 * ### Replacing and restoring <!-- api-prose -->
 * Changing `workloadIdentityPoolId` or `workloadIdentityPoolProviderId`
 * replaces the provider. GCP keeps a deleted provider for 30 days and
 * reserves its id; deploying that id again restores it and re-applies the
 * declared settings.
 *
 * @resource
 * @category IAM
 */
export declare const WorkloadIdentityProvider: import("alchemy/Resource").ResourceClass<WorkloadIdentityProvider>;
declare const WorkloadIdentityProviderNotResolved_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "GCP.IAM.WorkloadIdentityProviderNotResolved";
} & Readonly<A>;
export declare class WorkloadIdentityProviderNotResolved extends WorkloadIdentityProviderNotResolved_base<{
    resourceName: string;
}> {
}
export declare const WorkloadIdentityProviderProvider: () => import("effect/Layer").Layer<Provider.Provider<WorkloadIdentityProvider>, never, GcpEnvironment | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage | iam.GcpOpContext>;
export {};
