import { Account } from "../Account/Account.aggregate.vibe";
import { SettlementOnClosedAccount } from "../Account/RecordSettlement.command.vibe";
declare const SettlementRefund_base: import("@alchemy.run/domain/Policy").PolicyClass<"SettlementRefund", typeof Account, readonly [typeof SettlementOnClosedAccount], typeof Account>;
/** Whenever money settles on a closed account, refund it. */
export declare class SettlementRefund extends SettlementRefund_base {
}
export declare const SettlementRefundLive: import("effect/Layer").Layer<import("@alchemy.run/domain/Policy").PolicyKey<"SettlementRefund">, never, import("@alchemy.run/domain/ExternalSystem").ExternalSystemKey<"Payments">>;
export {};
