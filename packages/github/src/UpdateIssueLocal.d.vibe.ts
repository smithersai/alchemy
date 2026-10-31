import * as Layer from "effect/Layer";
import { UpdateIssue } from "./UpdateIssue.js";
/**
 * Implementation of {@link UpdateIssue} with the provider's current credentials.
 * Provide it on an `Action` or another deploy-time Effect.
 *
 * @layer
 * @product Issue
 * @provides GitHub.UpdateIssue
 */
export declare const UpdateIssueLocal: Layer.Layer<UpdateIssue, import("@distilled.cloud/github").ConfigError, import("@distilled.cloud/github").Credentials>;
