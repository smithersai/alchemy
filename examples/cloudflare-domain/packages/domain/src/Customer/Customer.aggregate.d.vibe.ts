import * as Schema from "effect/Schema";
import { ConfirmRegistration } from "./ConfirmRegistration.command.vibe";
import { RegisterCustomer } from "./RegisterCustomer.command.vibe";
import { RejectRegistration } from "./RejectRegistration.command.vibe";
declare const Customer_base: import("@alchemy.run/domain/Aggregate").AggregateClass<"Customer", import("@alchemy.run/domain/Aggregate").Resolved<Schema.brand<Schema.String, "CustomerId">, Schema.Union<readonly [Schema.TaggedStruct<"New", {}>, Schema.TaggedStruct<"Pending", {
    name: Schema.String;
    username: Schema.brand<Schema.String, "Username">;
}>, Schema.TaggedStruct<"Registered", {
    name: Schema.String;
    username: Schema.brand<Schema.String, "Username">;
}>]>, readonly [typeof RegisterCustomer, typeof ConfirmRegistration, typeof RejectRegistration], readonly [], readonly []>>;
/**
 * A customer. Registration is a small saga: the request records the profile,
 * `UsernameReservation` claims the username, then the registration is
 * confirmed or rejected.
 */
export declare class Customer extends Customer_base {
}
export {};
