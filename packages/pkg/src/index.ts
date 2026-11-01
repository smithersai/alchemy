// The shared surface between the CLI and the registry Worker. The Worker
// itself lives on `@alchemy.run/pkg/Registry` so that importing this module
// never drags Cloudflare or GitHub runtime code into a CLI process.
export * from "./Manifest.vibe";
export * from "./Protocol.ts";
