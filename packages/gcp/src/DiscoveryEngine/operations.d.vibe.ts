import * as discoveryengine from "@distilled.cloud/gcp/discoveryengine_v1";
import * as Effect from "effect/Effect";
export declare const resourceNameFromOperation: (operation: discoveryengine.GoogleLongrunningOperation) => string | undefined;
/**
 * Wait for a Discovery Engine operation; data store and engine creation
 * take a few minutes. ALREADY_EXISTS (code 6) counts as success (create
 * race); with `notFoundOk`, so does NOT_FOUND (code 5, delete race) and an
 * operation that is already gone.
 */
export declare const waitForOperation: (operation: discoveryengine.GoogleLongrunningOperation, options?: {
    notFoundOk?: boolean;
}) => Effect.Effect<discoveryengine.GoogleLongrunningOperation | import("../Operation.js").LongRunningOperation, import("../Operation.js").OperationFailed | import("../Operation.js").OperationTimedOut | discoveryengine.GetProjectsLocationsOperationsError, discoveryengine.GcpOpContext>;
