import * as route53 from "@distilled.cloud/aws/route-53";
import * as Effect from "effect/Effect";
declare const HostedZoneLookupInvalidProps_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "HostedZoneLookupInvalidProps";
} & Readonly<A>;
export declare class HostedZoneLookupInvalidProps extends HostedZoneLookupInvalidProps_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
/**
 * Find the most specific PUBLIC Route 53 hosted zone containing
 * `domainName`, walking up its labels (`svc.api.example.com` →
 * `api.example.com` → `example.com`). Wildcard labels (`*`) never name a
 * zone, so they fall through to the parent naturally. Returns the bare
 * zone id (no `/hostedzone/` prefix), or `undefined` when no public zone
 * matches.
 *
 * Shared by every provider that infers a hosted zone from a hostname
 * (Route 53 Record/Records, ACM Certificate validation, ECS Service DNS).
 */
export declare const findPublicHostedZoneId: (domainName: string) => Effect.Effect<string | undefined, route53.ListHostedZonesByNameError, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient>;
/**
 * Resolve the hosted zone for `domainName`: the explicit id when given,
 * otherwise the most specific public zone in the account (see
 * {@link findPublicHostedZoneId}). Fails with an actionable error when
 * neither yields a zone.
 */
export declare const resolveHostedZoneId: (hostedZoneId: string | undefined, domainName: string) => Effect.Effect<string, HostedZoneLookupInvalidProps | route53.ListHostedZonesByNameError, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient>;
export {};
