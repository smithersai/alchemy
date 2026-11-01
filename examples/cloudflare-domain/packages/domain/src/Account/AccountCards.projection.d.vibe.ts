import { Account } from "./Account.aggregate.vibe";
import { AccountCard } from "./AccountCard.stream.vibe";
import { AccountSummary } from "./AccountSummary.view.vibe";
import { TransferCredited } from "./CreditTransfer.command.js";
import { TransferDebited } from "./DebitTransfer.command.js";
import { MoneyDeposited } from "./DepositMoney.command.js";
import { AccountFrozen } from "./FreezeAccount.command.vibe";
import { SettlementReceived } from "./RecordSettlement.command.vibe";
import { TransferRefunded } from "./RefundTransfer.command.js";
import { MoneyWithdrawn } from "./WithdrawMoney.command.js";
declare const AccountCards_base: import("@alchemy.run/domain/Projection").ProjectionClass<"AccountCards", readonly [typeof AccountSummary], typeof Account, readonly [typeof MoneyDeposited, typeof MoneyWithdrawn, typeof TransferDebited, typeof TransferCredited, typeof TransferRefunded, typeof SettlementReceived, typeof AccountFrozen], readonly [typeof AccountCard]>;
/**
 * Appends a new card whenever an account's summary changes: each input
 * arrives with the summary's state after it.
 */
export declare class AccountCards extends AccountCards_base {
}
export declare const AccountCardsLive: import("effect/Layer").Layer<import("@alchemy.run/domain/Projection").ProjectionKey<"AccountCards">, never, import("@alchemy.run/domain/Stream").StreamKey<"AccountCard">>;
export {};
