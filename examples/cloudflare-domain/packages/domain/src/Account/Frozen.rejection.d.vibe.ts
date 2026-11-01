import * as Schema from "effect/Schema";
declare const Frozen_base: import("@alchemy.run/domain/Rejection").RejectionClass<"Frozen", {
    readonly reason: Schema.String;
}>;
/** The account is frozen. */
export declare class Frozen extends Frozen_base {
}
export {};
