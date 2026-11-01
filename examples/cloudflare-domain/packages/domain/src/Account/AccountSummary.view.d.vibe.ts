import * as Schema from "effect/Schema";
import { Session } from "../Session.middleware.js";
import { Account } from "./Account.aggregate.vibe";
import { NotOwner } from "./NotOwner.rejection.js";
declare const AccountSummary_base: import("@alchemy.run/domain/View").ViewClass<"AccountSummary", import("@alchemy.run/domain/View").Definition<readonly [typeof Account], typeof Account, Schema.Struct<{
    readonly customerId: Schema.NullOr<Schema.brand<Schema.String, "CustomerId">>;
    readonly owner: Schema.NullOr<Schema.String>;
    readonly balance: Schema.Int;
    readonly frozen: Schema.Boolean;
    readonly closed: Schema.Boolean;
}>, readonly [], {}, readonly [typeof Session], readonly [typeof NotOwner]>, Schema.Struct<{
    readonly customerId: Schema.NullOr<Schema.brand<Schema.String, "CustomerId">>;
    readonly owner: Schema.NullOr<Schema.String>;
    readonly balance: Schema.Int;
    readonly frozen: Schema.Boolean;
    readonly closed: Schema.Boolean;
}>, {
    readonly customerId: (string & import("effect/Brand").Brand<"CustomerId">) | null;
    readonly owner: string | null;
    readonly balance: number;
    readonly frozen: boolean;
    readonly closed: boolean;
}, typeof Account, import("@alchemy.run/domain/View").ComputedFns<{
    readonly customerId: (string & import("effect/Brand").Brand<"CustomerId">) | null;
    readonly owner: string | null;
    readonly balance: number;
    readonly frozen: boolean;
    readonly closed: boolean;
}, {}>, import("./CloseAccount.command.js").AccountClosed | import("./FreezeAccount.command.vibe").AccountFrozen | import("./OpenAccount.command.vibe").AccountOpened | import("./DepositMoney.command.js").MoneyDeposited | import("./WithdrawMoney.command.js").MoneyWithdrawn | import("./ChangeOwner.command.js").OwnerChanged | import("./RefundTransfer.command.js").RefundStranded | import("./RecordSettlement.command.vibe").SettlementOnClosedAccount | import("./RecordSettlement.command.vibe").SettlementReceived | import("./CreditTransfer.command.js").TransferCredited | import("./DebitTransfer.command.js").TransferDebited | import("./RefundTransfer.command.js").TransferRefunded>;
/**
 * The current balance and status of one account. It declares no events, so
 * it emits every event it applies, each with the summary after it.
 */
export declare class AccountSummary extends AccountSummary_base {
}
export {};
