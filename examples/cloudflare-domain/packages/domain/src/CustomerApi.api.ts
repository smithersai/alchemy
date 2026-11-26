import * as Domain from "@alchemy.run/domain";
import { Account } from "./Account/Account.aggregate.vibe";
import { AccountCard } from "./Account/AccountCard.stream.vibe";
import { AccountSummary } from "./Account/AccountSummary.view.vibe";
import { CloseAccount } from "./Account/CloseAccount.command.ts";
import { DepositMoney } from "./Account/DepositMoney.command.ts";
import { Statement } from "./Account/Statement.view.vibe";
import { WithdrawMoney } from "./Account/WithdrawMoney.command.ts";
import { CustomerDashboard } from "./Customer/CustomerDashboard.view.vibe";
import { RegisterCustomer } from "./Customer/RegisterCustomer.command.vibe";
import { AccountTransfers } from "./Transfer/AccountTransfers.view.vibe";
import { RequestTransfer } from "./Transfer/RequestTransfer.command.vibe";
import { TransferStatus } from "./Transfer/TransferStatus.view.vibe";

/**
 * What the customer app reaches: commands to change things, and the Account
 * aggregate and views to read and watch. Each entry authorizes itself,
 * through its `decide` or `validate`.
 */
export class CustomerApi extends Domain.Api(
  "CustomerApi",
  RegisterCustomer,
  DepositMoney,
  WithdrawMoney,
  CloseAccount,
  RequestTransfer,
  Account,
  CustomerDashboard,
  AccountSummary,
  AccountCard,
  Statement,
  AccountTransfers,
  TransferStatus,
) {}
