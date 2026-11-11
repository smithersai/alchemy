import test from "node:test";
import { checkBackendBuild } from "../../../backend-build-helper.mjs";

test(
  "monorepo-multi-stack emits native client dependencies and executable JavaScript",
  { timeout: 180000 },
  () => {
    checkBackendBuild("monorepo-multi-stack");
  },
);
