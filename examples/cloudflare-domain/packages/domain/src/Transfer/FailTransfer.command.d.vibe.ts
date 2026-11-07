import * as Schema from "effect/Schema";
declare const TransferFailed_base: import("@alchemy.run/domain/Event").EventClass<"TransferFailed", {
    readonly transferId: Schema.brand<Schema.String, "TransferId">;
    readonly reason: Schema.String;
}>;
export declare class TransferFailed extends TransferFailed_base {
}
declare const FailTransfer_base: import("@alchemy.run/domain/Command").CommandClass<"FailTransfer", Schema.brand<Schema.String, "TransferId">, {
    readonly reason: Schema.String;
}, readonly [typeof TransferFailed], readonly [], undefined, readonly [], import("@alchemy.run/domain/Command").CommandRpc<"FailTransfer", Schema.brand<Schema.String, "TransferId">, {
    readonly reason: Schema.String;
}, readonly [], undefined>>;
/** Reports an outcome, so it never rejects. */
export declare class FailTransfer extends FailTransfer_base {
}
export {};
