import * as Domain from "@alchemy.run/domain";
import { Notes } from "./Notes.view.vibe";
import { WriteNote } from "./WriteNote.command.vibe";

/** What the browser reaches. */
export class NotesApi extends Domain.Api("NotesApi", WriteNote, Notes) {}
