import * as Layer from "effect/Layer";
import { CreateIssueComment } from "./CreateIssueComment.js";
/**
 * Implementation of {@link CreateIssueComment} with the provider's current credentials.
 * Provide it on an `Action` or another deploy-time Effect.
 *
 * @layer
 * @product Issue
 * @provides GitHub.CreateIssueComment
 */
export declare const CreateIssueCommentLocal: Layer.Layer<CreateIssueComment, import("@distilled.cloud/github").ConfigError, import("@distilled.cloud/github").Credentials>;
