import * as Schema from "effect/Schema";
import { Session } from "../Session.middleware.ts";
import { NotOpen } from "./NotOpen.rejection.ts";
import { NotOwner } from "./NotOwner.rejection.ts";
declare const AccountFrozen_base: import("@alchemy.run/domain/Event").EventClass<"AccountFrozen", {
    readonly reason: Schema.String;
    readonly by: Schema.Union<readonly [Schema.TaggedStruct<"Customer", {
        readonly customerId: Schema.brand<Schema.String, "CustomerId">;
    }>, Schema.TaggedStruct<"Agent", {
        readonly agentId: Schema.String;
    }>, Schema.TaggedStruct<"System", {
        readonly name: Schema.String;
    }>]>;
}>;
export declare class AccountFrozen extends AccountFrozen_base {
}
declare const FreezeAccount_base: import("@alchemy.run/domain/Command").CommandClass<"FreezeAccount", Schema.brand<Schema.String, "AccountId">, {
    readonly reason: Schema.String;
}, readonly [typeof AccountFrozen], readonly [typeof NotOpen, typeof NotOwner], undefined, readonly [typeof Session], import("effect/rpc/Rpc").Rpc<"FreezeAccount", Schema.Struct<import("@alchemy.run/domain/Command").PayloadFields<Schema.brand<Schema.String, "AccountId">, {
    readonly reason: Schema.String;
}>>, Schema.Struct<import("@alchemy.run/domain/Command").SuccessFields<undefined>>, Schema.Union<readonly [typeof NotOpen, typeof NotOwner]>, typeof Session, never>>;
/** Stop money leaving an account. Freezing a frozen account records nothing. */
export declare class FreezeAccount extends FreezeAccount_base {
}
export {};
