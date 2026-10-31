import * as Pulls from "@distilled.cloud/github/pulls";
import * as Layer from "effect/Layer";
import * as BindingHttp from "./BindingHttp.js";
import { ListPullRequests, type ListPullRequestsRequest } from "./ListPullRequests.js";
export declare const listPullRequestsOperation: BindingHttp.Operation<[request?: ListPullRequestsRequest | undefined], Pulls.ListResponseBodyList, Pulls.ListError>;
/**
 * Token-backed implementation of {@link ListPullRequests}. Provide it on a Worker or
 * Function: it captures a `GitHub.PersonalAccessToken` for the host and binds
 * the token and the repository into it.
 *
 * @layer
 * @product Pull Request
 * @provides GitHub.ListPullRequests
 */
export declare const ListPullRequestsHttp: Layer.Layer<ListPullRequests, never, import("alchemy/Self").Self<{
    Type: string;
    LogicalId: string;
}>>;
