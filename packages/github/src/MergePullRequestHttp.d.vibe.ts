import * as Pulls from "@distilled.cloud/github/pulls";
import * as Layer from "effect/Layer";
import * as BindingHttp from "./BindingHttp.js";
import { MergePullRequest, type MergePullRequestRequest } from "./MergePullRequest.js";
export declare const mergePullRequestOperation: BindingHttp.Operation<[request: MergePullRequestRequest], Pulls.PullRequestMergeResult, Pulls.MergeError>;
/**
 * Token-backed implementation of {@link MergePullRequest}. Provide it on a Worker or
 * Function: it captures a `GitHub.PersonalAccessToken` for the host and binds
 * the token and the repository into it.
 *
 * @layer
 * @product Pull Request
 * @provides GitHub.MergePullRequest
 */
export declare const MergePullRequestHttp: Layer.Layer<MergePullRequest, never, import("alchemy/Self").Self<{
    Type: string;
    LogicalId: string;
}>>;
