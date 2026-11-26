import { build, typescript } from "../../../scripts/package-build.ts";

build(import.meta.dirname, {
  exports: {
    generate: true,
    worker: true,
    runtimeConditions: {
      "./Comment": { bun: "./src/Comment.ts", worker: "./src/Comment.ts" },
    },
  },
  steps: [typescript("-b")],
});
