import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import vibelang from "vibelang-vite";
import { defineConfig } from "vite";

// No @cloudflare/vite-plugin here — Alchemy's Website.Vite merges its own
// Cloudflare integration on top of this config at build time.
export default defineConfig({
  plugins: [vibelang(), react(), tailwindcss()],
});
