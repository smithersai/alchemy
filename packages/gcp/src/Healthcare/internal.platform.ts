import * as Effect from "effect/Effect";

export const hl7ToBase64 = (value: string) =>
  Effect.sync(() => Buffer.from(value, "utf8").toString("base64"));

export const hl7FromBase64 = (value: string | undefined) =>
  Effect.sync(() => {
    if (value === undefined || value.length === 0) return "";
    return Buffer.from(value, "base64").toString("utf8");
  });
