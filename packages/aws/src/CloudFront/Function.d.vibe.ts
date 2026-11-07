import * as cloudfront from "@distilled.cloud/aws/cloudfront";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.ts";
declare const FunctionUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "FunctionUnexpectedResponse";
} & Readonly<A>;
export declare class FunctionUnexpectedResponse extends FunctionUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface FunctionProps {
    /**
     * CloudFront Function name. If omitted, a deterministic name is generated.
     */
    name?: string;
    /**
     * CloudFront Function runtime.
     * @default "cloudfront-js-2.0"
     */
    runtime?: cloudfront.FunctionRuntime;
    /**
     * Optional function comment.
     */
    comment?: string;
    /**
     * JavaScript source code for the function.
     */
    code: string;
    /**
     * Optional associated KeyValueStore ARNs.
     */
    keyValueStoreArns?: string[];
}
export interface Function extends Resource<"AWS.CloudFront.Function", FunctionProps, {
    /**
     * CloudFront function ARN.
     */
    functionArn: string;
    /**
     * Function name.
     */
    functionName: string;
    /**
     * Runtime currently configured for the function.
     */
    runtime: cloudfront.FunctionRuntime;
    /**
     * Current comment.
     */
    comment: string;
    /**
     * Deployment stage for the function.
     */
    stage: cloudfront.FunctionStage;
    /**
     * Last modified time.
     */
    lastModifiedTime: Date | undefined;
    /**
     * Latest entity tag for update/delete operations.
     */
    etag: string | undefined;
    /**
     * Associated KeyValueStore ARNs.
     */
    keyValueStoreArns: string[];
}, never, Providers> {
}
/**
 * A CloudFront Function for viewer request and response customization.
 *
 * CloudFront Functions are lightweight JavaScript handlers that run at the
 * edge and can be attached to distribution cache behaviors.
 * ### Creating Functions
 * **Example:** Viewer Request Function
 * ```typescript
 * const fn = yield* Function("RouterRequestFunction", {
 *   code: `
 * async function handler(event) {
 *   event.request.headers["x-forwarded-host"] = {
 *     value: event.request.headers.host.value,
 *   };
 *   return event.request;
 * }
 * `,
 * });
 * ```
 *
 * @resource
 */
export declare const Function: import("alchemy").ResourceClass<Function>;
export declare const FunctionProvider: () => import("effect/Layer").Layer<Provider.Provider<Function>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};
