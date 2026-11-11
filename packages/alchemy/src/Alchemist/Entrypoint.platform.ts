import { pathToFileURL } from "node:url";

/** The `file://` URL of an absolute path, as `import()` takes it. */
export const fileUrlHref = (path: string): string => pathToFileURL(path).href;
