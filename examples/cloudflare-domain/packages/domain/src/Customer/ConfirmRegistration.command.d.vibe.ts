import * as Schema from "effect/Schema";
declare const CustomerRegistered_base: import("@alchemy.run/domain/Event").EventClass<"CustomerRegistered", {
    readonly name: Schema.String;
    readonly username: Schema.brand<Schema.String, "Username">;
}>;
export declare class CustomerRegistered extends CustomerRegistered_base {
}
declare const ConfirmRegistration_base: import("@alchemy.run/domain/Command").CommandClass<"ConfirmRegistration", Schema.brand<Schema.String, "CustomerId">, {}, readonly [typeof CustomerRegistered], readonly [], undefined, readonly [], import("@alchemy.run/domain/Command").CommandRpc<"ConfirmRegistration", Schema.brand<Schema.String, "CustomerId">, {}, readonly [], undefined>>;
/** The username was claimed. Reports an outcome, so it never rejects. */
export declare class ConfirmRegistration extends ConfirmRegistration_base {
}
export {};
