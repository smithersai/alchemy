import { writeSync } from "node:fs";

/** @throws {never} */
export const envVar = (name: string): string | undefined => process.env[name];

export const writeStdout = (text: string) => process.stdout.write(text);

export const writeFd = (fd: number, text: string) => writeSync(fd, text);
