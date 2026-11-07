import { Account } from "../Account/Account.aggregate.vibe";
import { DailyOutflow, DailyOutflowExceeded } from "./DailyOutflow.view.vibe";
declare const FraudReview_base: import("@alchemy.run/domain/Policy").PolicyClass<"FraudReview", typeof DailyOutflow, readonly [typeof DailyOutflowExceeded], typeof Account>;
/** Whenever an account's daily outflow crosses the threshold, score it and freeze the account if risky. */
export declare class FraudReview extends FraudReview_base {
}
export declare const FraudReviewLive: import("effect/Layer").Layer<import("@alchemy.run/domain/Policy").PolicyKey<"FraudReview">, never, import("@alchemy.run/domain/ExternalSystem").ExternalSystemKey<"FraudCheck"> | import("@alchemy.run/domain/Aggregate").Key<"Account">>;
export {};
