import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import vibelang from "vibelang-vite";
import { defineConfig } from "vite";
import viteSolid from "vite-plugin-solid";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [vibelang(), tanstackStart(), viteSolid({ ssr: true })],
});
