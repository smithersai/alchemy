import vibelang from "vibelang-vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vibelang()],
  environments: {
    ssr: {
      build: {
        rollupOptions: {
          input: "./src/worker.ts",
        },
      },
    },
  },
});
