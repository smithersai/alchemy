import * as Schema from "effect/Schema";
import { Session } from "../Session.middleware.ts";
import { Account } from "./Account.aggregate.vibe";
import { NotOwner } from "./NotOwner.rejection.ts";
declare const StatementLine_base: import("@alchemy.run/domain/Event").EventClass<"StatementLine", {
    readonly kind: Schema.Literals<readonly ["deposit", "withdrawal", "transfer-in", "transfer-out", "refund", "settlement"]>;
    readonly amount: Schema.Int;
    readonly balance: Schema.Int;
}>;
/** One movement of money on an account. */
export declare class StatementLine extends StatementLine_base {
}
declare const Statement_base: import("@alchemy.run/domain/View").ViewClass<"Statement", import("@alchemy.run/domain/View").Definition<readonly [typeof Account], typeof Account, Schema.Struct<{
    readonly customerId: Schema.NullOr<Schema.brand<Schema.String, "CustomerId">>;
}>, readonly [typeof StatementLine], {}, readonly [typeof Session], readonly [typeof NotOwner]>, Schema.Struct<{
    readonly customerId: Schema.NullOr<Schema.brand<Schema.String, "CustomerId">>;
}>, {
    readonly customerId: (string & import("effect/Brand").Brand<"CustomerId">) | null;
}, typeof Account, import("@alchemy.run/domain/View").ComputedFns<{
    readonly customerId: (string & import("effect/Brand").Brand<"CustomerId">) | null;
}, {}>, StatementLine>;
/**
 * Every movement of money on an account, oldest first: six events become
 * one. It keeps the account's owner so it can authorize reads.
 */
export declare class Statement extends Statement_base {
}
export {};
