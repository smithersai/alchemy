import * as Domain from "@alchemy.run/domain";
import { Cents } from "../Money.vibe";

/** The balance does not cover the amount. */
export class InsufficientFunds extends Domain.Rejection("InsufficientFunds", {
  balance: Cents,
  requested: Cents,
}) {}
