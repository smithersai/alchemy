import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { AWSEnvironment } from "../Environment.js";
import type { Providers } from "../Providers.vibe";
export interface DomainProps {
    /**
     * Name of the SimpleDB domain. 3-255 characters; letters, digits, `_`,
     * `-`, and `.` are allowed. Changing the name replaces the domain.
     * @default a generated physical name
     */
    domainName?: string;
}
export interface Domain extends Resource<"AWS.SimpleDB.Domain", DomainProps, {
    domainName: string;
    domainArn: string;
}, {}, Providers> {
}
/**
 * An Amazon SimpleDB domain — the container for SimpleDB items and
 * attributes, analogous to a table.
 *
 * SimpleDB is a legacy service (closed to accounts that never used it and
 * slated for migration via the SimpleDBv2 export API), but domains remain
 * fully manageable on grandfathered accounts. A domain has no mutable
 * configuration: the name is its identity, so any name change replaces the
 * domain. SimpleDB has no tagging API, so Alchemy cannot brand domains for
 * ownership detection.
 * ### Creating Domains
 * **Example:** Basic Domain
 * ```typescript
 * import * as AWS from "@alchemy.run/aws";
 *
 * const domain = yield* AWS.SimpleDB.Domain("MyDomain", {});
 * ```
 *
 * **Example:** Named Domain
 * ```typescript
 * const domain = yield* AWS.SimpleDB.Domain("MyDomain", {
 *   domainName: "my-application-data",
 * });
 * ```
 *
 * @resource
 */
export declare const Domain: import("alchemy").ResourceClass<Domain>;
export declare const DomainProvider: () => import("effect/Layer").Layer<Provider.Provider<Domain>, never, AWSEnvironment | import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
