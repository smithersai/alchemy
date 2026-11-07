import { Forbidden } from "../Forbidden.rejection.vibe";
import { Session } from "../Session.middleware.ts";
import { Account } from "./Account.aggregate.vibe";
import { OwnerChanged } from "./ChangeOwner.command.ts";
import { AccountClosed } from "./CloseAccount.command.ts";
import { AccountFrozen } from "./FreezeAccount.command.vibe";
import { SettlementOnClosedAccount } from "./RecordSettlement.command.vibe";
import { RefundStranded } from "./RefundTransfer.command.ts";
declare const AccountActivity_base: import("@alchemy.run/domain/View").ViewClass<"AccountActivity", import("@alchemy.run/domain/View").Definition<readonly [typeof Account], typeof Account, undefined, readonly [typeof AccountFrozen, typeof AccountClosed, typeof OwnerChanged, typeof RefundStranded, typeof SettlementOnClosedAccount], {}, readonly [typeof Session], readonly [typeof Forbidden]>, undefined, null, typeof Account, import("@alchemy.run/domain/View").ComputedFns<null, {}>, AccountClosed | AccountFrozen | OwnerChanged | RefundStranded | SettlementOnClosedAccount>;
/** Operational events for support tooling, passed through unchanged. Agents only. */
export declare class AccountActivity extends AccountActivity_base {
}
export {};
