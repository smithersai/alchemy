import * as Schema from "effect/Schema";
import { Account } from "../Account/Account.aggregate.vibe";
import { NotOwner } from "../Account/NotOwner.rejection.js";
import { Session } from "../Session.middleware.js";
import { Transfer } from "./Transfer.aggregate.vibe";
declare const TransferStatus_base: import("@alchemy.run/domain/View").ViewClass<"TransferStatus", import("@alchemy.run/domain/View").Definition<readonly [typeof Transfer, typeof Account], typeof Transfer, Schema.Struct<{
    readonly from: Schema.NullOr<Schema.brand<Schema.String, "AccountId">>;
    readonly to: Schema.NullOr<Schema.brand<Schema.String, "AccountId">>;
    readonly amount: Schema.NullOr<Schema.Int>;
    readonly requestedBy: Schema.NullOr<Schema.Union<readonly [Schema.TaggedStruct<"Customer", {
        readonly customerId: Schema.brand<Schema.String, "CustomerId">;
    }>, Schema.TaggedStruct<"Agent", {
        readonly agentId: Schema.String;
    }>, Schema.TaggedStruct<"System", {
        readonly name: Schema.String;
    }>]>>;
    readonly awaitingApproval: Schema.Boolean;
    readonly debited: Schema.Boolean;
    readonly credited: Schema.Boolean;
    readonly refunded: Schema.Boolean;
    readonly completedAt: Schema.NullOr<Schema.DateTimeUtc>;
    readonly failedReason: Schema.NullOr<Schema.String>;
}>, readonly [], {
    status: "awaiting-approval" | "completed" | "failed" | "in-flight" | "pending";
}, readonly [typeof Session], readonly [typeof NotOwner]>, Schema.Struct<{
    readonly from: Schema.NullOr<Schema.brand<Schema.String, "AccountId">>;
    readonly to: Schema.NullOr<Schema.brand<Schema.String, "AccountId">>;
    readonly amount: Schema.NullOr<Schema.Int>;
    readonly requestedBy: Schema.NullOr<Schema.Union<readonly [Schema.TaggedStruct<"Customer", {
        readonly customerId: Schema.brand<Schema.String, "CustomerId">;
    }>, Schema.TaggedStruct<"Agent", {
        readonly agentId: Schema.String;
    }>, Schema.TaggedStruct<"System", {
        readonly name: Schema.String;
    }>]>>;
    readonly awaitingApproval: Schema.Boolean;
    readonly debited: Schema.Boolean;
    readonly credited: Schema.Boolean;
    readonly refunded: Schema.Boolean;
    readonly completedAt: Schema.NullOr<Schema.DateTimeUtc>;
    readonly failedReason: Schema.NullOr<Schema.String>;
}>, {
    readonly from: (string & import("effect/Brand").Brand<"AccountId">) | null;
    readonly to: (string & import("effect/Brand").Brand<"AccountId">) | null;
    readonly amount: number | null;
    readonly requestedBy: {
        readonly _tag: "Agent";
        readonly agentId: string;
    } | {
        readonly _tag: "Customer";
        readonly customerId: string & import("effect/Brand").Brand<"CustomerId">;
    } | {
        readonly _tag: "System";
        readonly name: string;
    } | null;
    readonly awaitingApproval: boolean;
    readonly debited: boolean;
    readonly credited: boolean;
    readonly refunded: boolean;
    readonly completedAt: import("effect/DateTime").Utc | null;
    readonly failedReason: string | null;
}, typeof Transfer, import("@alchemy.run/domain/View").ComputedFns<{
    readonly from: (string & import("effect/Brand").Brand<"AccountId">) | null;
    readonly to: (string & import("effect/Brand").Brand<"AccountId">) | null;
    readonly amount: number | null;
    readonly requestedBy: {
        readonly _tag: "Agent";
        readonly agentId: string;
    } | {
        readonly _tag: "Customer";
        readonly customerId: string & import("effect/Brand").Brand<"CustomerId">;
    } | {
        readonly _tag: "System";
        readonly name: string;
    } | null;
    readonly awaitingApproval: boolean;
    readonly debited: boolean;
    readonly credited: boolean;
    readonly refunded: boolean;
    readonly completedAt: import("effect/DateTime").Utc | null;
    readonly failedReason: string | null;
}, {
    status: "awaiting-approval" | "completed" | "failed" | "in-flight" | "pending";
}>, import("../Account/CloseAccount.command.js").AccountClosed | import("../Account/FreezeAccount.command.vibe").AccountFrozen | import("../Account/OpenAccount.command.vibe").AccountOpened | import("../Account/DepositMoney.command.js").MoneyDeposited | import("../Account/WithdrawMoney.command.js").MoneyWithdrawn | import("../Account/ChangeOwner.command.js").OwnerChanged | import("../Account/RefundTransfer.command.js").RefundStranded | import("../Account/RecordSettlement.command.vibe").SettlementOnClosedAccount | import("../Account/RecordSettlement.command.vibe").SettlementReceived | import("./ApproveTransfer.command.js").TransferApproved | import("./CompleteTransfer.command.js").TransferCompleted | import("../Account/CreditTransfer.command.js").TransferCredited | import("../Account/DebitTransfer.command.js").TransferDebited | import("./FailTransfer.command.vibe").TransferFailed | import("../Account/RefundTransfer.command.js").TransferRefunded | import("./RequestTransfer.command.vibe").TransferRequested>;
/**
 * The progress of one transfer, assembled from the Transfer and both
 * accounts. Each handler sets its own fact, so arrival order does not matter.
 * Its requester (or an agent) may read it; a recipient sees the transfer in
 * `AccountTransfers`.
 */
export declare class TransferStatus extends TransferStatus_base {
}
export {};
