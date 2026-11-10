import { inspect } from "node:util";

/** `value` as Node's `util.inspect` prints it, without colors. */
export const inspectPlain = (value: unknown): string => inspect(value, { colors: false });
