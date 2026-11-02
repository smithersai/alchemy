import { Account } from "../Account/Account.aggregate.vibe";
import { TransferCredited } from "../Account/CreditTransfer.command.ts";
import { TransferDebited } from "../Account/DebitTransfer.command.ts";
import { MoneyDeposited } from "../Account/DepositMoney.command.ts";
import { SettlementReceived } from "../Account/RecordSettlement.command.vibe";
import { TransferRefunded } from "../Account/RefundTransfer.command.ts";
import { MoneyWithdrawn } from "../Account/WithdrawMoney.command.ts";
import { LedgerStore } from "./LedgerStore.ts";
declare const Ledger_base: import("@alchemy.run/domain/Projection").ProjectionClass<"Ledger", readonly [typeof Account], typeof Account, readonly [typeof MoneyDeposited, typeof MoneyWithdrawn, typeof TransferDebited, typeof TransferCredited, typeof TransferRefunded, typeof SettlementReceived], readonly []>;
/** Every money movement, one row each, in a database outside the model. */
export declare class Ledger extends Ledger_base {
}
/** Writes each batch of an account's movements in one database round-trip. */
export declare const LedgerLive: import("effect/Layer").Layer<import("@alchemy.run/domain/Projection").ProjectionKey<"Ledger">, never, LedgerStore>;
export {};
