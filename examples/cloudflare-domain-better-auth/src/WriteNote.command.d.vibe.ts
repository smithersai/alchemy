import * as Schema from "effect/Schema";
import { NotYours } from "./NotYours.rejection.js";
import { Session } from "./Session.middleware.js";
declare const NoteWritten_base: import("@alchemy.run/domain/Event").EventClass<"NoteWritten", {
    readonly text: Schema.String;
    readonly author: Schema.String;
}>;
export declare class NoteWritten extends NoteWritten_base {
}
declare const WriteNote_base: import("@alchemy.run/domain/Command").CommandClass<"WriteNote", Schema.brand<Schema.String, "UserId">, {
    readonly text: Schema.NonEmptyString;
}, readonly [typeof NoteWritten], readonly [typeof NotYours], undefined, readonly [typeof Session], import("effect/rpc/Rpc").Rpc<"WriteNote", Schema.Struct<import("@alchemy.run/domain/Command").PayloadFields<Schema.brand<Schema.String, "UserId">, {
    readonly text: Schema.NonEmptyString;
}>>, Schema.Struct<import("@alchemy.run/domain/Command").SuccessFields<undefined>>, Schema.Union<readonly [typeof NotYours]>, typeof Session, never>>;
/** Write a note in your own notebook. */
export declare class WriteNote extends WriteNote_base {
}
export {};
