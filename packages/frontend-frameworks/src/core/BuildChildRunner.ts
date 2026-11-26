// Starts the build child entry, `BuildChildRunner.vibe`: `runBuildChild` spawns this file when running from `src/`.
// Bun loads `.vibe` through the `--preload` flag the parent passes; Node registers VibeLang's loader first.
if (typeof (globalThis as { Bun?: unknown }).Bun === "undefined") await import("vibelang/register");
await import("./BuildChildRunner.vibe");
