import { hostname } from "node:os";

export function clientPlatform() {
  return { hostname: hostname(), platform: process.platform, arch: process.arch };
}
