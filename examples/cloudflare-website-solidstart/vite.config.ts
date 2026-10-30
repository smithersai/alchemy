import { solidStart } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import vibelang from "vibelang-vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vibelang(), solidStart(), tailwindcss()],
});
