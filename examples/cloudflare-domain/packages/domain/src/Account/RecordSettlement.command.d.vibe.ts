import * as Schema from "effect/Schema";
declare const SettlementReceived_base: import("@alchemy.run/domain/Event").EventClass<"SettlementReceived", {
    readonly settlementId: Schema.String;
    readonly amount: Schema.Int;
    readonly balanceAfter: Schema.Int;
}>;
export declare class SettlementReceived extends SettlementReceived_base {
}
declare const SettlementOnClosedAccount_base: import("@alchemy.run/domain/Event").EventClass<"SettlementOnClosedAccount", {
    readonly settlementId: Schema.String;
    readonly amount: Schema.Int;
}>;
/** Money settled on an account that is no longer open; `SettlementRefund` returns it. */
export declare class SettlementOnClosedAccount extends SettlementOnClosedAccount_base {
}
declare const RecordSettlement_base: import("@alchemy.run/domain/Command").CommandClass<"RecordSettlement", Schema.brand<Schema.String, "AccountId">, {
    readonly settlementId: Schema.String;
    readonly amount: Schema.Int;
}, readonly [typeof SettlementReceived, typeof SettlementOnClosedAccount], readonly [], undefined, readonly [], import("@alchemy.run/domain/Command").CommandRpc<"RecordSettlement", Schema.brand<Schema.String, "AccountId">, {
    readonly settlementId: Schema.String;
    readonly amount: Schema.Int;
}, readonly [], undefined>>;
/** Reports a fact that already happened, so it never rejects. */
export declare class RecordSettlement extends RecordSettlement_base {
}
export {};
