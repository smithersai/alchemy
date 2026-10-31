import * as Issues from "@distilled.cloud/github/issues";
import * as Layer from "effect/Layer";
import * as BindingHttp from "./BindingHttp.js";
import { ListIssueComments, type ListIssueCommentsRequest } from "./ListIssueComments.js";
export declare const listIssueCommentsOperation: BindingHttp.Operation<[request: ListIssueCommentsRequest], Issues.ListCommentsResponseBodyList, Issues.ListCommentsError>;
/**
 * Token-backed implementation of {@link ListIssueComments}. Provide it on a Worker or
 * Function: it captures a `GitHub.PersonalAccessToken` for the host and binds
 * the token and the repository into it.
 *
 * @layer
 * @product Issue
 * @provides GitHub.ListIssueComments
 */
export declare const ListIssueCommentsHttp: Layer.Layer<ListIssueComments, never, import("alchemy/Self").Self<{
    Type: string;
    LogicalId: string;
}>>;
