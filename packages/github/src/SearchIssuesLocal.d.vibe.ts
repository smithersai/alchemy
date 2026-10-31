import * as Layer from "effect/Layer";
import { SearchIssues } from "./SearchIssues.js";
/**
 * Implementation of {@link SearchIssues} with the provider's current credentials.
 * Provide it on an `Action` or another deploy-time Effect.
 *
 * @layer
 * @product Issue
 * @provides GitHub.SearchIssues
 */
export declare const SearchIssuesLocal: Layer.Layer<SearchIssues, import("@distilled.cloud/github").ConfigError, import("@distilled.cloud/github").Credentials>;
