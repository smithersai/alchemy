import * as Schema from "effect/Schema";
import { Notebook } from "./Notebook.aggregate.vibe";
import { NotYours } from "./NotYours.rejection.js";
import { Session } from "./Session.middleware.js";
declare const Notes_base: import("@alchemy.run/domain/View").ViewClass<"Notes", import("@alchemy.run/domain/View").Definition<readonly [typeof Notebook], typeof Notebook, Schema.Struct<{
    readonly notes: Schema.$Array<Schema.String>;
}>, readonly [], {}, readonly [typeof Session], readonly [typeof NotYours]>, Schema.Struct<{
    readonly notes: Schema.$Array<Schema.String>;
}>, {
    readonly notes: readonly string[];
}, typeof Notebook, import("@alchemy.run/domain/View").ComputedFns<{
    readonly notes: readonly string[];
}, {}>, import("./WriteNote.command.vibe").NoteWritten>;
/** The notes in a notebook. Only its owner may read them. */
export declare class Notes extends Notes_base {
}
export {};
