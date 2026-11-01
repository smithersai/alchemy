import * as Provider from "alchemy/Provider";
import { Resource } from "alchemy/Resource";
import type { AccountID } from "../Environment.js";
import type { Providers } from "../Providers.js";
declare const ECRPublicRepositoryUnexpectedResponse_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "ECRPublicRepositoryUnexpectedResponse";
} & Readonly<A>;
export declare class ECRPublicRepositoryUnexpectedResponse extends ECRPublicRepositoryUnexpectedResponse_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export type RepositoryName = string;
export type RepositoryArn = `arn:aws:ecr-public::${AccountID}:repository/${RepositoryName}`;
/**
 * Catalog display metadata shown on the public.ecr.aws gallery page for a
 * repository. All fields are optional and free-form.
 */
export interface PublicRepositoryCatalogData {
    /** Short description of the contents of the repository. */
    description?: string;
    /** CPU architectures the images support (e.g. `["x86-64", "ARM 64"]`). */
    architectures?: string[];
    /** Operating systems the images support (e.g. `["Linux"]`). */
    operatingSystems?: string[];
    /** Detailed "about" markdown shown on the gallery page. */
    aboutText?: string;
    /** Usage instructions markdown shown on the gallery page. */
    usageText?: string;
}
export interface PublicRepositoryProps {
    /**
     * Name of the public repository. If omitted, a unique name is generated.
     * Must be lowercase.
     */
    repositoryName?: string;
    /**
     * Catalog display metadata for the public gallery page.
     */
    catalogData?: PublicRepositoryCatalogData;
    /**
     * Repository permission policy JSON granting push/pull access to other
     * principals. Omit for a private-push, public-pull repository.
     */
    policyText?: string;
    /**
     * User-defined tags to apply to the repository.
     */
    tags?: Record<string, string>;
}
export interface PublicRepository extends Resource<"AWS.ECRPublic.Repository", PublicRepositoryProps, {
    /** The name of the public repository. */
    repositoryName: RepositoryName;
    /** The ARN of the public repository. */
    repositoryArn: RepositoryArn;
    /** The public pull URI, e.g. `public.ecr.aws/<alias>/<name>`. */
    repositoryUri: string;
    /** The AWS account ID of the registry. */
    registryId: string;
    /** The JSON repository permissions policy, if any. */
    policyText?: string;
    /** The tags attached to the repository. */
    tags: Record<string, string>;
}, never, Providers> {
}
/**
 * An Amazon ECR Public repository on the public.ecr.aws registry. Images pushed
 * here are pullable by anyone. ECR Public is a global service hosted only in
 * `us-east-1`; this resource pins every control-plane call there regardless of
 * the stack region.
 *
 * ### Creating Public Repositories
 * **Example:** Basic Public Repository
 * ```typescript
 * const repo = yield* PublicRepository("MyPublicRepo", {});
 * ```
 *
 * **Example:** With Catalog Metadata
 * ```typescript
 * const repo = yield* PublicRepository("MyPublicRepo", {
 *   catalogData: {
 *     description: "My awesome container image",
 *     architectures: ["x86-64", "ARM 64"],
 *     operatingSystems: ["Linux"],
 *     aboutText: "# About\nThis image does X.",
 *     usageText: "docker pull public.ecr.aws/...",
 *   },
 * });
 * ```
 *
 * ### Access Policies
 * **Example:** Grant Cross-Account Push
 * ```typescript
 * const repo = yield* PublicRepository("MyPublicRepo", {
 *   policyText: JSON.stringify({
 *     Version: "2012-10-17",
 *     Statement: [
 *       {
 *         Sid: "AllowPush",
 *         Effect: "Allow",
 *         Principal: { AWS: "arn:aws:iam::123456789012:root" },
 *         Action: ["ecr-public:BatchCheckLayerAvailability", "ecr-public:PutImage"],
 *       },
 *     ],
 *   }),
 * });
 * ```
 *
 * @resource
 */
export declare const PublicRepository: import("alchemy").ResourceClass<PublicRepository>;
export declare const PublicRepositoryProvider: () => import("effect/Layer").Layer<Provider.Provider<PublicRepository>, never, import("@distilled.cloud/aws/Credentials").Credentials | import("effect/http/HttpClient").HttpClient | import("alchemy").Stack | import("alchemy").Stage>;
export {};
