import * as Schema from "effect/Schema";
import { MfaChallenge } from "../MfaChallenge.middleware.js";
import { Session } from "../Session.middleware.js";
/** Transfers of at least this many cents wait for a support agent's approval. */
export declare const APPROVAL_THRESHOLD = 10000;
declare const AlreadyRequested_base: import("@alchemy.run/domain/Rejection").RejectionClass<"AlreadyRequested", {}>;
export declare class AlreadyRequested extends AlreadyRequested_base {
}
declare const SameAccount_base: import("@alchemy.run/domain/Rejection").RejectionClass<"SameAccount", {}>;
export declare class SameAccount extends SameAccount_base {
}
declare const TransferRequested_base: import("@alchemy.run/domain/Event").EventClass<"TransferRequested", {
    readonly transferId: Schema.brand<Schema.String, "TransferId">;
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
    /** At or above {@link APPROVAL_THRESHOLD}: execution waits for `ApproveTransfer`. */
    readonly needsApproval: Schema.Boolean;
}>;
export declare class TransferRequested extends TransferRequested_base {
}
declare const RequestTransfer_base: import("@alchemy.run/domain/Command").CommandClass<"RequestTransfer", Schema.brand<Schema.String, "TransferId">, {
    readonly from: Schema.brand<Schema.String, "AccountId">;
    readonly to: Schema.brand<Schema.String, "AccountId">;
    readonly amount: Schema.Int;
}, readonly [typeof TransferRequested], readonly [typeof AlreadyRequested, typeof SameAccount], undefined, readonly [typeof Session, typeof MfaChallenge], import("effect/rpc/Rpc").Rpc<"RequestTransfer", Schema.Struct<import("@alchemy.run/domain/Command").PayloadFields<Schema.brand<Schema.String, "TransferId">, {
    readonly from: Schema.brand<Schema.String, "AccountId">;
    readonly to: Schema.brand<Schema.String, "AccountId">;
    readonly amount: Schema.Int;
}>>, Schema.Struct<import("@alchemy.run/domain/Command").SuccessFields<undefined>>, Schema.Union<readonly [typeof AlreadyRequested, typeof SameAccount]>, typeof Session | typeof MfaChallenge, never>>;
/**
 * Ask to move money between two accounts; `TransferExecution` carries it out
 * on behalf of the requester, after a support agent approves it if it is
 * large. The client picks the transfer id, so a retry is idempotent.
 */
export declare class RequestTransfer extends RequestTransfer_base {
}
export {};
