import * as Pulls from "@distilled.cloud/github/pulls";
import * as Layer from "effect/Layer";
import * as BindingHttp from "./BindingHttp.js";
import { ListPullRequestReviews, type ListPullRequestReviewsRequest } from "./ListPullRequestReviews.js";
export declare const listPullRequestReviewsOperation: BindingHttp.Operation<[request: ListPullRequestReviewsRequest], Pulls.ListReviewsResponseBodyList, Pulls.GithubOpError>;
/**
 * Token-backed implementation of {@link ListPullRequestReviews}. Provide it on a Worker or
 * Function: it captures a `GitHub.PersonalAccessToken` for the host and binds
 * the token and the repository into it.
 *
 * @layer
 * @product Pull Request
 * @provides GitHub.ListPullRequestReviews
 */
export declare const ListPullRequestReviewsHttp: Layer.Layer<ListPullRequestReviews, never, import("alchemy/Self").Self<{
    Type: string;
    LogicalId: string;
}>>;
