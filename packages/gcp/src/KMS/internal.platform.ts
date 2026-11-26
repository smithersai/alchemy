import { createHash } from "node:crypto";
import * as Effect from "effect/Effect";

export const variantHash = (variant: unknown, length: number) =>
  Effect.sync(() =>
    createHash("sha256").update(JSON.stringify(variant)).digest("hex").slice(0, length),
  );
