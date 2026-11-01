import * as cloudasset from "@distilled.cloud/gcp/cloudasset_v1";
import * as resourcemanager from "@distilled.cloud/gcp/cloudresourcemanager_v3";
import * as pubsub from "@distilled.cloud/gcp/pubsub_v1";
import * as serviceusage from "@distilled.cloud/gcp/unstable/serviceusage_v1beta1";
import * as Effect from "effect/Effect";
import * as Stream from "effect/Stream";
export declare const MAX_ID_LENGTH = 63;
export declare const MAX_SAVED_QUERY_DESCRIPTION = 255;
export declare const NO_OP_EXPRESSION = "true";
export declare const PUBLISHER_ROLE = "roles/pubsub.publisher";
export declare const lastSegment: (value: string) => string;
export declare const parentOf: (name: string, collection: string) => string;
export declare const projectParent: (project: string) => string;
/** Cloud Asset get/delete names require a numeric project, folder, or org. */
export declare const scopeParent: (project: string, explicit?: string) => Effect.Effect<string, resourcemanager.GetProjectsError, cloudasset.GcpOpContext>;
export declare const rfc1035: (name: string, maxLength?: number) => string;
export declare const toPhysicalId: (id: string, explicit: string | undefined, existing: string | undefined, maxLength?: number) => Effect.Effect<string, never, import("alchemy/ResourceContext").ResourceContext | import("alchemy/Stack").Stack | import("alchemy/Stage").Stage>;
export declare const sameText: (left: string | undefined, right: string | undefined) => boolean;
export declare const sortedStrings: (values: readonly string[] | undefined) => string[];
export declare const sameStringList: (left: readonly string[] | undefined, right: readonly string[] | undefined) => boolean;
export declare const sameJson: (left: unknown, right: unknown) => boolean;
export declare const updateMaskOf: (...fields: Array<string | undefined>) => string;
export declare const encodeDescription: (labels: Record<string, string>, description: string | undefined, maxLength?: number) => string;
export declare const parseDescription: (description: string | undefined) => {
    labels: Record<string, string>;
    description: string | undefined;
};
export declare const hasOwnershipMarker: (description: string | undefined) => boolean;
export declare const ownedByAlchemy: (id: string, description: string | undefined) => Effect.Effect<boolean, never, import("alchemy/Stack").Stack | import("alchemy/Stage").Stage>;
export declare const replaceOn: (previous: string | undefined, next: string | undefined) => {
    readonly action: "replace";
    readonly deleteFirst: false;
} | undefined;
export declare const collectPages: <Page, A, E, R>(pages: Stream.Stream<Page, E, R>, items: (page: Page) => readonly A[] | undefined) => Effect.Effect<A[], E, R>;
export declare const topicResource: (topic: string, project: string) => string;
export declare const projectNumberOf: (project: string) => Effect.Effect<string, resourcemanager.GetProjectsError, cloudasset.GcpOpContext>;
export declare const grantCloudAssetPublisher: (project: string, topic: string) => Effect.Effect<void, import("@distilled.cloud/core/errors").BadGateway | pubsub.BadRequest | serviceusage.BadRequest | import("@distilled.cloud/core/config").ConfigError | pubsub.Conflict | resourcemanager.Forbidden | pubsub.Forbidden | serviceusage.Forbidden | import("@distilled.cloud/gcp/Errors").GCPCredentialsError | import("@distilled.cloud/gcp/Errors").GCPParseError | import("@distilled.cloud/core/errors").GatewayTimeout | import("effect/http/HttpClientError").HttpClientError | pubsub.IamMemberNotFound | import("@distilled.cloud/core/errors").InternalServerError | resourcemanager.NotFound | pubsub.NotFound | serviceusage.NotFound | import("../Operation.js").OperationFailed | import("../Operation.js").OperationTimedOut | resourcemanager.ProjectNotFound | import("@distilled.cloud/core/errors").ServiceUnavailable | import("effect/ConfigProvider").SourceError | import("@distilled.cloud/core/errors").TooManyRequests | import("@distilled.cloud/core/errors").Unauthorized | import("@distilled.cloud/gcp/Errors").UnknownGCPError, cloudasset.GcpOpContext>;
/** `feeds.list` is unpaginated: it returns every feed under the parent. */
export declare const listFeeds: (parent: string) => Effect.Effect<cloudasset.FeedList, cloudasset.ListFeedsError, cloudasset.GcpOpContext>;
export declare const listSavedQueries: (parent: string) => Effect.Effect<cloudasset.SavedQuery[], cloudasset.ListSavedQueriesError, cloudasset.GcpOpContext>;
