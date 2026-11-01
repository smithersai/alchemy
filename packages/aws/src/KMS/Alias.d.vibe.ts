import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { AWSEnvironment, type AccountID } from "../Environment.js";
import type { Providers } from "../Providers.js";
import type { RegionID } from "../Region.js";
import type { KeyId } from "./Key.js";
export type AliasName = `alias/${string}`;
export type AliasArn = `arn:aws:kms:${RegionID}:${AccountID}:${AliasName}`;
export interface AliasProps {
    /**
     * Alias name. Must begin with `alias/`. If omitted, Alchemy generates one.
     */
    aliasName?: AliasName;
    /**
     * Target KMS key ID or ARN for this alias.
     */
    targetKeyId: KeyId;
}
export interface Alias extends Resource<"AWS.KMS.Alias", AliasProps, {
    aliasName: AliasName;
    aliasArn: AliasArn;
    targetKeyId: KeyId;
}, never, Providers> {
}
/**
 * An AWS KMS alias that points to a customer managed key.
 *
 * ### Creating Aliases
 * **Example:** Alias for a Key
 * ```typescript
 * import * as KMS from "@alchemy.run/aws/KMS";
 *
 * const key = yield* KMS.Key("AppKey");
 * const alias = yield* KMS.Alias("AppAlias", {
 *   aliasName: "alias/app",
 *   targetKeyId: key.keyId,
 * });
 * ```
 */
export declare const Alias: import("alchemy").ResourceClass<Alias>;
export declare const AliasProvider: () => import("effect/Layer").Layer<Provider.Provider<Alias>, never, AWSEnvironment | import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
