import { join } from "node:path";
import test from "node:test";
import { checkConsumers, fc, root } from "../../../../type-consumers-helper.mjs";

test(
  "Nuxt configuration retains its types without generated auto-import globals",
  { timeout: 120000 },
  () => {
    const cases = fc.sample(fc.tuple(fc.boolean(), fc.boolean()), { seed: 77141, numRuns: 128 });
    const source = [
      'import { defineNuxtConfig } from "nuxt/config";',
      "import config from " +
        JSON.stringify(
          join(root, "examples/cloudflare-website-service-bindings/apps/nuxt/nuxt.config.ts"),
        ) +
        ";",
      ...cases.map(
        ([enabled, ssr], index) =>
          "const config" +
          index +
          " = defineNuxtConfig({ ...config, devtools: { enabled: " +
          enabled +
          " }, ssr: " +
          ssr +
          " });",
      ),
    ].join("\n");
    checkConsumers("cloudflare-website-service-bindings/apps/nuxt", source);
  },
);
