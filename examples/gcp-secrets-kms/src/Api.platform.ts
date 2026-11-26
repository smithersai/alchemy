import * as Effect from "effect/Effect";

export const toBase64 = (text: string) =>
  Effect.sync(() => Buffer.from(text, "utf8").toString("base64"));

export const fromBase64 = (data: string) =>
  Effect.sync(() => Buffer.from(data, "base64").toString("utf8"));
