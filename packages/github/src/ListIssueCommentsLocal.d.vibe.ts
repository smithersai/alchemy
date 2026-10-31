import * as Layer from "effect/Layer";
import { ListIssueComments } from "./ListIssueComments.js";
/**
 * Implementation of {@link ListIssueComments} with the provider's current credentials.
 * Provide it on an `Action` or another deploy-time Effect.
 *
 * @layer
 * @product Issue
 * @provides GitHub.ListIssueComments
 */
export declare const ListIssueCommentsLocal: Layer.Layer<ListIssueComments, import("@distilled.cloud/github").ConfigError, import("@distilled.cloud/github").Credentials>;
