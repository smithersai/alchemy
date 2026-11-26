// Starts generate-iam-actions.vibe with VibeLang's loader under Node (Bun loads .vibe through its preload).
if (typeof (globalThis as { Bun?: unknown }).Bun === "undefined") await import("vibelang/register");
await import("./generate-iam-actions.vibe");
