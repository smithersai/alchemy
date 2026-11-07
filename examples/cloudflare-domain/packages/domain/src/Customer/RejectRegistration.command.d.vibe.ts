import * as Schema from "effect/Schema";
declare const RegistrationRejected_base: import("@alchemy.run/domain/Event").EventClass<"RegistrationRejected", {
    readonly username: Schema.brand<Schema.String, "Username">;
    readonly reason: Schema.String;
}>;
/** The registration failed; the customer may register again. */
export declare class RegistrationRejected extends RegistrationRejected_base {
}
declare const RejectRegistration_base: import("@alchemy.run/domain/Command").CommandClass<"RejectRegistration", Schema.brand<Schema.String, "CustomerId">, {
    readonly reason: Schema.String;
}, readonly [typeof RegistrationRejected], readonly [], undefined, readonly [], import("@alchemy.run/domain/Command").CommandRpc<"RejectRegistration", Schema.brand<Schema.String, "CustomerId">, {
    readonly reason: Schema.String;
}, readonly [], undefined>>;
/** The username could not be claimed. Reports an outcome, so it never rejects. */
export declare class RejectRegistration extends RejectRegistration_base {
}
export {};
