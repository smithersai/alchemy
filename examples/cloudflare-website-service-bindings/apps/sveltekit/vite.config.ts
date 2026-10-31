import { sveltekit } from "@sveltejs/kit/vite";
import vibelang from "vibelang-vite";
import { defineConfig } from "vite";
export default defineConfig({ plugins: [vibelang(), sveltekit()] });
