import * as Schema from "effect/Schema";
import { ApproveTransfer } from "./ApproveTransfer.command.js";
import { CompleteTransfer } from "./CompleteTransfer.command.js";
import { ExpireTransfer } from "./ExpireTransfer.command.js";
import { FailTransfer } from "./FailTransfer.command.vibe";
import { RequestTransfer } from "./RequestTransfer.command.vibe";
declare const Transfer_base: import("@alchemy.run/domain/Aggregate").AggregateClass<"Transfer", import("@alchemy.run/domain/Aggregate").Resolved<Schema.brand<Schema.String, "TransferId">, Schema.Union<readonly [Schema.TaggedStruct<"New", {}>, Schema.TaggedStruct<"AwaitingApproval", {
    from: Schema.brand<Schema.String, "AccountId">;
    to: Schema.brand<Schema.String, "AccountId">;
    amount: Schema.Int;
    requestedBy: Schema.Union<readonly [Schema.TaggedStruct<"Customer", {
        readonly customerId: Schema.brand<Schema.String, "CustomerId">;
    }>, Schema.TaggedStruct<"Agent", {
        readonly agentId: Schema.String;
    }>, Schema.TaggedStruct<"System", {
        readonly name: Schema.String;
    }>]>;
}>, Schema.TaggedStruct<"Pending", {
    from: Schema.brand<Schema.String, "AccountId">;
    to: Schema.brand<Schema.String, "AccountId">;
    amount: Schema.Int;
    requestedBy: Schema.Union<readonly [Schema.TaggedStruct<"Customer", {
        readonly customerId: Schema.brand<Schema.String, "CustomerId">;
    }>, Schema.TaggedStruct<"Agent", {
        readonly agentId: Schema.String;
    }>, Schema.TaggedStruct<"System", {
        readonly name: Schema.String;
    }>]>;
}>, Schema.TaggedStruct<"Completed", {}>, Schema.TaggedStruct<"Failed", {
    readonly reason: Schema.String;
}>]>, readonly [typeof RequestTransfer, typeof ApproveTransfer, typeof ExpireTransfer, typeof CompleteTransfer, typeof FailTransfer], readonly [], readonly []>>;
/**
 * A transfer between two accounts: the state of the TransferExecution
 * process. Large transfers wait for approval until their window closes;
 * approval and expiry race on this single instance, so one of them wins.
 */
export declare class Transfer extends Transfer_base {
}
export {};
