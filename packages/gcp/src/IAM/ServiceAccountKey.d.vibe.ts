import * as iam from "@distilled.cloud/gcp/unstable/iam_v1";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import * as Redacted from "effect/Redacted";
import type { Providers } from "../Providers.js";
export type ServiceAccountKeyProps = {
    /**
     * Email of the service account the key belongs to. Changing it replaces
     * the key.
     */
    serviceAccount: string;
};
export type ServiceAccountKey = Resource<"GCP.IAM.ServiceAccountKey", ServiceAccountKeyProps, {
    /** Full resource name `projects/{project}/serviceAccounts/{email}/keys/{keyId}`. */
    name: string;
    /** Email of the service account the key belongs to. */
    serviceAccount: string;
    /** The key's `private_key_id`. */
    privateKeyId: string;
    /**
     * The key's PKCS #8 PEM private key. Google returns it only when the key
     * is created, so it lives in Alchemy's state.
     */
    privateKey: Redacted.Redacted<string>;
}, never, Providers>;
/**
 * A key for a Google Cloud IAM service account, for code that runs outside
 * GCP and has to sign as the account.
 *
 * Prefer running as the service account (Cloud Run, Cloud Functions, GKE
 * Workload Identity) where you can: a key is a long-lived secret. Some
 * organizations block key creation with the
 * `iam.disableServiceAccountKeyCreation` policy.
 *
 * ### Creating a Key
 * **Example:** Key for a service account
 * ```typescript
 * const account = yield* GCP.IAM.ServiceAccount("Ci", {});
 * const key = yield* GCP.IAM.ServiceAccountKey("CiKey", {
 *   serviceAccount: account.email,
 * });
 * ```
 *
 * @resource
 * @category IAM
 */
export declare const ServiceAccountKey: import("alchemy/Resource").ResourceClass<ServiceAccountKey>;
declare const ServiceAccountKeyInvalid_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "GCP.IAM.ServiceAccountKeyInvalid";
} & Readonly<A>;
export declare class ServiceAccountKeyInvalid extends ServiceAccountKeyInvalid_base<{
    resourceName: string;
}> {
}
export declare const ServiceAccountKeyProvider: () => import("effect/Layer").Layer<Provider.Provider<ServiceAccountKey>, never, iam.GcpOpContext>;
export {};
