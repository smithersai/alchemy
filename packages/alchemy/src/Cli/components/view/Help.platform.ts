import { stripVTControlCharacters as stripControls } from "node:util";

/** `text` without ANSI escape codes, as Node's `util.stripVTControlCharacters` returns it. */
export const stripVTControlCharacters = (text: string): string => stripControls(text);
