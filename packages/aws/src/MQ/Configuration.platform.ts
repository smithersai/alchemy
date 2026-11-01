// The platform code of Configuration.vibe, which a .vibe file does not import as a value (EK4402).

import * as Effect from "effect/Effect";

export const encodeData = (data: string): Effect.Effect<string> =>
  Effect.sync(() => Buffer.from(data, "utf8").toString("base64"));
export const decodeData = (data: string | undefined): Effect.Effect<string> =>
  Effect.sync(() => (data === undefined ? "" : Buffer.from(data, "base64").toString("utf8")));
