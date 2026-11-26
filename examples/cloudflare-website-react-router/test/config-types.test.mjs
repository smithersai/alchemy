import test from "node:test";
import { checkConsumers, fc } from "../../type-consumers-helper.mjs";

test(
  "deployment configuration checks generated React children with the JSX transform",
  { timeout: 120000 },
  () => {
    const values = [
      "hello",
      "",
      'quotes " and <tags>',
      ...fc.sample(fc.string(), { seed: 77145, numRuns: 128 }),
    ];
    checkConsumers(
      "cloudflare-website-react-router",
      [
        'import type * as React from "react";',
        ...values.map(
          (value, index) =>
            "const child" +
            index +
            ": React.ReactNode = <span data-index={" +
            index +
            "}>{" +
            JSON.stringify(value) +
            "}</span>;",
        ),
      ].join("\n"),
      ".tsx",
    );
  },
);
