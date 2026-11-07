import { Customer } from "./Customer.aggregate.vibe";
import { RegistrationRequested } from "./RegisterCustomer.command.vibe";
declare const UsernameReservation_base: import("@alchemy.run/domain/Policy").PolicyClass<"UsernameReservation", typeof Customer, readonly [typeof RegistrationRequested], typeof Customer>;
/**
 * Reserve first, then commit: claim the username, and only then register the
 * customer. Nothing downstream (the main account) happens for a registration
 * whose username is taken.
 */
export declare class UsernameReservation extends UsernameReservation_base {
}
export declare const UsernameReservationLive: import("effect/Layer").Layer<import("@alchemy.run/domain/Policy").PolicyKey<"UsernameReservation">, never, import("@alchemy.run/domain/Aggregate").Key<"Customer"> | import("@alchemy.run/domain/Aggregate").Key<"UsernameClaim">>;
export {};
