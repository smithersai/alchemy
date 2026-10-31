import * as Layer from "effect/Layer";
import { GetIssue } from "./GetIssue.js";
/**
 * Implementation of {@link GetIssue} with the provider's current credentials.
 * Provide it on an `Action` or another deploy-time Effect.
 *
 * @layer
 * @product Issue
 * @provides GitHub.GetIssue
 */
export declare const GetIssueLocal: Layer.Layer<GetIssue, import("@distilled.cloud/github").ConfigError, import("@distilled.cloud/github").Credentials>;
