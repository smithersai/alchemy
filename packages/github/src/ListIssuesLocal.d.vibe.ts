import * as Layer from "effect/Layer";
import { ListIssues } from "./ListIssues.js";
/**
 * Implementation of {@link ListIssues} with the provider's current credentials.
 * Provide it on an `Action` or another deploy-time Effect.
 *
 * @layer
 * @product Issue
 * @provides GitHub.ListIssues
 */
export declare const ListIssuesLocal: Layer.Layer<ListIssues, import("@distilled.cloud/github").ConfigError, import("@distilled.cloud/github").Credentials>;
