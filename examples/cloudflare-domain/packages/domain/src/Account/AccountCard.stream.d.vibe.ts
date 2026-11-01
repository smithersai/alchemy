import * as Schema from "effect/Schema";
import { Session } from "../Session.middleware.js";
import { Account } from "./Account.aggregate.vibe";
import { NotOwner } from "./NotOwner.rejection.js";
declare const CardChanged_base: import("@alchemy.run/domain/Event").EventClass<"CardChanged", {
    readonly customerId: Schema.brand<Schema.String, "CustomerId">;
    readonly owner: Schema.String;
    readonly balance: Schema.Int;
    readonly frozen: Schema.Boolean;
}>;
/** What an account's card shows, as of one change. */
export declare class CardChanged extends CardChanged_base {
}
declare const AccountCard_base: import("@alchemy.run/domain/Stream").StreamClass<"AccountCard", import("@alchemy.run/domain/Stream").Definition<typeof Account, readonly [typeof CardChanged], readonly [typeof Session], readonly [typeof NotOwner]>, typeof Account, CardChanged>;
/**
 * Every version of an account's card, in order. The latest entry is the card
 * now (`peek`, `watch`); the log is its history (`events`, `list`). Written by
 * the AccountCards projection.
 */
export declare class AccountCard extends AccountCard_base {
}
export {};
