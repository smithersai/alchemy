import * as Schema from "effect/Schema";
import type { CustomerId } from "../Customer/Customer.id.vibe";
export declare const AccountId: Schema.brand<Schema.String, "AccountId">;
export type AccountId = typeof AccountId.Type;
/** Every customer gets a main account with a predictable id. */
export declare const mainAccountId: (customerId: CustomerId) => AccountId;
