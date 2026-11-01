import * as Schema from "effect/Schema";
declare const Payments_base: import("@alchemy.run/domain/ExternalSystem").ExternalSystemClass<"Payments", {
    readonly refund: {
        args: {
            settlementId: Schema.String;
            amount: Schema.Int;
        };
        success: {
            refundId: Schema.String;
        };
    };
}>;
/** The external payment processor. */
export declare class Payments extends Payments_base {
}
export {};
