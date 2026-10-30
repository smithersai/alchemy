import { foldkit } from "@foldkit/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import vibelang from "vibelang-vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vibelang(), tailwindcss(), foldkit()],
  optimizeDeps: {
    entries: ["src/entry.ts"],
  },
});
