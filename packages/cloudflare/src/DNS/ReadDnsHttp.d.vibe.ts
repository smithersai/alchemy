import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import { type DnsAuth } from "./DnsHttp.js";
import { ReadDns, type ReadDnsClient } from "./ReadDns.vibe";
/** Runtime layer for {@link ReadDns}. */
export declare const ReadDnsHttp: Layer.Layer<ReadDns, never, import("alchemy/Self").Self<{
    Type: string;
    LogicalId: string;
}>>;
/** Build the read-only client over an injectable auth and zone id. */
export declare const dnsReadClient: (auth: DnsAuth, zoneId: Effect.Effect<string>) => ReadDnsClient;
