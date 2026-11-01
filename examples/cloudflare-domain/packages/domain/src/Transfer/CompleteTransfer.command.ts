import * as Domain from "@alchemy.run/domain";
import { TransferId } from "./Transfer.id.vibe";

export class TransferCompleted extends Domain.Event("TransferCompleted", {
  transferId: TransferId,
}) {}

/** Reports an outcome, so it never rejects. */
export class CompleteTransfer extends Domain.Command("CompleteTransfer", {
  target: TransferId,
  events: [TransferCompleted],
}) {}
