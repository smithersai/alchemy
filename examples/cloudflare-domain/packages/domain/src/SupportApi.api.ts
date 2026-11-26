import * as Domain from "@alchemy.run/domain";
import { AccountActivity } from "./Account/AccountActivity.view.vibe";
import { AccountSummary } from "./Account/AccountSummary.view.vibe";
import { ChangeOwner } from "./Account/ChangeOwner.command.ts";
import { FreezeAccount } from "./Account/FreezeAccount.command.vibe";
import { ApproveTransfer } from "./Transfer/ApproveTransfer.command.ts";

/** What the support console reaches, over the same Bank. */
export class SupportApi extends Domain.Api(
  "SupportApi",
  FreezeAccount,
  ChangeOwner,
  ApproveTransfer,
  AccountSummary,
  AccountActivity,
) {}
