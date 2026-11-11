import { join } from "node:path";
import test from "node:test";
import { checkConsumers, fc, root } from "../../type-consumers-helper.mjs";

test(
  "Solid app accepts generated Solid children rather than DOM Element instances",
  { timeout: 120000 },
  () => {
    const children = [
      "hello",
      3,
      false,
      null,
      ["one", "two"],
      ...fc.sample(
        fc.oneof(
          fc.string(),
          fc.integer(),
          fc.boolean(),
          fc.constant(null),
          fc.array(fc.string(), { maxLength: 5 }),
        ),
        { seed: 77140, numRuns: 128 },
      ),
    ];
    const source = [
      "import App from " +
        JSON.stringify(join(root, "examples/cloudflare-solidjs-ssr/src/app.tsx")) +
        ";",
      ...children.map(
        (child, index) => "const child" + index + " = <App>{" + JSON.stringify(child) + "}</App>;",
      ),
    ].join("\n");
    checkConsumers("cloudflare-solidjs-ssr", source, ".tsx");
  },
);
