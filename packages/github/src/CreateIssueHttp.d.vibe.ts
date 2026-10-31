import * as Issues from "@distilled.cloud/github/issues";
import * as Layer from "effect/Layer";
import * as BindingHttp from "./BindingHttp.js";
import { CreateIssue, type CreateIssueRequest } from "./CreateIssue.js";
export declare const createIssueOperation: BindingHttp.Operation<[request: CreateIssueRequest], Issues.Issue, Issues.CreateError>;
/**
 * Token-backed implementation of {@link CreateIssue}. Provide it on a Worker or
 * Function: it captures a `GitHub.PersonalAccessToken` for the host and binds
 * the token and the repository into it.
 *
 * @layer
 * @product Issue
 * @provides GitHub.CreateIssue
 */
export declare const CreateIssueHttp: Layer.Layer<CreateIssue, never, import("alchemy/Self").Self<{
    Type: string;
    LogicalId: string;
}>>;
