import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import * as Effect from "effect/Effect";
import type { Providers } from "../Providers.ts";
import type { WebFunctionAuthType } from "./WebFunctionEndpointSync.ts";
export declare const WebFunctionPermissionTypeId: "AWS.Lambda.WebFunctionPermission";
export type WebFunctionPermissionTypeId = typeof WebFunctionPermissionTypeId;
/** The parts of an endpoint a permission grants access to. */
export interface WebFunctionEndpointRef {
    functionArn: string;
    endpointArn: string;
    authType: WebFunctionAuthType;
}
/**
 * A resource or its declaration (e.g. a `WebFunction` class), which is
 * yielded for you.
 */
type Ref<T> = T | Effect.Effect<T, never, Providers>;
export interface WebFunctionPermissionProps {
    /**
     * The endpoint callers may invoke: an `AWS.Lambda.WebFunction` (its
     * built-in endpoint), an `AWS.Lambda.WebFunctionEndpoint`, or a class
     * declaration of either. The endpoint must use `authType: "IamAuth"`;
     * an `ApplicationManaged` endpoint is public and ignores grants.
     */
    endpoint: Ref<WebFunctionEndpointRef>;
    /**
     * Who may invoke the endpoint: an AWS service principal (e.g.
     * `"cloudfront.amazonaws.com"`), an account ID, or an IAM role or user
     * ARN. Lambda rejects grants to an unspecified set of principals, so a
     * service principal needs `sourceArn`.
     */
    principal: string;
    /**
     * Restrict a service principal to one source, e.g. a CloudFront
     * distribution ARN.
     */
    sourceArn?: string;
}
export interface WebFunctionPermission extends Resource<WebFunctionPermissionTypeId, WebFunctionPermissionProps, {
    /** ARN of the Web Function whose resource policy holds the grant. */
    functionArn: string;
    /** ARN of the endpoint the grant applies to. */
    endpointArn: string;
    /** Statement ID of the grant in the function's resource policy. */
    statementId: string;
    /**
     * The grant's policy statement (principal, effect, action, resource and
     * conditions), as observed. Lets `alchemy drift` detect out-of-band
     * changes.
     */
    statement?: unknown;
}, never, Providers> {
}
declare const WebFunctionEndpointNotIamAuth_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "WebFunctionEndpointNotIamAuth";
} & Readonly<A>;
/** Invoke grants only mean something on an `IamAuth` endpoint. */
export declare class WebFunctionEndpointNotIamAuth extends WebFunctionEndpointNotIamAuth_base<{
    endpointArn: string;
    message: string;
}> {
}
declare const WebFunctionPolicyInvalid_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "WebFunctionPolicyInvalid";
} & Readonly<A>;
export declare class WebFunctionPolicyInvalid extends WebFunctionPolicyInvalid_base<{
    functionArn: string;
    message: string;
}> {
}
declare const WebFunctionPermissionResource: import("alchemy").ResourceClass<WebFunctionPermission>;
/**
 * Grants a principal `lambda:InvokeWebFunctionEndpoint` on one endpoint of
 * an `AWS.Lambda.WebFunction`.
 *
 * Use it for callers that sign requests with IAM: another AWS account's
 * role, or a service such as CloudFront scoped to one distribution. A
 * `CloudFront.Distribution` origin with `webFunction` creates this grant
 * for you. Each permission owns one statement in the function's resource
 * policy, so several permissions on one function coexist.
 *
 * ### Granting invoke access
 * **Example:** Let a role in another account call the endpoint
 * ```typescript
 * const api = yield* AWS.Lambda.WebFunction("Api", {
 *   main: "./src/server.ts",
 *   authType: "IamAuth",
 * });
 *
 * yield* AWS.Lambda.WebFunctionPermission("PartnerInvoke", {
 *   endpoint: api,
 *   principal: "arn:aws:iam::444455556666:role/partner-caller",
 * });
 * ```
 *
 * **Example:** Let one CloudFront distribution call the endpoint
 * ```typescript
 * yield* AWS.Lambda.WebFunctionPermission("CdnInvoke", {
 *   endpoint: api,
 *   principal: "cloudfront.amazonaws.com",
 *   sourceArn: distribution.distributionArn,
 * });
 * ```
 *
 * @resource
 */
export declare const WebFunctionPermission: typeof WebFunctionPermissionResource;
export declare const WebFunctionPermissionProvider: () => import("effect/Layer").Layer<Provider.Provider<WebFunctionPermission>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};
