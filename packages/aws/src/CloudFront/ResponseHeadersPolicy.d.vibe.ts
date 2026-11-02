import * as cloudfront from "@distilled.cloud/aws/cloudfront";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.ts";
declare const ResponseHeadersPolicyConflict_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "ResponseHeadersPolicyConflict";
} & Readonly<A>;
export declare class ResponseHeadersPolicyConflict extends ResponseHeadersPolicyConflict_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
declare const ResponseHeadersPolicyUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "ResponseHeadersPolicyUnexpectedResponse";
} & Readonly<A>;
export declare class ResponseHeadersPolicyUnexpectedResponse extends ResponseHeadersPolicyUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface ResponseHeadersPolicyProps {
    /**
     * Name of the response headers policy. If omitted, a deterministic name is
     * generated. Names must be unique per AWS account. Changing the name
     * triggers a replacement.
     */
    name?: string;
    /**
     * Optional comment describing the policy.
     */
    comment?: string;
    /**
     * CORS configuration applied to viewer responses.
     */
    corsConfig?: cloudfront.ResponseHeadersPolicyCorsConfig;
    /**
     * Standard security headers (HSTS, X-Frame-Options, etc.) added to
     * viewer responses.
     */
    securityHeadersConfig?: cloudfront.ResponseHeadersPolicySecurityHeadersConfig;
    /**
     * Server-Timing header configuration for measuring CloudFront performance.
     */
    serverTimingHeadersConfig?: cloudfront.ResponseHeadersPolicyServerTimingHeadersConfig;
    /**
     * Custom headers to add to viewer responses.
     */
    customHeadersConfig?: cloudfront.ResponseHeadersPolicyCustomHeadersConfig;
    /**
     * Headers to remove from viewer responses.
     */
    removeHeadersConfig?: cloudfront.ResponseHeadersPolicyRemoveHeadersConfig;
}
export interface ResponseHeadersPolicy extends Resource<"AWS.CloudFront.ResponseHeadersPolicy", ResponseHeadersPolicyProps, {
    /**
     * CloudFront-assigned response headers policy identifier.
     */
    responseHeadersPolicyId: string;
    /**
     * Name of the response headers policy.
     */
    name: string;
    /**
     * Most recent entity tag for update/delete operations.
     */
    etag: string | undefined;
    /**
     * Current comment on the policy.
     */
    comment: string | undefined;
    /**
     * Current CORS configuration.
     */
    corsConfig: cloudfront.ResponseHeadersPolicyCorsConfig | undefined;
    /**
     * Current security headers configuration.
     */
    securityHeadersConfig: cloudfront.ResponseHeadersPolicySecurityHeadersConfig | undefined;
    /**
     * Current Server-Timing configuration.
     */
    serverTimingHeadersConfig: cloudfront.ResponseHeadersPolicyServerTimingHeadersConfig | undefined;
    /**
     * Current custom headers configuration.
     */
    customHeadersConfig: cloudfront.ResponseHeadersPolicyCustomHeadersConfig | undefined;
    /**
     * Current remove-headers configuration.
     */
    removeHeadersConfig: cloudfront.ResponseHeadersPolicyRemoveHeadersConfig | undefined;
}, never, Providers> {
}
/**
 * A CloudFront response headers policy.
 *
 * Response headers policies add or remove headers in viewer responses,
 * including CORS, standard security headers (HSTS, X-Frame-Options,
 * X-Content-Type-Options, Referrer-Policy, etc.), Server-Timing, custom
 * headers and explicit header removal. They are referenced by ID on a
 * Distribution's default behavior or per-path cache behaviors.
 * ### Creating Response Headers Policies
 * **Example:** Standard security + CORS
 * ```typescript
 * const responseHeadersPolicy = yield* ResponseHeadersPolicy("AppResponseHeaders", {
 *   comment: "Default app security + CORS",
 *   corsConfig: {
 *     AccessControlAllowOrigins: { Quantity: 1, Items: ["https://app.example.com"] },
 *     AccessControlAllowMethods: { Quantity: 2, Items: ["GET", "OPTIONS"] },
 *     AccessControlAllowHeaders: { Quantity: 1, Items: ["Authorization"] },
 *     AccessControlAllowCredentials: false,
 *     OriginOverride: true,
 *   },
 *   securityHeadersConfig: {
 *     StrictTransportSecurity: {
 *       AccessControlMaxAgeSec: 31536000,
 *       IncludeSubdomains: true,
 *       Preload: true,
 *       Override: true,
 *     },
 *     ContentTypeOptions: { Override: true },
 *     FrameOptions: { FrameOption: "DENY", Override: true },
 *     ReferrerPolicy: { ReferrerPolicy: "no-referrer", Override: true },
 *   },
 * });
 * ```
 *
 * @resource
 */
export declare const ResponseHeadersPolicy: import("alchemy").ResourceClass<ResponseHeadersPolicy>;
export declare const ResponseHeadersPolicyProvider: () => import("effect/Layer").Layer<Provider.Provider<ResponseHeadersPolicy>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};
