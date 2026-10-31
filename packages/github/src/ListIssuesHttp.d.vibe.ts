import * as Issues from "@distilled.cloud/github/issues";
import * as Layer from "effect/Layer";
import * as BindingHttp from "./BindingHttp.js";
import { ListIssues, type ListIssuesRequest } from "./ListIssues.js";
export declare const listIssuesOperation: BindingHttp.Operation<[request?: ListIssuesRequest | undefined], Issues.ListForRepoResponseBodyList, Issues.ListForRepoError>;
/**
 * Token-backed implementation of {@link ListIssues}. Provide it on a Worker or
 * Function: it captures a `GitHub.PersonalAccessToken` for the host and binds
 * the token and the repository into it.
 *
 * @layer
 * @product Issue
 * @provides GitHub.ListIssues
 */
export declare const ListIssuesHttp: Layer.Layer<ListIssues, never, import("alchemy/Self").Self<{
    Type: string;
    LogicalId: string;
}>>;
