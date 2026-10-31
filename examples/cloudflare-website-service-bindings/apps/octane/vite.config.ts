import { octane } from "@octanejs/vite-plugin";
import vibelang from "vibelang-vite";
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [vibelang(), octane()],
  build: { target: "esnext" },
});
