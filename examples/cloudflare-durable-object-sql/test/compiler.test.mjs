import test from "node:test";
import { checkExample } from "../../compiler-helper.mjs";

test(
  "cloudflare-durable-object-sql has no example-local compiler errors",
  { timeout: 120000 },
  () => {
    checkExample("cloudflare-durable-object-sql");
  },
);
