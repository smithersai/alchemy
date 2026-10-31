import * as Pulls from "@distilled.cloud/github/pulls";
import * as Layer from "effect/Layer";
import * as BindingHttp from "./BindingHttp.js";
import { ListPullRequestFiles, type ListPullRequestFilesRequest } from "./ListPullRequestFiles.js";
export declare const listPullRequestFilesOperation: BindingHttp.Operation<[request: ListPullRequestFilesRequest], Pulls.ListFilesResponseBodyList, Pulls.ListFilesError>;
/**
 * Token-backed implementation of {@link ListPullRequestFiles}. Provide it on a Worker or
 * Function: it captures a `GitHub.PersonalAccessToken` for the host and binds
 * the token and the repository into it.
 *
 * @layer
 * @product Pull Request
 * @provides GitHub.ListPullRequestFiles
 */
export declare const ListPullRequestFilesHttp: Layer.Layer<ListPullRequestFiles, never, import("alchemy/Self").Self<{
    Type: string;
    LogicalId: string;
}>>;
