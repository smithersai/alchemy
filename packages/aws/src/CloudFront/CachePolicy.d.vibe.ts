import * as cloudfront from "@distilled.cloud/aws/cloudfront";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type * as Duration from "effect/Duration";
import type { Providers } from "../Providers.vibe";
declare const CachePolicyConflict_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "CachePolicyConflict";
} & Readonly<A>;
export declare class CachePolicyConflict extends CachePolicyConflict_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
declare const CachePolicyUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "CachePolicyUnexpectedResponse";
} & Readonly<A>;
export declare class CachePolicyUnexpectedResponse extends CachePolicyUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface CachePolicyProps {
    /**
     * Name of the cache policy. If omitted, a deterministic name is generated.
     *
     * Names must be unique per AWS account. Changing the name triggers
     * a replacement.
     */
    name?: string;
    /**
     * Optional comment describing the policy.
     */
    comment?: string;
    /**
     * Minimum amount of time that objects stay in the cache (e.g.
     * `"1 minute"` or `Duration.minutes(1)`; a bare number is milliseconds).
     */
    minTTL: Duration.Input;
    /**
     * Default amount of time that objects stay in the cache when the origin
     * does not send `Cache-Control` or `Expires` headers (e.g. `"1 hour"`).
     */
    defaultTTL?: Duration.Input;
    /**
     * Maximum amount of time that objects stay in the cache (e.g. `"1 day"`).
     */
    maxTTL?: Duration.Input;
    /**
     * Controls which request values become part of the cache key and which
     * additional headers/cookies/query strings CloudFront forwards to the origin.
     */
    parametersInCacheKeyAndForwardedToOrigin?: cloudfront.ParametersInCacheKeyAndForwardedToOrigin;
}
export interface CachePolicy extends Resource<"AWS.CloudFront.CachePolicy", CachePolicyProps, {
    /**
     * CloudFront-assigned cache policy identifier.
     */
    cachePolicyId: string;
    /**
     * Name of the cache policy.
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
     * Current minimum TTL.
     */
    minTTL: number;
    /**
     * Current default TTL.
     */
    defaultTTL: number | undefined;
    /**
     * Current maximum TTL.
     */
    maxTTL: number | undefined;
    /**
     * Current cache-key/forwarded-value configuration.
     */
    parametersInCacheKeyAndForwardedToOrigin: cloudfront.ParametersInCacheKeyAndForwardedToOrigin | undefined;
}, never, Providers> {
}
/**
 * A CloudFront cache policy.
 *
 * Cache policies determine the values CloudFront includes in the cache key,
 * the headers, cookies and query strings it forwards to the origin, and the
 * TTL bounds for cached responses. Policies are referenced by ID on a
 * Distribution's default behavior or per-path cache behaviors.
 *
 * For AWS-managed policies (CachingOptimized, CachingDisabled,
 * AllViewerExceptHostHeader) reference them by ID via the constants in
 * {@link ManagedPolicies} instead of creating a custom policy.
 * ### Creating Cache Policies
 * **Example:** Cache by query string and Authorization header
 * ```typescript
 * const cachePolicy = yield* CachePolicy("ApiCachePolicy", {
 *   comment: "Cache GETs by query string + Authorization",
 *   minTTL: 0,
 *   defaultTTL: "1 minute",
 *   maxTTL: "1 hour",
 *   parametersInCacheKeyAndForwardedToOrigin: {
 *     EnableAcceptEncodingGzip: true,
 *     EnableAcceptEncodingBrotli: true,
 *     HeadersConfig: {
 *       HeaderBehavior: "whitelist",
 *       Headers: { Quantity: 1, Items: ["Authorization"] },
 *     },
 *     CookiesConfig: { CookieBehavior: "none" },
 *     QueryStringsConfig: { QueryStringBehavior: "all" },
 *   },
 * });
 * ```
 *
 * @resource
 */
export declare const CachePolicy: import("alchemy").ResourceClass<CachePolicy>;
export declare const CachePolicyProvider: () => import("effect/Layer").Layer<Provider.Provider<CachePolicy>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};
