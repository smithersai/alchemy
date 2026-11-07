import { DurableDeferred } from "effect/workflow";
import * as Schema from "effect/Schema";
import { Frozen } from "../Account/Frozen.rejection.vibe";
import { InsufficientFunds } from "../Account/InsufficientFunds.rejection.ts";
import { NotOpen } from "../Account/NotOpen.rejection.ts";
import { NotOwner } from "../Account/NotOwner.rejection.ts";
declare const DestinationClosed_base: import("@alchemy.run/domain/Rejection").RejectionClass<"DestinationClosed", {}>;
/** The destination account isn't open, so the money can't arrive. */
export declare class DestinationClosed extends DestinationClosed_base {
}
/**
 * What the Transfer decided about a large transfer: an agent approved it, or
 * its approval window closed first.
 */
export declare const Decision: DurableDeferred.DurableDeferred<Schema.Literals<readonly ["approved", "expired"]>, Schema.Never>;
declare const ExecuteTransfer_base: import("@alchemy.run/domain/Saga").SagaClass<"ExecuteTransfer", Schema.brand<Schema.String, "TransferId">, {
    readonly from: Schema.brand<Schema.String, "AccountId">;
    readonly to: Schema.brand<Schema.String, "AccountId">;
    readonly amount: Schema.Int;
    readonly requestedBy: Schema.Union<readonly [Schema.TaggedStruct<"Customer", {
        readonly customerId: Schema.brand<Schema.String, "CustomerId">;
    }>, Schema.TaggedStruct<"Agent", {
        readonly agentId: Schema.String;
    }>, Schema.TaggedStruct<"System", {
        readonly name: Schema.String;
    }>]>;
    readonly needsApproval: Schema.Boolean;
}, undefined, readonly [typeof NotOpen, typeof NotOwner, typeof Frozen, typeof InsufficientFunds, typeof DestinationClosed]>;
/**
 * Moves money between two accounts on behalf of the requester: waits for the
 * Transfer to decide a large transfer, debits the source, credits the
 * destination, and refunds the debit if the credit fails. The outcome is
 * recorded on the Transfer either way.
 */
export declare class ExecuteTransfer extends ExecuteTransfer_base {
}
export declare const ExecuteTransferLive: import("effect/Layer").Layer<import("@alchemy.run/domain/Saga").ImplementationKey<"ExecuteTransfer">, never, import("@alchemy.run/domain/Aggregate").Key<"Account"> | import("@alchemy.run/domain/Aggregate").Key<"Transfer"> | import("effect/workflow/WorkflowEngine").WorkflowEngine>;
export {};
