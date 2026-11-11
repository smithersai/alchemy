import { makeNeonTarget } from "../core/NeonServe.ts";
import { makeNodeTarget } from "./node.vibe";

/** Waku React Server Components served by a Neon Fetch handler. */
export const target = (config?: Parameters<typeof makeNodeTarget>[0]) =>
  makeNeonTarget(makeNodeTarget(config));
export default target;
