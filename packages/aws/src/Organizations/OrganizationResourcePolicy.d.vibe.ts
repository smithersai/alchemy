import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { PolicyDocument } from "../IAM/Policy.vibe";
import type { Providers } from "../Providers.ts";
declare const OrganizationResourcePolicyUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "OrganizationResourcePolicyUnexpectedResponse";
} & Readonly<A>;
export declare class OrganizationResourcePolicyUnexpectedResponse extends OrganizationResourcePolicyUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface OrganizationResourcePolicyProps {
    /**
     * Typed resource policy document for the organization.
     */
    document: PolicyDocument;
}
export interface OrganizationResourcePolicy extends Resource<"AWS.Organizations.OrganizationResourcePolicy", OrganizationResourcePolicyProps, {
    /**
     * ID of the resource policy.
     */
    resourcePolicyId: string;
    /**
     * ARN of the resource policy.
     */
    resourcePolicyArn: string;
    /**
     * Parsed resource policy document as stored by AWS Organizations.
     */
    document: PolicyDocument;
}, never, Providers> {
}
/**
 * The singleton AWS Organizations resource policy — an org-level
 * resource-based policy that grants other principals (typically delegated
 * administrator accounts) permission to call Organizations APIs.
 *
 * There is at most one per organization; Alchemy adopts and reconciles the
 * existing policy if one is already in place.
 * ### Setting the Resource Policy
 * **Example:** Allow a Member Account to Describe the Organization
 * ```typescript
 * const security = yield* Account("Security", {
 *   name: "security",
 *   email: "aws-security@example.com",
 *   parentId: root.rootId,
 * });
 *
 * yield* OrganizationResourcePolicy("OrgResourcePolicy", {
 *   document: {
 *     Version: "2012-10-17",
 *     Statement: [
 *       {
 *         Effect: "Allow",
 *         Principal: { AWS: security.accountId },
 *         Action: [
 *           "organizations:DescribeOrganization",
 *           "organizations:ListAccounts",
 *         ],
 *         Resource: "*",
 *       },
 *     ],
 *   },
 * });
 * ```
 *
 * @resource
 */
export declare const OrganizationResourcePolicy: import("alchemy").ResourceClass<OrganizationResourcePolicy>;
export declare const OrganizationResourcePolicyProvider: () => import("effect/Layer").Layer<Provider.Provider<OrganizationResourcePolicy>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient>;
export {};
