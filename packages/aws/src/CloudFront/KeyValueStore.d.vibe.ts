import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.vibe";
export interface KeyValueStoreProps {
    /**
     * KeyValueStore name. If omitted, a deterministic name is generated.
     */
    name?: string;
    /**
     * Optional store comment.
     */
    comment?: string;
}
export interface KeyValueStore extends Resource<"AWS.CloudFront.KeyValueStore", KeyValueStoreProps, {
    /**
     * KeyValueStore ID.
     */
    keyValueStoreId: string;
    /**
     * Store ARN.
     */
    keyValueStoreArn: string;
    /**
     * Store name.
     */
    keyValueStoreName: string;
    /**
     * Current comment.
     */
    comment: string;
}, never, Providers> {
}
/**
 * A CloudFront KeyValueStore for edge metadata.
 *
 * KeyValueStores can be associated with CloudFront Functions and are useful for
 * routing metadata or other small edge-time lookup tables.
 * ### Creating KeyValueStores
 * **Example:** Basic Store
 * ```typescript
 * const store = yield* KeyValueStore("RouterStore", {
 *   comment: "Route metadata",
 * });
 * ```
 *
 * @resource
 */
export declare const KeyValueStore: import("alchemy").ResourceClass<KeyValueStore>;
export declare const KeyValueStoreProvider: () => import("effect/Layer").Layer<Provider.Provider<KeyValueStore>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
