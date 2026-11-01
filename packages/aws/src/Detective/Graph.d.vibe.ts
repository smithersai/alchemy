import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.vibe";
export interface GraphProps {
    /**
     * Tags applied to the behavior graph. Alchemy ownership tags are merged in
     * automatically so the graph can be recognized on subsequent runs.
     */
    tags?: Record<string, string>;
}
/** @resource */
export interface Graph extends Resource<"AWS.Detective.Graph", GraphProps, {
    /** ARN of the Detective behavior graph. */
    graphArn: string;
    /** ISO timestamp of when the graph was created. */
    createdTime: string | undefined;
}, never, Providers> {
}
/**
 * A Detective behavior graph — the account/region singleton that enables Amazon
 * Detective. An account can have at most one behavior graph per region, so this
 * resource is a capture-and-restore singleton: adopting a pre-existing graph
 * that Alchemy did not create requires `--adopt`.
 *
 * ### Enabling Detective
 * **Example:** Enable a behavior graph
 * ```typescript
 * const graph = yield* Detective.Graph("Graph", {});
 * ```
 *
 * **Example:** Enable with tags
 * ```typescript
 * const graph = yield* Detective.Graph("Graph", {
 *   tags: { team: "security" },
 * });
 * ```
 */
declare const GraphResource: import("alchemy").ResourceClass<Graph>;
export { GraphResource as Graph };
export declare const GraphProvider: () => import("effect/Layer").Layer<Provider.Provider<Graph>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
