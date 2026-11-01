import { CustomerRegistered } from "./ConfirmRegistration.command.vibe";
import { Customer } from "./Customer.aggregate.vibe";
declare const MainAccountProvisioning_base: import("@alchemy.run/domain/Policy").PolicyClass<"MainAccountProvisioning", typeof Customer, readonly [typeof CustomerRegistered], typeof Customer>;
/** Whenever a customer registers, open their main account. */
export declare class MainAccountProvisioning extends MainAccountProvisioning_base {
}
export declare const MainAccountProvisioningLive: import("effect/Layer").Layer<import("@alchemy.run/domain/Policy").PolicyKey<"MainAccountProvisioning">, never, import("@alchemy.run/domain/Aggregate").Key<"Account">>;
export {};
