import { build, bunEntries, typescript } from "../../../scripts/package-build.ts";

build(import.meta.dirname, {
  exports: {
    generate: true,
    worker: true,
    runtimeConditions: {
      "./Hasher/WorkerLoader": {
        bun: "./lib-bun/Hasher/WorkerLoader.js",
        worker: "./lib-bun/Hasher/WorkerLoader.js",
      },
    },
  },
  steps: [typescript("-b"), bunEntries("Hasher/WorkerLoader")],
});
