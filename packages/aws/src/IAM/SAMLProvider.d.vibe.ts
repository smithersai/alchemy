import * as iam from "@distilled.cloud/aws/iam";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import * as Redacted from "effect/Redacted";
import { AWSEnvironment } from "../Environment.ts";
import type { Providers } from "../Providers.ts";
declare const SAMLProviderConflict_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "SAMLProviderConflict";
} & Readonly<A>;
export declare class SAMLProviderConflict extends SAMLProviderConflict_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export interface SAMLProviderProps {
    /**
     * The friendly SAML provider name. If omitted, a unique name is
     * generated from the stack, stage, and logical id.
     */
    name?: string;
    /**
     * The provider metadata document.
     */
    samlMetadataDocument: string;
    /**
     * Optional assertion encryption mode.
     */
    assertionEncryptionMode?: iam.AssertionEncryptionModeType;
    /**
     * Optional private key added during creation/update.
     */
    addPrivateKey?: Redacted.Redacted<string> | string;
    /**
     * User-defined tags.
     */
    tags?: Record<string, string>;
}
export interface SAMLProvider extends Resource<"AWS.IAM.SAMLProvider", SAMLProviderProps, {
    /** The ARN of the SAML provider. */
    samlProviderArn: string;
    /** The name of the SAML provider. */
    name: string;
    /** The unique ID AWS assigns to the provider. */
    samlProviderUUID: string | undefined;
    /** The SAML metadata document from the identity provider. */
    samlMetadataDocument: string | undefined;
    /** Whether SAML assertions must be encrypted (`Required` / `Allowed`). */
    assertionEncryptionMode: iam.AssertionEncryptionModeType | undefined;
    /** The tags applied to the provider. */
    tags: Record<string, string>;
}, never, Providers> {
}
/**
 * An IAM SAML identity provider.
 *
 * `SAMLProvider` registers a SAML metadata document so IAM roles can trust an
 * external workforce or application identity provider.
 * ### Federating with SAML
 * **Example:** Create a SAML Identity Provider
 * ```typescript
 * const provider = yield* SAMLProvider("WorkforceSaml", {
 *   samlMetadataDocument: "<EntityDescriptor>...</EntityDescriptor>",
 * });
 * ```
 *
 * @resource
 */
export declare const SAMLProvider: import("alchemy").ResourceClass<SAMLProvider>;
export declare const SAMLProviderProvider: () => import("effect/Layer").Layer<Provider.Provider<SAMLProvider>, never, AWSEnvironment | import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};
