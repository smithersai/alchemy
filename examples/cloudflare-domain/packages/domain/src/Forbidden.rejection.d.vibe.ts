import * as Schema from "effect/Schema";
declare const Forbidden_base: import("@alchemy.run/domain/Rejection").RejectionClass<"Forbidden", {
    readonly reason: Schema.String;
}>;
/** The caller may not read or do this. */
export declare class Forbidden extends Forbidden_base {
}
export {};
