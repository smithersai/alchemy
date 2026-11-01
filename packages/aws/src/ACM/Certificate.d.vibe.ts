import * as acm from "@distilled.cloud/aws/acm";
import * as route53 from "@distilled.cloud/aws/route-53";
import type { DnsRecord } from "alchemy/DNS/Adapter";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import * as Effect from "effect/Effect";
import type { Providers } from "../Providers.vibe";
declare const CertificateNotReady_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "CertificateNotReady";
} & Readonly<A>;
export declare class CertificateNotReady extends CertificateNotReady_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
declare const CertificateUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "CertificateUnexpectedResponse";
} & Readonly<A>;
export declare class CertificateUnexpectedResponse extends CertificateUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
declare const CertificateOperationFailed_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "CertificateOperationFailed";
} & Readonly<A>;
export declare class CertificateOperationFailed extends CertificateOperationFailed_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface CertificateProps {
    /**
     * Primary domain name for the certificate.
     */
    domainName: string;
    /**
     * Additional domain names to include on the certificate.
     */
    subjectAlternativeNames?: string[];
    /**
     * Validation method for the certificate request.
     * @default "DNS"
     */
    validationMethod?: acm.ValidationMethod;
    /**
     * Route 53 hosted zone used to auto-create DNS validation records.
     *
     * With `validationMethod: "DNS"` the certificate provider upserts the
     * validation records into this zone and waits for issuance. When
     * omitted, the most specific PUBLIC hosted zone in the account
     * containing `domainName` is inferred; if none matches, validation is
     * left to the caller (external DNS) and the certificate is returned
     * pending.
     */
    hostedZoneId?: string;
    /**
     * Who publishes the DNS validation records (with `validationMethod:
     * "DNS"`).
     *
     * - `"route53"` — the provider upserts them into Route 53
     *   ({@link hostedZoneId}, or the inferred public zone) and waits for
     *   issuance.
     * - `"external"` — the provider only waits until ACM has computed the
     *   records and returns the certificate `PENDING_VALIDATION` with
     *   `domainValidationOptions` filled in. Publish them yourself — e.g.
     *   through a DNS adapter with {@link validationRecordsOf} — and wait for
     *   issuance with `AWS.ACM.CertificateValidation`. This is what AWS
     *   composites do for a `domain.dns` outside Route 53.
     *
     * @default "route53"
     */
    dnsValidation?: "route53" | "external";
    /**
     * Requested key algorithm.
     */
    keyAlgorithm?: acm.KeyAlgorithm;
    /**
     * Certificate transparency logging preference.
     *
     * Updated in place via `UpdateCertificateOptions`. Note that AWS no longer
     * allows opting new public certificates out of CT logging.
     */
    certificateTransparencyLoggingPreference?: "ENABLED" | "DISABLED" | undefined;
    /**
     * Whether the certificate's private key can be exported with
     * `acm:ExportCertificate` (see the `ExportCertificate` binding).
     * Exportable public certificates carry an additional charge.
     *
     * Exportability can only be chosen when the certificate is requested —
     * ACM rejects `UpdateCertificateOptions` for it ("Export option for
     * certificates cannot be updated") — so changing this on an existing
     * certificate forces a replacement.
     */
    export?: "ENABLED" | "DISABLED" | undefined;
    /**
     * AWS region to request the certificate in.
     *
     * Defaults to `us-east-1` (the region CloudFront viewer certificates must
     * live in). Set this to the region of a regional consumer — e.g. an ALB
     * HTTPS listener requires the certificate in the load balancer's own
     * region. Changing the region replaces the certificate.
     * @default "us-east-1"
     */
    region?: string;
    /**
     * User-defined tags to apply to the certificate.
     */
    tags?: Record<string, string>;
}
/**
 * Binding contract of {@link Certificate}: composites contribute additional
 * subject alternative names without a circular input prop (e.g. a site
 * attached to an `AWS.Website.Router` binds its hostnames onto the Router's
 * certificate). ACM certificates are immutable — a change in the bound SAN
 * set plans a REPLACEMENT (new certificate requested and validated first,
 * consumers re-pointed, old certificate deleted last).
 */
export type CertificateBinding = {
    /**
     * Additional subject alternative names merged into the certificate's SAN
     * set at reconcile time.
     */
    subjectAlternativeNames?: string[];
};
export interface Certificate extends Resource<"AWS.ACM.Certificate", CertificateProps, {
    /**
     * ARN of the certificate.
     */
    certificateArn: string;
    /**
     * Primary domain name of the certificate.
     */
    domainName: string;
    /**
     * Additional subject alternative names on the certificate.
     */
    subjectAlternativeNames: string[];
    /**
     * Current ACM certificate status.
     */
    status: acm.CertificateStatus | undefined;
    /**
     * ACM-managed domain validation details, including DNS validation records.
     */
    domainValidationOptions: acm.DomainValidation[];
    /**
     * Requested validation method.
     */
    validationMethod: acm.ValidationMethod | undefined;
    /**
     * Requested key algorithm.
     */
    keyAlgorithm: acm.KeyAlgorithm | undefined;
    /**
     * Route 53 hosted zone used for automatic DNS validation, when configured.
     */
    hostedZoneId: string | undefined;
    /**
     * Certificate transparency logging preference currently on the certificate.
     */
    certificateTransparencyLoggingPreference: acm.CertificateTransparencyLoggingPreference | undefined;
    /**
     * Whether the certificate's private key is exportable.
     */
    export: acm.CertificateExport | undefined;
    /**
     * Current tags on the certificate.
     */
    tags: Record<string, string>;
    /**
     * Certificate issue timestamp, when issued.
     */
    issuedAt: Date | undefined;
    /**
     * Certificate expiration timestamp, when issued.
     */
    notAfter: Date | undefined;
}, CertificateBinding, Providers> {
}
declare const CertificateCaaError_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "CertificateCaaError";
} & Readonly<A>;
/**
 * ACM refused to issue the certificate because a CAA record on the domain
 * does not authorize Amazon. Alchemy never writes CAA records itself — add
 * the records named in the message at the zone apex and redeploy.
 */
export declare class CertificateCaaError extends CertificateCaaError_base<{
    readonly certificateArn: string;
    readonly domainName: string;
}> {
    get message(): string;
}
/**
 * An ACM certificate for CloudFront and other AWS endpoints.
 *
 * `Certificate` requests an ACM certificate in `us-east-1`, which is the
 * region required for CloudFront viewer certificates. With DNS validation,
 * the provider creates or updates the Route 53 validation records
 * (`hostedZoneId`, or the inferred public zone) and waits for the
 * certificate to be issued. With `dnsValidation: "external"` the records
 * are published elsewhere — e.g. through a DNS adapter — and
 * `AWS.ACM.CertificateValidation` waits for issuance.
 * ### Requesting Certificates
 * **Example:** DNS-Validated Certificate
 * ```typescript
 * const cert = yield* Certificate("WebsiteCertificate", {
 *   domainName: "www.example.com",
 *   hostedZoneId: "Z1234567890",
 * });
 * ```
 *
 * **Example:** Certificate With SANs
 * ```typescript
 * const cert = yield* Certificate("WebsiteCertificate", {
 *   domainName: "example.com",
 *   subjectAlternativeNames: ["www.example.com"],
 *   hostedZoneId: "Z1234567890",
 * });
 * ```
 *
 * **Example:** Exportable Certificate
 * ```typescript
 * // `export: "ENABLED"` lets the ExportCertificate binding retrieve the
 * // certificate together with its (encrypted) private key at runtime.
 * const cert = yield* Certificate("ExportableCertificate", {
 *   domainName: "www.example.com",
 *   hostedZoneId: "Z1234567890",
 *   export: "ENABLED",
 * });
 * ```
 *
 * **Example:** Certificate Validated Through Another DNS Host
 * ```typescript
 * // DNS lives in Cloudflare: publish ACM's validation CNAMEs through the
 * // Cloudflare DNS adapter, then wait for issuance. AWS composites do this
 * // for you when `domain.dns` is set.
 * const cert = yield* Certificate("WebsiteCertificate", {
 *   domainName: "www.example.com",
 *   dnsValidation: "external",
 * });
 * const dns = yield* DNS.resolve(Cloudflare.DNS.Adapter());
 * yield* dns.records("WebsiteCertificateValidation", {
 *   records: cert.domainValidationOptions.pipe(
 *     Output.map(validationRecordsOf),
 *   ),
 *   retain: true,
 * });
 * const issued = yield* CertificateValidation("WebsiteCertificateIssued", {
 *   certificateArn: cert.certificateArn,
 * });
 * ```
 *
 * ### Certificate Expiry Events
 * **Example:** React to Approaching Expiration
 * ```typescript
 * // ACM emits "ACM Certificate Approaching Expiration" events through
 * // EventBridge — consume them with the ACM expiry event source, scoped
 * // to this certificate.
 * yield* AWS.ACM.consumeExpiryEvents(
 *   { certificateArns: [cert.certificateArn] },
 *   (events) =>
 *     Stream.runForEach(events, (event) =>
 *       Effect.log(
 *         `${event.detail.CommonName} expires in ${event.detail.DaysToExpiry} days`,
 *       ),
 *     ),
 * );
 * ```
 *
 * @resource
 */
export declare const Certificate: import("alchemy").ResourceClass<Certificate>;
export declare const CertificateProvider: () => import("effect/Layer").Layer<Provider.Provider<Certificate>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
/** @internal */
export declare const waitForRoute53Change: (changeId: string) => Effect.Effect<route53.ChangeInfo, CertificateNotReady | route53.GetChangeError, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient>;
/**
 * The DNS validation records of a certificate's `domainValidationOptions`,
 * shaped for a DNS adapter's `records(...)` (or any `RecordList`). A
 * wildcard and its apex (`*.example.com` + `example.com`) share one CNAME,
 * so records are deduped by type + name.
 *
 * **Example:**
 * ```typescript
 * const cert = yield* AWS.ACM.Certificate("Cert", {
 *   domainName: "app.example.com",
 *   dnsValidation: "external",
 * });
 * yield* Cloudflare.DNS.RecordList("CertValidation", {
 *   records: cert.domainValidationOptions.pipe(
 *     Output.map(AWS.ACM.validationRecordsOf),
 *   ),
 * });
 * ```
 */
export declare const validationRecordsOf: (domainValidationOptions: acm.DomainValidation[] | undefined) => DnsRecord[];
/**
 * Describe a certificate in its own region; `undefined` when it is gone.
 * @internal shared with `CertificateValidation`
 */
export declare const describeCertificateDetail: (certificateArn: string) => Effect.Effect<acm.CertificateDetail | undefined, acm.InvalidArnException | acm.ValidationException | import("@distilled.cloud/aws/Errors").CommonErrors, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient>;
/**
 * Poll a certificate until ACM issues it (bounded: 10s × 60). Fails with
 * {@link CertificateCaaError} on `CAA_ERROR`, and with an error naming the
 * status on any other terminal failure.
 * @internal shared with `CertificateValidation`
 */
export declare const waitForCertificateIssued: (certificateArn: string) => Effect.Effect<acm.CertificateDetail, CertificateCaaError | CertificateNotReady | CertificateOperationFailed | CertificateUnexpectedResponse | acm.InvalidArnException | acm.ValidationException | import("@distilled.cloud/aws/Errors").CommonErrors, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient>;
export {};
