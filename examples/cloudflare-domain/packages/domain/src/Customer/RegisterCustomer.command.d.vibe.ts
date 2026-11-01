import * as Schema from "effect/Schema";
import { Session } from "../Session.middleware.js";
declare const AlreadyRegistered_base: import("@alchemy.run/domain/Rejection").RejectionClass<"AlreadyRegistered", {}>;
/** The customer is registered, or a registration is already in progress. */
export declare class AlreadyRegistered extends AlreadyRegistered_base {
}
declare const NotTheCustomer_base: import("@alchemy.run/domain/Rejection").RejectionClass<"NotTheCustomer", {}>;
/** A customer may only register themselves. */
export declare class NotTheCustomer extends NotTheCustomer_base {
}
declare const RegistrationRequested_base: import("@alchemy.run/domain/Event").EventClass<"RegistrationRequested", {
    readonly name: Schema.String;
    readonly username: Schema.brand<Schema.String, "Username">;
}>;
/** Registration waits for `UsernameReservation` to claim the username. */
export declare class RegistrationRequested extends RegistrationRequested_base {
}
declare const RegisterCustomer_base: import("@alchemy.run/domain/Command").CommandClass<"RegisterCustomer", Schema.brand<Schema.String, "CustomerId">, {
    readonly name: Schema.String;
    readonly username: Schema.brand<Schema.String, "Username">;
}, readonly [typeof RegistrationRequested], readonly [typeof AlreadyRegistered, typeof NotTheCustomer], undefined, readonly [typeof Session], import("effect/rpc/Rpc").Rpc<"RegisterCustomer", Schema.Struct<import("@alchemy.run/domain/Command").PayloadFields<Schema.brand<Schema.String, "CustomerId">, {
    readonly name: Schema.String;
    readonly username: Schema.brand<Schema.String, "Username">;
}>>, Schema.Struct<import("@alchemy.run/domain/Command").SuccessFields<undefined>>, Schema.Union<readonly [typeof AlreadyRegistered, typeof NotTheCustomer]>, typeof Session, never>>;
/**
 * Sign up as a customer under a unique username. The customer is registered
 * once the username is claimed; `MainAccountProvisioning` then opens their
 * main account.
 */
export declare class RegisterCustomer extends RegisterCustomer_base {
}
export {};
