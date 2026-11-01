import { BadArgument, SystemError } from "effect/PlatformError";
import * as Stream from "effect/Stream";
import type { CommandProps } from "./Command.js";
export interface CommandRedactor {
    readonly redact: (value: string) => string;
    readonly stream: <E, R>(stream: Stream.Stream<string, E, R>) => Stream.Stream<string, E, R>;
}
/** Redacts the `Redacted` env values of a command from its output and errors. */
export declare const makeCommandRedactor: (env: CommandProps["env"]) => CommandRedactor;
export declare const redactPlatformReason: (reason: BadArgument | SystemError, redactor: CommandRedactor) => BadArgument | SystemError;
