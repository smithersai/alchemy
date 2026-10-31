import * as Pulls from "@distilled.cloud/github/pulls";
import type { Self } from "alchemy/Self";
import * as Layer from "effect/Layer";
import * as BindingHttp from "./BindingHttp.js";
import { GetPullRequest, type GetPullRequestRequest } from "./GetPullRequest.js";
export declare const getPullRequestOperation: BindingHttp.Operation<[GetPullRequestRequest], string | Pulls.PullRequest, Pulls.GetError>;
/**
 * Token-backed implementation of {@link GetPullRequest}. Provide it on a Worker or
 * Function: it captures a `GitHub.PersonalAccessToken` for the host and binds
 * the token and the repository into it.
 *
 * @layer
 * @product Pull Request
 * @provides GitHub.GetPullRequest
 */
export declare const GetPullRequestHttp: Layer.Layer<GetPullRequest, never, Self>;
