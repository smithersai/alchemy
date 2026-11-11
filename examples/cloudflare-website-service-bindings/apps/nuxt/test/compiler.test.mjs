import test from "node:test";
import { checkExample } from "../../../../compiler-helper.mjs";

test(
  "cloudflare-website-service-bindings/apps/nuxt has no example-local compiler errors",
  { timeout: 120000 },
  () => {
    checkExample("cloudflare-website-service-bindings/apps/nuxt");
  },
);
