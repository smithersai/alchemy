import type { DnsConfig } from "alchemy/DNS/Adapter";
import * as Output from "alchemy/Output";
import { type ProviderMode } from "alchemy/ProviderMode";
/**
 * Custom domains for `AWS.Lambda.Function`.
 *
 * Lambda Function URLs cannot serve a custom hostname, so a Function's
 * `domain` composes an API Gateway v2 HTTP API front door (the
 * `ApiGatewayV2.HttpApi` composite: `$default` route, `AWS_PROXY`
 * integration with payload 2.0 — the Function URL event shape — and an
 * auto-deployed `$default` stage), a regional ACM certificate, one
 * `ApiGatewayV2.DomainName` + `ApiMapping` per hostname, and the alias
 * records, published through whichever DNS host `domain.dns` names.
 *
 * Composition references the Function's own outputs (ARN, name), so it
 * runs from the platform's `onCreate` hook, after the Function resource is
 * declared.
 */
import * as Effect from "effect/Effect";
/** Object form of the `AWS.Lambda.Function` `domain` prop. */
export interface FunctionDomainConfig {
    /**
     * Hostname that serves the Function, e.g. `api.example.com`. The
     * Function's `domainUrl` attribute is `https://{name}`.
     */
    name: string;
    /**
     * Additional hostnames that serve the Function. Each gets its own API
     * Gateway domain name, API mapping, alias record, and a subject
     * alternative name on the ACM certificate.
     */
    aliases?: string[];
    /**
     * Route 53 hosted zone for the certificate validation and alias records.
     * Optional — when omitted, the most specific PUBLIC hosted zone in the
     * account containing each hostname is inferred. Ignored when {@link dns}
     * names another DNS host.
     */
    hostedZoneId?: string;
    /**
     * DNS host for the certificate validation and alias records (see
     * [DNS Adapters](/infrastructure-as-code/dns-adapters)). Omitted: Route
     * 53 (see {@link hostedZoneId}) with an `A` alias record per hostname.
     * Pass `Cloudflare.DNS.Adapter()` or `Hetzner.DNS.Adapter()` for a
     * domain whose DNS lives there — each hostname gets a `CNAME` to the API
     * Gateway domain and the certificate is validated through that host.
     */
    dns?: DnsConfig;
}
/**
 * A Function's custom domain: a hostname (Route 53 DNS), or a
 * {@link FunctionDomainConfig}.
 */
export type FunctionDomain = string | FunctionDomainConfig;
declare const InvalidFunctionDomain_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "InvalidFunctionDomain";
} & Readonly<A>;
/**
 * The `domain` prop of an `AWS.Lambda.Function` is invalid (empty or
 * duplicate hostnames). Raised as a defect while the stack program is
 * built, before anything is deployed.
 */
export declare class InvalidFunctionDomain extends InvalidFunctionDomain_base<{
    readonly functionId: string;
    readonly message: string;
}> {
}
/** Normalize the `domain` prop to its object form. */
export declare const normalizeFunctionDomain: (domain: FunctionDomain | undefined) => FunctionDomainConfig | undefined;
/** `https://{name}` of a Function's custom domain. */
export declare const functionDomainUrl: (domain: FunctionDomain | undefined) => string | undefined;
/** The Function outputs the front door references. */
interface FunctionDomainHost {
    readonly LogicalId: string;
    readonly Mode: ProviderMode | undefined;
    readonly functionArn: Output.Output<string>;
    readonly functionName: Output.Output<string>;
    readonly qualifiedArn: Output.Output<string>;
}
/**
 * Compose the API Gateway front door and DNS for a Function's `domain`
 * under the Function's namespace. A no-op at runtime, without a `domain`,
 * and when the Function runs locally under `alchemy dev` (a local Function
 * has no cloud ARN to integrate; opt a Function out with `Alchemy.remote()`
 * to serve its domain during dev).
 *
 * Resources (under `{FunctionId}/`):
 *
 * - `Api/*` — `ApiGatewayV2.HttpApi` (Api, Integration, `$default` Route,
 *   Stage, invoke Permission)
 * - `Certificate` (+ `CertificateValidation` / `CertificateIssued` on a
 *   non-Route 53 DNS host) — in the Function's region
 * - `DomainName-{host}` / `ApiMapping-{host}` — per hostname
 * - `Domain-{host}` — the DNS host's alias record(s) per hostname
 */
export declare const composeFunctionDomain: (fn: FunctionDomainHost, domainProp: FunctionDomain | undefined) => Effect.Effect<void, never, any>;
export {};
