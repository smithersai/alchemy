import * as Schema from "effect/Schema";
import { Account } from "../Account/Account.aggregate.vibe";
import { NotOwner } from "../Account/NotOwner.rejection.ts";
import { Session } from "../Session.middleware.ts";
import { Transfer } from "./Transfer.aggregate.vibe";
declare const TransferMoved_base: import("@alchemy.run/domain/Event").EventClass<"TransferMoved", {
    readonly transferId: Schema.brand<Schema.String, "TransferId">;
    readonly amount: Schema.Int;
    readonly direction: Schema.Literals<readonly ["in", "out"]>;
}>;
/** Money moved in or out of an account by a transfer. */
export declare class TransferMoved extends TransferMoved_base {
}
declare const AccountTransfers_base: import("@alchemy.run/domain/View").ViewClass<"AccountTransfers", import("@alchemy.run/domain/View").Definition<readonly [typeof Transfer, typeof Account], typeof Account, Schema.Struct<{
    readonly customerId: Schema.NullOr<Schema.brand<Schema.String, "CustomerId">>;
}>, readonly [typeof TransferMoved], {}, readonly [typeof Session], readonly [typeof NotOwner]>, Schema.Struct<{
    readonly customerId: Schema.NullOr<Schema.brand<Schema.String, "CustomerId">>;
}>, {
    readonly customerId: (string & import("effect/Brand").Brand<"CustomerId">) | null;
}, typeof Account, import("@alchemy.run/domain/View").ComputedFns<{
    readonly customerId: (string & import("effect/Brand").Brand<"CustomerId">) | null;
}, {}>, TransferMoved>;
/**
 * Transfers touching an account. One request is routed to both accounts, so
 * the recipient sees incoming transfers here. It keeps the account's owner so
 * it can authorize reads.
 */
export declare class AccountTransfers extends AccountTransfers_base {
}
export {};
