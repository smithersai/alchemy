import * as Schema from "effect/Schema";
import { Session } from "../Session.middleware.js";
import { ChangeOwner } from "./ChangeOwner.command.js";
import { CloseAccount } from "./CloseAccount.command.js";
import { CreditTransfer } from "./CreditTransfer.command.js";
import { DebitTransfer } from "./DebitTransfer.command.js";
import { DepositMoney } from "./DepositMoney.command.js";
import { FreezeAccount } from "./FreezeAccount.command.vibe";
import { NotOwner } from "./NotOwner.rejection.js";
import { OpenAccount } from "./OpenAccount.command.vibe";
import { RecordSettlement } from "./RecordSettlement.command.vibe";
import { RefundTransfer } from "./RefundTransfer.command.js";
import { WithdrawMoney } from "./WithdrawMoney.command.js";
declare const Account_base: import("@alchemy.run/domain/Aggregate").AggregateClass<"Account", import("@alchemy.run/domain/Aggregate").Resolved<Schema.brand<Schema.String, "AccountId">, Schema.Union<readonly [Schema.TaggedStruct<"Unopened", {}>, Schema.TaggedStruct<"Open", {
    readonly customerId: Schema.brand<Schema.String, "CustomerId">;
    readonly owner: Schema.String;
    readonly balance: Schema.Int;
    readonly frozen: Schema.NullOr<Schema.String>;
    readonly today: Schema.Struct<{
        readonly day: Schema.String;
        readonly withdrawn: Schema.Int;
    }>;
}>, Schema.TaggedStruct<"Closed", {}>]>, readonly [typeof OpenAccount, typeof ChangeOwner, typeof DepositMoney, typeof WithdrawMoney, typeof FreezeAccount, typeof CloseAccount, typeof DebitTransfer, typeof CreditTransfer, typeof RefundTransfer, typeof RecordSettlement], readonly [typeof Session], readonly [typeof NotOwner]>>;
/**
 * A bank account. Each command lives in its own file with the events it
 * records and the rejections only it returns; this file holds the state and
 * how commands and events change it. Commands sent by customers and agents
 * read the current actor from their middleware to authorize it.
 */
export declare class Account extends Account_base {
}
export {};
