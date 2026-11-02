import * as emailAuth from "@distilled.cloud/cloudflare/email-auth";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { CloudflareEnvironment } from "../CloudflareEnvironment.ts";
import type { Providers } from "../Providers.ts";
import { type Reference } from "../Zone/index.ts";
export type DmarcReportsStatus = "missing-dmarc-report" | "multiple-dmarc-reports" | "missing-dmarc-rua" | "cname-on-dmarc-record" | "unauthorized-reporting-domain";
export type DmarcReportsProps = {
    /**
     * Apex zone to manage DMARC reports for. Accepts a zone id, a zone name
     * (`example.com`), or a `{ zoneId, name? }` object. The zone's DNS must be
     * hosted on Cloudflare. Changing the zone replaces the resource.
     */
    zone: Reference;
    /**
     * Whether DMARC reports are enabled on the zone. Enabling makes
     * Cloudflare add its RUA address to the zone's `_dmarc` record.
     *
     * @default true
     */
    enabled?: boolean;
};
export type DmarcReports = Resource<"Cloudflare.Email.DmarcReports", DmarcReportsProps, {
    /** Zone identifier. */
    zoneId: string;
    /** Whether DMARC reports are enabled on the zone. */
    enabled: boolean;
    /**
     * Prefix of the Cloudflare RUA address that receives aggregate reports
     * (32-char hex string).
     */
    ruaPrefix: string | undefined;
    /**
     * DMARC configuration problem, if any. `undefined` when DMARC is
     * correctly configured.
     */
    status: DmarcReportsStatus | undefined;
}, never, Providers>;
/**
 * Enables Cloudflare [DMARC Management](https://developers.cloudflare.com/dmarc-management/)
 * on an apex zone. Cloudflare receives the zone's aggregate DMARC reports
 * and shows which sources send mail as your domain.
 *
 * Enabling adds Cloudflare's RUA address to the zone's `_dmarc` TXT record
 * (creating the record when it is missing). Disabling or destroying the
 * resource only turns reporting off; it never deletes the zone or any DNS
 * record.
 *
 * ### Enabling DMARC reports
 * **Example:** Enable on a zone you own
 * ```typescript
 * const dmarc = yield* Cloudflare.Email.DmarcReports("Dmarc", {
 *   zone: "example.com",
 * });
 * ```
 *
 * **Example:** Keep the resource but turn reporting off
 * ```typescript
 * const dmarc = yield* Cloudflare.Email.DmarcReports("Dmarc", {
 *   zone: "example.com",
 *   enabled: false,
 * });
 * ```
 *
 * @resource
 * @product Email
 * @category Email
 */
export declare const DmarcReports: import("alchemy").ResourceClass<DmarcReports>;
export declare const DmarcReportsProvider: () => import("effect/Layer").Layer<Provider.Provider<DmarcReports>, never, CloudflareEnvironment | emailAuth.CloudflareOpContext>;
