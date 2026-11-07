import { TransferRequested } from "./RequestTransfer.command.vibe";
import { Transfer } from "./Transfer.aggregate.vibe";
/** How long a support agent has to approve a large transfer. */
export declare const APPROVAL_WINDOW = "24 hours";
declare const TransferApprovalDeadline_base: import("@alchemy.run/domain/Policy").PolicyClass<"TransferApprovalDeadline", typeof Transfer, readonly [typeof TransferRequested], typeof Transfer>;
/**
 * Whenever a transfer needs approval, expire it if nobody approves it in time.
 * The Transfer decides the race: approval and expiry are commands on the same
 * instance, so exactly one of them wins.
 */
export declare class TransferApprovalDeadline extends TransferApprovalDeadline_base {
}
export declare const TransferApprovalDeadlineLive: import("effect/Layer").Layer<import("@alchemy.run/domain/Policy").PolicyKey<"TransferApprovalDeadline">, never, import("@alchemy.run/domain/Aggregate").Key<"Transfer">>;
export {};
