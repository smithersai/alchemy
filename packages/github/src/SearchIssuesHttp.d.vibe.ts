import * as Search from "@distilled.cloud/github/search";
import * as Layer from "effect/Layer";
import * as BindingHttp from "./BindingHttp.js";
import { SearchIssues, type SearchIssuesRequest } from "./SearchIssues.js";
export declare const searchIssuesOperation: BindingHttp.Operation<[request: SearchIssuesRequest], Search.IssuesAndPullRequestsResponse, Search.IssuesAndPullRequestsError>;
/**
 * Token-backed implementation of {@link SearchIssues}. Provide it on a Worker or
 * Function: it captures a `GitHub.PersonalAccessToken` for the host and binds
 * the token and the repository into it.
 *
 * @layer
 * @product Issue
 * @provides GitHub.SearchIssues
 */
export declare const SearchIssuesHttp: Layer.Layer<SearchIssues, never, import("alchemy/Self").Self<{
    Type: string;
    LogicalId: string;
}>>;
