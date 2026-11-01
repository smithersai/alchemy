import * as Effect from "effect/Effect";
import { CurrentActor } from "../CurrentActor.context.js";
import type { CustomerId } from "../Customer/Customer.id.vibe";
import { NotOwner } from "./NotOwner.rejection.js";
/**
 * Who may read an account's data: any agent, or the customer who owns the
 * account right now. An account that doesn't exist yet reads as empty, so a
 * client can watch for it to appear; someone else's is rejected.
 */
export declare const mustOwn: (owner: CustomerId | null) => Effect.Effect<undefined, NotOwner, CurrentActor>;
