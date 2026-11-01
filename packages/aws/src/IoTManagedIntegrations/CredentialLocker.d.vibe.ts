import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { Providers } from "../Providers.vibe";
declare const CredentialLockerUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "CredentialLockerUnexpectedResponse";
} & Readonly<A>;
export declare class CredentialLockerUnexpectedResponse extends CredentialLockerUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
declare const CredentialLockerOperationFailed_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "CredentialLockerOperationFailed";
} & Readonly<A>;
export declare class CredentialLockerOperationFailed extends CredentialLockerOperationFailed_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface CredentialLockerProps {
    /**
     * Name of the credential locker. If omitted, a unique name is generated
     * from the app, stage, and logical ID. Changing the name replaces the
     * locker (there is no update API).
     */
    name?: string;
    /**
     * User-defined tags to apply to the credential locker.
     */
    tags?: Record<string, string>;
}
export interface CredentialLocker extends Resource<"AWS.IoTManagedIntegrations.CredentialLocker", CredentialLockerProps, {
    /** Service-generated identifier of the credential locker. */
    credentialLockerId: string;
    /** ARN of the credential locker. */
    credentialLockerArn: string;
    /** Name of the credential locker. */
    credentialLockerName: string;
    /** Tags applied to the credential locker (user + internal). */
    tags: Record<string, string>;
}, never, Providers> {
}
/**
 * An AWS IoT Managed Integrations credential locker — a secured store for the
 * credentials that devices use to onboard and authenticate with Managed
 * integrations.
 *
 * IoT Managed Integrations is a regional service available in a limited set
 * of regions (e.g. `eu-west-1`, `ca-central-1`).
 *
 * ### Creating Credential Lockers
 * **Example:** Basic Credential Locker
 * ```typescript
 * const locker = yield* CredentialLocker("DeviceCredentials", {});
 * ```
 *
 * **Example:** Named Credential Locker with Tags
 * ```typescript
 * const locker = yield* CredentialLocker("DeviceCredentials", {
 *   name: "my-device-credentials",
 *   tags: { team: "iot" },
 * });
 * ```
 *
 * @resource
 */
export declare const CredentialLocker: import("alchemy").ResourceClass<CredentialLocker>;
export declare const CredentialLockerProvider: () => import("effect/Layer").Layer<Provider.Provider<CredentialLocker>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};
