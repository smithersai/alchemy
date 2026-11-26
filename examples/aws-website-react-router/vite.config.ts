// Alchemy loads this config natively — no adapter or server preset needed
// here, the AWS Lambda wrapper is managed by `AWS.Website.ReactRouter`.
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import vibelang from "vibelang-vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vibelang(), tailwindcss(), reactRouter()],
});
