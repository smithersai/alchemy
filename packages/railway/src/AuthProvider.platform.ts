import * as os from "node:os";

export function hostname(): string { return os.hostname(); }
