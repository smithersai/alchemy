import * as Schema from "effect/Schema";
import { WriteNote } from "./WriteNote.command.vibe";
declare const Notebook_base: import("@alchemy.run/domain/Aggregate").AggregateClass<"Notebook", import("@alchemy.run/domain/Aggregate").Resolved<Schema.brand<Schema.String, "UserId">, Schema.Struct<{
    readonly notes: Schema.Int;
}>, readonly [typeof WriteNote], readonly [], readonly []>>;
/** Each user's notebook, keyed by their id. */
export declare class Notebook extends Notebook_base {
}
export {};
