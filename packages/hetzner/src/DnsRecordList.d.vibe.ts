import * as Hetzner from "@distilled.cloud/hetzner";
import type { DnsRecord, DnsRecordType } from "alchemy/DNS/Adapter";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "./Providers.js";
declare const DnsRecordListInvalidProps_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "DnsRecordListInvalidProps";
} & Readonly<A>;
export declare class DnsRecordListInvalidProps extends DnsRecordListInvalidProps_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface RecordListProps {
    /**
     * Zone that owns every record — a Hetzner zone id or zone name. When
     * omitted, each record's zone is inferred from its name by walking its
     * parent domains, so one list may span several zones.
     */
    zone?: string;
    /**
     * Records to publish. Each value is added to the name's RRSet alongside
     * values published by anyone else (the RRSet is created when missing);
     * a `CNAME` RRSet holds exactly one value, so a differing one is
     * replaced.
     */
    records?: DnsRecord[];
    /**
     * Hostnames pointed at {@link target} with a `CNAME`, merged with
     * hostnames bound through the `{ names }` binding contract (see
     * {@link RecordListBinding}).
     */
    names?: string[];
    /** CNAME target of {@link names} and bound hostnames. */
    target?: string;
}
/**
 * Binding contract of {@link RecordList}: composites (e.g. a site attached
 * to an `AWS.Website.Router`) add hostnames pointed at
 * {@link RecordListProps.target} without a circular input prop.
 */
export type RecordListBinding = {
    /** Additional hostnames pointed at the list's `target`. */
    names?: string[];
};
/** One record published by a {@link RecordList}. */
export interface RecordListEntry {
    /** Numeric id of the zone the record lives in. */
    zoneId: number;
    /** RRSet name relative to the zone (`@` for the apex). */
    name: string;
    /** Record type. */
    type: DnsRecordType;
    /** Normalized record value (TXT values unquoted, hostnames without a trailing dot). */
    value: string;
}
export interface RecordListAttributes {
    /** Every record this list currently publishes. */
    records: RecordListEntry[];
}
export type RecordList = Resource<"Hetzner.DNS.RecordList", RecordListProps, RecordListAttributes, RecordListBinding, Providers>;
/**
 * An explicit list of Hetzner DNS records whose values are typically
 * computed from another resource's outputs — ACM certificate validation
 * CNAMEs, a platform's ownership-verification TXT, a server's addresses.
 *
 * This is the resource a `Hetzner.DNS.Adapter()` declares for
 * `domain.dns` record publication (see
 * [DNS Adapters](/infrastructure-as-code/dns-adapters)). Values are added
 * to (and on removal, removed from) the name's RRSet, so a list never
 * disturbs records it did not publish.
 * ### Publishing Records
 * **Example:** Point A Hostname At A Server
 * ```typescript
 * yield* Hetzner.DNS.RecordList("App", {
 *   zone: "example.com",
 *   records: [{ name: "app.example.com", type: "A", value: server.ipv4 }],
 * });
 * ```
 *
 * @resource
 * @product DNS
 */
export declare const RecordList: import("alchemy/Resource").ResourceClass<RecordList>;
export declare const RecordListProvider: () => import("effect/Layer").Layer<Provider.Provider<RecordList>, never, Hetzner.HetznerOpContext>;
export {};
