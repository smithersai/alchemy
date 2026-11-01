import * as Schema from "effect/Schema";
import { Account } from "../Account/Account.aggregate.vibe";
/** Daily outflow above which an account's activity is reviewed, in cents. */
export declare const REVIEW_THRESHOLD = 50000;
declare const DailyOutflowExceeded_base: import("@alchemy.run/domain/Event").EventClass<"DailyOutflowExceeded", {
    readonly day: Schema.String;
    readonly total: Schema.Int;
}>;
/** An account's money out today crossed {@link REVIEW_THRESHOLD}. */
export declare class DailyOutflowExceeded extends DailyOutflowExceeded_base {
}
declare const DailyOutflow_base: import("@alchemy.run/domain/View").ViewClass<"DailyOutflow", import("@alchemy.run/domain/View").Definition<readonly [typeof Account], typeof Account, Schema.Struct<{
    readonly day: Schema.String;
    readonly total: Schema.Int;
}>, readonly [typeof DailyOutflowExceeded], {}, readonly [], readonly []>, Schema.Struct<{
    readonly day: Schema.String;
    readonly total: Schema.Int;
}>, {
    readonly day: string;
    readonly total: number;
}, typeof Account, import("@alchemy.run/domain/View").ComputedFns<{
    readonly day: string;
    readonly total: number;
}, {}>, DailyOutflowExceeded>;
/**
 * Money out of an account per day. It emits a synthetic event when the day's
 * total crosses the threshold, so split withdrawals are caught too.
 */
export declare class DailyOutflow extends DailyOutflow_base {
}
export {};
