import { Credentials } from "@distilled.cloud/cloudflare/Credentials";
import * as zones from "@distilled.cloud/cloudflare/zones";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
declare const ZoneLookupInvalidProps_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "ZoneLookupInvalidProps";
} & Readonly<A>;
export declare class ZoneLookupInvalidProps extends ZoneLookupInvalidProps_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
/**
 * Reference to an existing Cloudflare Zone. Accepts:
 *   - a zone id (32 hex characters),
 *   - a zone name (`example.com`), or
 *   - a `{ zoneId, name? }` object (e.g. the output of a `Zone` resource or
 *     {@link importZone}).
 */
export type Reference = string | {
    zoneId: string;
    name?: string;
};
export declare const isId: (zone: string) => boolean;
export declare const matchesZoneHostname: (zoneName: string, hostname: string) => boolean;
export declare const resolveZoneId: ({ accountId, zone, hostname, }: {
    accountId: string;
    zone: Reference | undefined;
    hostname: string;
}) => Effect.Effect<string, ZoneLookupInvalidProps | zones.CloudflareOpError, Credentials | HttpClient.HttpClient>;
type ZoneListItem = {
    id: string;
    name: string;
    account: {
        id?: string | null;
    };
};
export declare const findZoneByName: ({ accountId, name, }: {
    accountId: string;
    name: string;
}) => Effect.Effect<ZoneListItem | undefined, zones.ListZonesError, Credentials | HttpClient.HttpClient>;
/**
 * Exhaustively enumerate every zone in an account. Used by `list()` lifecycle
 * operations on zone-scoped resources to fan out across all zones. Returns only
 * the stable `{ id, name }` pair each caller needs to drive a per-zone list.
 */
export declare const listAllZones: (accountId: string) => Effect.Effect<{
    id: string;
    name: string;
}[], zones.ListZonesError, Credentials | HttpClient.HttpClient>;
/** Hostname plus each parent label, longest first — used to infer a zone. */
export declare const zoneNameCandidates: (hostname: string) => string[];
export {};
