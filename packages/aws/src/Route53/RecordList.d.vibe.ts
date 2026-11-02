import type { DnsRecord, DnsRecordType } from "alchemy/DNS/Adapter";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.ts";
export interface RecordListProps {
    /**
     * Hosted zone that owns every record. When omitted, each record's zone
     * is the most specific PUBLIC hosted zone in the account containing its
     * name, so one list may span several zones (e.g. certificate validation
     * records for `example.com` and `example.org`).
     */
    hostedZoneId?: string;
    /**
     * Records to publish.
     *
     * - `CNAME` — the record set at the name is overwritten (`UPSERT`).
     * - `A` / `AAAA` — the name's record set of that type holds exactly the
     *   listed values.
     * - `TXT` — the listed values are merged into the name's TXT record set,
     *   alongside values published by anyone else.
     */
    records: DnsRecord[];
}
/** One record published by a {@link RecordList}. */
export interface RecordListEntry {
    /** Hosted zone the record lives in. */
    hostedZoneId: string;
    /** Normalized record name (lowercase, no trailing dot). */
    name: string;
    /** Record type. */
    type: DnsRecordType;
    /** Normalized record value (TXT values unquoted). */
    value: string;
    /** TTL in seconds. */
    ttl: number;
}
export interface RecordList extends Resource<"AWS.Route53.RecordList", RecordListProps, {
    /** Every record this list currently publishes. */
    records: RecordListEntry[];
}, never, Providers> {
}
/**
 * An explicit list of Route 53 records whose values are typically computed
 * from another resource's outputs — ACM certificate validation CNAMEs, a
 * platform's ownership-verification TXT, a Fly App's addresses.
 *
 * This is the resource an `AWS.Route53.Adapter()` declares for
 * `domain.dns` record publication (see
 * [DNS Adapters](/infrastructure-as-code/dns-adapters)). Each record's
 * hosted zone is inferred from its name unless `hostedZoneId` is set, and
 * only the values the list published are removed when they leave the list
 * or the list is destroyed.
 * ### Publishing Records
 * **Example:** Verification TXT For A Railway Domain
 * ```typescript
 * yield* AWS.Route53.RecordList("Verify", {
 *   records: [
 *     {
 *       name: "_railway-verify.app.example.com",
 *       type: "TXT",
 *       value: "railway-verify=abc123",
 *     },
 *   ],
 * });
 * ```
 *
 * @resource
 */
export declare const RecordList: import("alchemy").ResourceClass<RecordList>;
export declare const RecordListProvider: () => import("effect/Layer").Layer<Provider.Provider<RecordList>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient>;
