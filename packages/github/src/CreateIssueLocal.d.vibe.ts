import * as Layer from "effect/Layer";
import { CreateIssue } from "./CreateIssue.js";
/**
 * Implementation of {@link CreateIssue} with the provider's current credentials.
 * Provide it on an `Action` or another deploy-time Effect.
 *
 * @layer
 * @product Issue
 * @provides GitHub.CreateIssue
 */
export declare const CreateIssueLocal: Layer.Layer<CreateIssue, import("@distilled.cloud/github").ConfigError, import("@distilled.cloud/github").Credentials>;
