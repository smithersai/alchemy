import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.vibe";
export interface AggregationAuthorizationProps {
    /**
     * The 12-digit account ID of the aggregator account that is authorized to
     * collect AWS Config data from this account. Changing it replaces the
     * authorization.
     */
    authorizedAccountId: string;
    /**
     * The region of the aggregator account that is authorized to collect AWS
     * Config data from this account. Changing it replaces the authorization.
     */
    authorizedAwsRegion: string;
    /**
     * Tags to apply to the authorization. Merged with internal Alchemy tags.
     */
    tags?: Record<string, string>;
}
export interface AggregationAuthorization extends Resource<"AWS.Config.AggregationAuthorization", AggregationAuthorizationProps, {
    /** ARN of the aggregation authorization. */
    aggregationAuthorizationArn: string;
    /** The aggregator account authorized to collect data. */
    authorizedAccountId: string;
    /** The aggregator region authorized to collect data. */
    authorizedAwsRegion: string;
}, never, Providers> {
}
/**
 * An AWS Config aggregation authorization that grants an aggregator account
 * in a specific region permission to collect AWS Config configuration and
 * compliance data from this account.
 *
 * The authorization's identity is the `(account, region)` pair — changing
 * either replaces it.
 * ### Authorizing an Aggregator
 * **Example:** Authorize an aggregator account
 * ```typescript
 * import * as Config from "@alchemy.run/aws/Config";
 *
 * const authorization = yield* Config.AggregationAuthorization(
 *   "OrgAggregator",
 *   {
 *     authorizedAccountId: "123456789012",
 *     authorizedAwsRegion: "us-east-1",
 *   },
 * );
 * ```
 *
 * @resource
 */
export declare const AggregationAuthorization: import("alchemy").ResourceClass<AggregationAuthorization>;
export declare const AggregationAuthorizationProvider: () => import("effect/Layer").Layer<Provider.Provider<AggregationAuthorization>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
