import { moduleExtension } from "../Util/Node.ts";

/**
 * The `Local` module beside this one, with the extension of this
 * runtime's layout (`.ts` from source, `.js` from the compiled `lib/`).
 * Resolved once, when this module loads.
 */
export const devLocalModule: string = import.meta.resolve(
  `./Local${moduleExtension(import.meta.url)}`,
  import.meta.url,
);
