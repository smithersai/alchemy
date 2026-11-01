import * as apigee from "@distilled.cloud/gcp/apigee_v1";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { GcpEnvironment } from "../Environment.js";
import type { Providers } from "../Providers.js";
export type ApisKeyvaluemapProps = {
    /**
     * Apigee organization id. Defaults to the GCP project id. Immutable.
     */
    organizationId?: string;
    /**
     * Parent API proxy id or `organizations/{org}/apis/{api}`. Immutable.
     */
    api: string;
    /**
     * Key value map id. If omitted, a unique name is generated. Immutable.
     */
    mapId?: string;
    /**
     * Mask entry values in API responses.
     * @default false
     */
    maskedValues?: boolean;
};
export type ApisKeyvaluemap = Resource<"GCP.Apigee.ApisKeyvaluemap", ApisKeyvaluemapProps, {
    /** Full resource name `organizations/{org}/apis/{api}/keyvaluemaps/{map}`. */
    name: string;
    /** Map id. */
    mapId: string;
    /** Parent API proxy id. */
    apiId: string;
    /** Organization id. */
    organizationId: string;
    /** Project id. */
    project: string;
    /** Whether entry values are masked. */
    maskedValues: boolean;
    /** Whether entries are encrypted (always true on Apigee X). */
    encrypted: boolean;
}, never, Providers>;
/**
 * An API-proxy-scoped Apigee key value map.
 *
 * KVMs have no labels and no List API. Alchemy writes an ownership
 * sentinel entry (`__alchemy`) so `read` can distinguish owned maps.
 * `list` walks alchemy-labeled API proxies and looks up a map whose id
 * matches the proxy id plus any map named on the sentinel of that
 * lookup; maps whose ids cannot be discovered are still deleted with
 * the parent proxy. Changing `mapId`, `api`, or `organizationId`
 * replaces the map.
 *
 * ### Creating a Map
 * **Example:** Generated name on a proxy
 * ```typescript
 * const map = yield* GCP.Apigee.ApisKeyvaluemap("Config", {
 *   api: proxy.apiId,
 * });
 * ```
 *
 * @resource
 * @category Apigee
 */
export declare const ApisKeyvaluemap: import("alchemy/Resource").ResourceClass<ApisKeyvaluemap>;
declare const ApisKeyvaluemapNotResolved_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "GCP.Apigee.ApisKeyvaluemapNotResolved";
} & Readonly<A>;
export declare class ApisKeyvaluemapNotResolved extends ApisKeyvaluemapNotResolved_base<{
    resourceName: string;
}> {
}
export declare const ApisKeyvaluemapProvider: () => import("effect/Layer").Layer<Provider.Provider<ApisKeyvaluemap>, never, GcpEnvironment | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage | apigee.GcpOpContext>;
export {};
