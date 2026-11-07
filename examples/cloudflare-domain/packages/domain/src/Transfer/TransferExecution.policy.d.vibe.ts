import { TransferApproved } from "./ApproveTransfer.command.ts";
import { TransferFailed } from "./FailTransfer.command.vibe";
import { TransferRequested } from "./RequestTransfer.command.vibe";
import { Transfer } from "./Transfer.aggregate.vibe";
declare const TransferExecution_base: import("@alchemy.run/domain/Policy").PolicyClass<"TransferExecution", typeof Transfer, readonly [typeof TransferRequested, typeof TransferApproved, typeof TransferFailed], typeof Transfer>;
/**
 * Starts the ExecuteTransfer saga for every requested transfer, and passes on
 * what the Transfer decides about a large one: approved, or expired.
 */
export declare class TransferExecution extends TransferExecution_base {
}
export declare const TransferExecutionLive: import("effect/Layer").Layer<import("@alchemy.run/domain/Policy").PolicyKey<"TransferExecution">, never, import("@alchemy.run/domain/Saga").SagaKey<"ExecuteTransfer">>;
export {};
