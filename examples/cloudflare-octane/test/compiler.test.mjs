import test from "node:test";
import { checkExample } from "../../compiler-helper.mjs";

test("cloudflare-octane has no example-local compiler errors", { timeout: 120000 }, () => {
  checkExample("cloudflare-octane");
});
