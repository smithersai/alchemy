import tailwindcss from "@tailwindcss/vite";
import vibelang from "vibelang-vite";
import vinext from "vinext";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vibelang(), vinext({ prerender: true }), tailwindcss()],
});
