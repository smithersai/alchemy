import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import { type DnsAuth } from "./DnsHttp.js";
import { ReadWriteDns, type ReadWriteDnsClient } from "./ReadWriteDns.vibe";
/** Runtime layer for {@link ReadWriteDns}. */
export declare const ReadWriteDnsHttp: Layer.Layer<ReadWriteDns, never, import("alchemy/Self").Self<{
    Type: string;
    LogicalId: string;
}>>;
/** Build the combined read + write client over an injectable auth and zone id. */
export declare const dnsReadWriteClient: (auth: DnsAuth, zoneId: Effect.Effect<string>) => ReadWriteDnsClient;
