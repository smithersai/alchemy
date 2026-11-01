import type { Input } from "alchemy/Input";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.vibe";
export interface UsagePlanKeyProps {
    /** ID of the usage plan to add the key to. */
    usagePlanId: Input<string>;
    /** ID of the API key to associate. */
    keyId: Input<string>;
    /**
     * @default "API_KEY"
     */
    keyType?: string;
}
/** @resource */
export interface UsagePlanKey extends Resource<"AWS.ApiGateway.UsagePlanKey", UsagePlanKeyProps, {
    usagePlanId: string;
    keyId: string;
    keyType: string;
    name: string | undefined;
}, never, Providers> {
}
/**
 * Associates an API key with a usage plan.
 *
 * ### Usage plan keys
 * **Example:** Associate key with plan
 * ```typescript
 * yield* ApiGateway.UsagePlanKey("PlanKey", {
 *   usagePlanId: plan.id,
 *   keyId: key.id,
 * });
 * ```
 */
declare const UsagePlanKeyResource: import("alchemy").ResourceClass<UsagePlanKey>;
export { UsagePlanKeyResource as UsagePlanKey };
export declare const UsagePlanKeyProvider: () => import("effect/Layer").Layer<Provider.Provider<UsagePlanKey>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient>;
