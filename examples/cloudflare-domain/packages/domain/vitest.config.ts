import vibelang from "vibelang-vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [vibelang()],
  test: { include: ["test/**/*.test.ts"], testTimeout: 30_000 },
});
