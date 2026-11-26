import test from "node:test";
import { checkExample } from "../../compiler-helper.mjs";

test(
  "cloudflare-tanstack-rpc-drizzle has no example-local compiler errors",
  { timeout: 120000 },
  () => {
    checkExample("cloudflare-tanstack-rpc-drizzle");
  },
);
