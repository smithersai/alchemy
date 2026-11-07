import * as Schema from "effect/Schema";
declare const AlreadyOpen_base: import("@alchemy.run/domain/Rejection").RejectionClass<"AlreadyOpen", {}>;
export declare class AlreadyOpen extends AlreadyOpen_base {
}
declare const AccountOpened_base: import("@alchemy.run/domain/Event").EventClass<"AccountOpened", {
    readonly customerId: Schema.brand<Schema.String, "CustomerId">;
    readonly owner: Schema.String;
}>;
export declare class AccountOpened extends AccountOpened_base {
}
declare const OpenAccount_base: import("@alchemy.run/domain/Command").CommandClass<"OpenAccount", Schema.brand<Schema.String, "AccountId">, {
    readonly customerId: Schema.brand<Schema.String, "CustomerId">;
    readonly owner: Schema.String;
}, readonly [typeof AccountOpened], readonly [typeof AlreadyOpen], undefined, readonly [], import("@alchemy.run/domain/Command").CommandRpc<"OpenAccount", Schema.brand<Schema.String, "AccountId">, {
    readonly customerId: Schema.brand<Schema.String, "CustomerId">;
    readonly owner: Schema.String;
}, readonly [typeof AlreadyOpen], undefined>>;
/** Open an account for a customer. Sent by `MainAccountProvisioning`. */
export declare class OpenAccount extends OpenAccount_base {
}
export {};
