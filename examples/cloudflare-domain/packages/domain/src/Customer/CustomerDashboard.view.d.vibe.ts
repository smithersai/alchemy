import * as Schema from "effect/Schema";
import { AccountSummary } from "../Account/AccountSummary.view.vibe";
import { Forbidden } from "../Forbidden.rejection.vibe";
import { Session } from "../Session.middleware.ts";
import { Customer } from "./Customer.aggregate.vibe";
declare const CustomerDashboard_base: import("@alchemy.run/domain/View").ViewClass<"CustomerDashboard", import("@alchemy.run/domain/View").Definition<readonly [typeof Customer, typeof AccountSummary], typeof Customer, Schema.Struct<{
    readonly name: Schema.NullOr<Schema.String>;
    readonly balances: Schema.$Record<Schema.brand<Schema.String, "AccountId">, Schema.Int>;
}>, readonly [], {
    totalBalance: number;
}, readonly [typeof Session], readonly [typeof Forbidden]>, Schema.Struct<{
    readonly name: Schema.NullOr<Schema.String>;
    readonly balances: Schema.$Record<Schema.brand<Schema.String, "AccountId">, Schema.Int>;
}>, {
    readonly name: string | null;
    readonly balances: {
        readonly [x: string & import("effect/Brand").Brand<"AccountId">]: number;
    };
}, typeof Customer, import("@alchemy.run/domain/View").ComputedFns<{
    readonly name: string | null;
    readonly balances: {
        readonly [x: string & import("effect/Brand").Brand<"AccountId">]: number;
    };
}, {
    totalBalance: number;
}>, import("../Account/CloseAccount.command.ts").AccountClosed | import("../Account/FreezeAccount.command.vibe").AccountFrozen | import("../Account/OpenAccount.command.vibe").AccountOpened | import("./ConfirmRegistration.command.vibe").CustomerRegistered | import("../Account/DepositMoney.command.ts").MoneyDeposited | import("../Account/WithdrawMoney.command.ts").MoneyWithdrawn | import("../Account/ChangeOwner.command.ts").OwnerChanged | import("../Account/RefundTransfer.command.ts").RefundStranded | import("./RejectRegistration.command.vibe").RegistrationRejected | import("./RegisterCustomer.command.vibe").RegistrationRequested | import("../Account/RecordSettlement.command.vibe").SettlementOnClosedAccount | import("../Account/RecordSettlement.command.vibe").SettlementReceived | import("../Account/CreditTransfer.command.ts").TransferCredited | import("../Account/DebitTransfer.command.ts").TransferDebited | import("../Account/RefundTransfer.command.ts").TransferRefunded>;
/**
 * A customer's accounts and balances, built from AccountSummary's events and
 * the summary after each. An ownership change moves the account between
 * dashboards.
 */
export declare class CustomerDashboard extends CustomerDashboard_base {
}
export {};
