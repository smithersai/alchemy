import * as Schema from "effect/Schema";
import { ClaimUsername } from "./ClaimUsername.command.js";
declare const UsernameClaim_base: import("@alchemy.run/domain/Aggregate").AggregateClass<"UsernameClaim", import("@alchemy.run/domain/Aggregate").Resolved<Schema.brand<Schema.String, "Username">, Schema.Union<readonly [Schema.TaggedStruct<"Free", {}>, Schema.TaggedStruct<"Claimed", {
    readonly customerId: Schema.brand<Schema.String, "CustomerId">;
}>]>, readonly [typeof ClaimUsername], readonly [], readonly []>>;
/**
 * One username, and who holds it. Uniqueness spans every customer, so the
 * invariant is its own aggregate, keyed by the username: two customers
 * claiming the same name race on this one instance, and one of them wins.
 */
export declare class UsernameClaim extends UsernameClaim_base {
}
export {};
