import * as Pulls from "@distilled.cloud/github/pulls";
import * as Layer from "effect/Layer";
import * as BindingHttp from "./BindingHttp.js";
import { ListPullRequestReviewComments, type ListPullRequestReviewCommentsRequest } from "./ListPullRequestReviewComments.js";
export declare const listPullRequestReviewCommentsOperation: BindingHttp.Operation<[request: ListPullRequestReviewCommentsRequest], Pulls.ListReviewCommentsResponseBodyList, Pulls.GithubOpError>;
/**
 * Token-backed implementation of {@link ListPullRequestReviewComments}. Provide it on a Worker or
 * Function: it captures a `GitHub.PersonalAccessToken` for the host and binds
 * the token and the repository into it.
 *
 * @layer
 * @product Pull Request
 * @provides GitHub.ListPullRequestReviewComments
 */
export declare const ListPullRequestReviewCommentsHttp: Layer.Layer<ListPullRequestReviewComments, never, import("alchemy/Self").Self<{
    Type: string;
    LogicalId: string;
}>>;
