import * as Domain from "@alchemy.run/domain";
import { Notebook } from "./Notebook.aggregate.vibe";
import { Notes } from "./Notes.view.vibe";

export class NotesModel extends Domain.Model("Notes", {
  aggregates: [Notebook],
  views: [Notes],
}) {}
