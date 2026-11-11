// Starts the dev child entry, `DevChildRunner.vibe`: `runDevChild` spawns this file when running from `src/`.
// Bun loads `.vibe` through the `--preload` flag the parent passes; Node registers VibeLang's loader first.
if (typeof (globalThis as { Bun?: unknown }).Bun === "undefined") await import("vibelang/register");
await import("./DevChildRunner.vibe");
