import * as organizations from "@distilled.cloud/aws/organizations";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.vibe";
declare const OrganizationInvalidProps_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "OrganizationInvalidProps";
} & Readonly<A>;
export declare class OrganizationInvalidProps extends OrganizationInvalidProps_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
declare const OrganizationOperationFailed_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "OrganizationOperationFailed";
} & Readonly<A>;
export declare class OrganizationOperationFailed extends OrganizationOperationFailed_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
declare const OrganizationUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "OrganizationUnexpectedResponse";
} & Readonly<A>;
export declare class OrganizationUnexpectedResponse extends OrganizationUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export type OrganizationId = string;
export type OrganizationArn = string;
export interface OrganizationProps {
    /**
     * Organization feature set.
     * `ALL` unlocks the full AWS Organizations feature set.
     * @default "ALL"
     */
    featureSet?: organizations.OrganizationFeatureSet;
}
export interface Organization extends Resource<"AWS.Organizations.Organization", OrganizationProps, {
    /**
     * ID of the organization (e.g. `o-exampleorgid`).
     */
    organizationId: OrganizationId;
    /**
     * ARN of the organization.
     */
    organizationArn: OrganizationArn;
    /**
     * Feature set enabled on the organization (`ALL` or
     * `CONSOLIDATED_BILLING`).
     */
    featureSet: organizations.OrganizationFeatureSet | undefined;
    /**
     * ARN of the management account.
     */
    managementAccountArn: string | undefined;
    /**
     * 12-digit ID of the management account.
     */
    managementAccountId: string | undefined;
    /**
     * Email address of the management account.
     */
    managementAccountEmail: string | undefined;
    /**
     * Policy types available to the organization.
     */
    availablePolicyTypes: organizations.PolicyTypeSummary[];
}, never, Providers> {
}
/**
 * The AWS Organization for the current management account.
 *
 * This is a singleton-style resource. If an organization already exists,
 * Alchemy adopts and reconciles it instead of creating a second one.
 * ### Creating An Organization
 * **Example:** Full Features Organization
 * ```typescript
 * const organization = yield* Organization("Org", {
 *   featureSet: "ALL",
 * });
 * ```
 *
 * @resource
 */
export declare const Organization: import("alchemy").ResourceClass<Organization>;
export declare const OrganizationProvider: () => import("effect/Layer").Layer<Provider.Provider<Organization>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient>;
export {};
