import { makeNeonTarget } from "../core/NeonServe.vibe";
import { makeNodeTarget } from "./node.vibe";

/** Vite assets served by a Neon Function, with native Vite development. */
export const target = (config?: Parameters<typeof makeNodeTarget>[0]) =>
  makeNeonTarget(makeNodeTarget(config));
export default target;
