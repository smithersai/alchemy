if (typeof globalThis.Bun !== "undefined") await import("vibelang/bun");
const { main } = await import("alchemy/Cli/main");
const { runMain } = await import("alchemy/Util/PlatformServices");

main.pipe(runMain);
