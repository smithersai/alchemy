import test from "node:test";
import { checkBackendBuild } from "../../../backend-build-helper.mjs";

test(
  "monorepo-single-stack emits native client dependencies and executable JavaScript",
  { timeout: 180000 },
  () => {
    checkBackendBuild("monorepo-single-stack");
  },
);
