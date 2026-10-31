import * as Issues from "@distilled.cloud/github/issues";
import * as Layer from "effect/Layer";
import * as BindingHttp from "./BindingHttp.js";
import { CreateIssueComment, type CreateIssueCommentRequest } from "./CreateIssueComment.js";
export declare const createIssueCommentOperation: BindingHttp.Operation<[request: CreateIssueCommentRequest], Issues.IssueComment, Issues.CreateCommentError>;
/**
 * Token-backed implementation of {@link CreateIssueComment}. Provide it on a Worker or
 * Function: it captures a `GitHub.PersonalAccessToken` for the host and binds
 * the token and the repository into it.
 *
 * @layer
 * @product Issue
 * @provides GitHub.CreateIssueComment
 */
export declare const CreateIssueCommentHttp: Layer.Layer<CreateIssueComment, never, import("alchemy/Self").Self<{
    Type: string;
    LogicalId: string;
}>>;
