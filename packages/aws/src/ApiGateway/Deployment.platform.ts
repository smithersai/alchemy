// The platform code of Deployment.vibe, which a .vibe file does not import as a value (EK4402).

import { createHash } from "node:crypto";
import * as Effect from "effect/Effect";

export const embedTriggers = (description: string | undefined, triggers?: Record<string, string>) =>
  Effect.gen(function* () {
    if (!triggers || Object.keys(triggers).length === 0) {
      return description;
    }
    const fp = yield* Effect.sync(() =>
      createHash("sha256").update(JSON.stringify(triggers)).digest("hex").slice(0, 24),
    );
    const suffix = `@alchemy:triggers:${fp}`;
    return description ? `${description}\n${suffix}` : suffix;
  });
