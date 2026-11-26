import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { checkConsumers, fc, root } from "./type-consumers-helper.mjs";

for (const project of [
  "aws-website-nuxt",
  "aws-website-sveltekit",
  "aws-website-tanstack-start",
  "aws-website-waku",
]) {
  test(
    project + " checks generated callers of the shared JSX formatter",
    { timeout: 120000 },
    () => {
      const corpus = readFileSync(
        new URL("./corpus/alchemy-deployment-jsx.ts", import.meta.url),
        "utf8",
      ).replace(
        '"../../packages/alchemy/src/Cli/components/view/Format.tsx"',
        JSON.stringify(join(root, "packages/alchemy/src/Cli/components/view/Format.tsx")),
      );
      const values = fc.sample(fc.string(), { seed: 77146, numRuns: 128 });
      checkConsumers(
        project,
        corpus +
          "\n" +
          values
            .map(
              (value, index) =>
                "const view" + index + " = normalizeView(" + JSON.stringify(value) + ");",
            )
            .join("\n"),
      );
    },
  );
}
