import { makeNeonTarget } from "../core/NeonServe.vibe";
import { makeNodeTarget } from "./node.vibe";

/** Nuxt's Node handler adapted to Neon's Fetch interface. */
export const target = (config?: Parameters<typeof makeNodeTarget>[0]) =>
  makeNeonTarget(makeNodeTarget(config));
export default target;
