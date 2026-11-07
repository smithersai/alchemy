import * as iam from "@distilled.cloud/gcp/unstable/iam_v1";
import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import { GcpEnvironment } from "../Environment.ts";
import type { Providers } from "../Providers.ts";
/**
 * Nuke-only enumeration of Alchemy-minted Cloud Run / Functions runtime
 * service accounts (`alch-*` with display name {@link ALCHEMY_HOST_SA_DISPLAY_NAME}).
 * Not a user-facing resource.
 *
 * @internal
 */
export type HostServiceAccount = Resource<"GCP.IAM.HostServiceAccount", object, {
    name: string;
    email: string;
    project: string;
    accountId: string;
}, never, Providers>;
export declare const HostServiceAccount: import("alchemy/Resource").ResourceClass<HostServiceAccount>;
export declare const HostServiceAccountProvider: () => import("effect/Layer").Layer<Provider.Provider<HostServiceAccount>, never, GcpEnvironment | iam.GcpOpContext>;
