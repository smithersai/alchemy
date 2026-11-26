import test from "node:test";
import { checkExample } from "../../compiler-helper.mjs";

test("gcp-event-pipeline has no example-local compiler errors", { timeout: 120000 }, () => {
  checkExample("gcp-event-pipeline");
});
