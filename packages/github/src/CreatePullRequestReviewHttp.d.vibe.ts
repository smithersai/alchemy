import * as Pulls from "@distilled.cloud/github/pulls";
import * as Layer from "effect/Layer";
import * as BindingHttp from "./BindingHttp.js";
import { CreatePullRequestReview, type CreatePullRequestReviewRequest } from "./CreatePullRequestReview.js";
export declare const createPullRequestReviewOperation: BindingHttp.Operation<[request: CreatePullRequestReviewRequest], Pulls.PullRequestReview, Pulls.CreateReviewError>;
/**
 * Token-backed implementation of {@link CreatePullRequestReview}. Provide it on a Worker or
 * Function: it captures a `GitHub.PersonalAccessToken` for the host and binds
 * the token and the repository into it.
 *
 * @layer
 * @product Pull Request
 * @provides GitHub.CreatePullRequestReview
 */
export declare const CreatePullRequestReviewHttp: Layer.Layer<CreatePullRequestReview, never, import("alchemy/Self").Self<{
    Type: string;
    LogicalId: string;
}>>;
