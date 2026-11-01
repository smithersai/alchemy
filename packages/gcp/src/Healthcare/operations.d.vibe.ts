import * as healthcare from "@distilled.cloud/gcp/healthcare_v1";
import * as Effect from "effect/Effect";
/** Wait for an operation through the shared GCP waiter. */
export declare const waitForOperation: (operation: healthcare.Operation, options?: {
    notFoundOk?: boolean;
    alreadyExistsOk?: boolean;
}) => Effect.Effect<healthcare.Operation, healthcare.Forbidden | healthcare.NotFound | import("../Operation.js").OperationFailed | import("../Operation.js").OperationTimedOut | healthcare.GcpOpError, healthcare.GcpOpContext>;
