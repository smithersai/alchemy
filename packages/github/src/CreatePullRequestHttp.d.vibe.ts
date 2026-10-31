import * as Pulls from "@distilled.cloud/github/pulls";
import * as Layer from "effect/Layer";
import * as BindingHttp from "./BindingHttp.js";
import { CreatePullRequest, type CreatePullRequestRequest } from "./CreatePullRequest.js";
export declare const createPullRequestOperation: BindingHttp.Operation<[request: CreatePullRequestRequest], Pulls.PullRequest, Pulls.CreateError>;
/**
 * Token-backed implementation of {@link CreatePullRequest}. Provide it on a Worker or
 * Function: it captures a `GitHub.PersonalAccessToken` for the host and binds
 * the token and the repository into it.
 *
 * @layer
 * @product Pull Request
 * @provides GitHub.CreatePullRequest
 */
export declare const CreatePullRequestHttp: Layer.Layer<CreatePullRequest, never, import("alchemy/Self").Self<{
    Type: string;
    LogicalId: string;
}>>;
