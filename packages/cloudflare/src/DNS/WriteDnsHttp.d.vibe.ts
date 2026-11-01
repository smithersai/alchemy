import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import { type DnsAuth } from "./DnsHttp.js";
import { WriteDns, type WriteDnsClient } from "./WriteDns.vibe";
/** Runtime layer for {@link WriteDns}. */
export declare const WriteDnsHttp: Layer.Layer<WriteDns, never, import("alchemy/Self").Self<{
    Type: string;
    LogicalId: string;
}>>;
/** Build the write client over an injectable auth and zone id. */
export declare const dnsWriteClient: (auth: DnsAuth, zoneId: Effect.Effect<string>) => WriteDnsClient;
