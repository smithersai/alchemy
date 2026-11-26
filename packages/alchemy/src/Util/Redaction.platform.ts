import { Buffer } from "node:buffer";

export const base64 = (text: string): string => Buffer.from(text).toString("base64");
