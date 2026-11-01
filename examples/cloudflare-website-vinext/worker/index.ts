import handler from "vinext/server/fetch-handler";
import type { VinextEnv } from "../alchemy.run.vibe";

export default {
  async fetch(request: Request, env: VinextEnv, ctx: Parameters<typeof handler.fetch>[2]) {
    return handler.fetch(request, env, ctx);
  },
};
