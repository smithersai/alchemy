import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vibelang from "vibelang-vite";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [vibelang(), solidPlugin({ ssr: true })],
  environments: {
    ssr: {
      build: {
        emptyOutDir: false,
        rolldownOptions: {
          input: resolve(__dirname, "src/entry-server.tsx"),
        },
      },
    },
  },
});
