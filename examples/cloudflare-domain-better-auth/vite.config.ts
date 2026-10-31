import { foldkit } from "@foldkit/vite-plugin";
import vibelang from "vibelang-vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vibelang(), foldkit()],
  optimizeDeps: {
    entries: ["src/web/entry.ts"],
    include: ["effect", "effect/Function", "effect/http", "@effect/platform-browser"],
  },
});
