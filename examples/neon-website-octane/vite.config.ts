import { octane } from "@octanejs/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import vibelang from "vibelang-vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vibelang(), octane(), tailwindcss()],
  build: { target: "esnext" },
});
