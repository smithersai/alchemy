import * as Schema from "effect/Schema";
declare const FraudCheck_base: import("@alchemy.run/domain/ExternalSystem").ExternalSystemClass<"FraudCheck", {
    readonly score: {
        args: {
            accountId: Schema.brand<Schema.String, "AccountId">;
            amount: Schema.Int;
        };
        success: {
            risk: Schema.Number;
        };
    };
}>;
/** The external fraud-scoring system. */
export declare class FraudCheck extends FraudCheck_base {
}
export {};
