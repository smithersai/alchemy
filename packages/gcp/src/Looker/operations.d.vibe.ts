import * as looker from "@distilled.cloud/gcp/looker_v1";
import * as Effect from "effect/Effect";
/**
 * Wait for a Looker operation; instance backups take several minutes.
 * ALREADY_EXISTS (code 6) counts as success (create race); with
 * `notFoundOk`, so does NOT_FOUND (code 5, delete race) and an operation
 * that is already gone.
 */
export declare const waitForOperation: (operation: looker.Operation, options?: {
    notFoundOk?: boolean;
}) => Effect.Effect<import("../Operation.js").LongRunningOperation | looker.Operation, import("../Operation.js").OperationFailed | import("../Operation.js").OperationTimedOut | looker.GetProjectsLocationsOperationsError, looker.GcpOpContext>;
