import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const require = createRequire(join(root, "packages/alchemy-test/package.json"));
const fc = createRequire(require.resolve("@effect/vitest"))("fast-check");
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-chat-composition.json", import.meta.url), "utf8"),
);

void test("chat layers retain captured and remaining services across generated compositions", () => {
  fc.assert(
    fc.property(
      fc.array(fc.array(fc.boolean(), { minLength: 0, maxLength: 8 }), {
        minLength: 59,
        maxLength: 59,
      }),
      (generated) => {
        const dir = mkdtempSync(
          join(root, "demos/effect-prezzy/intro/snippets/chat/.composition-property-"),
        );
        try {
          const cells = [...corpus.cases, ...generated];
          assert.equal(cells.length, 64);
          const files = cells.map((dependencies, index) => {
            const source = [
              'import type * as Cloudflare from "@alchemy.run/cloudflare";',
              'import type { Stack } from "alchemy/Stack";',
              'import * as Layer from "effect/Layer";',
              'import type { History } from "../History.ts";',
              'import type Room from "../Room.ts";',
              'import { RoomLive } from "../Room.ts";',
              "type Assert<T extends true> = T;",
              "type Equal<A,B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;",
              "declare const history: Layer.Layer<History>;",
              ...dependencies.flatMap((needsStack, part) => [
                "interface Extra" +
                  part +
                  " { readonly tag: " +
                  JSON.stringify("extra-" + part) +
                  " }",
                "declare const extra" +
                  part +
                  ": Layer.Layer<Extra" +
                  part +
                  ", never, History" +
                  (needsStack ? " | Stack" : "") +
                  ">;",
              ]),
              "const composed = " +
                (dependencies.length
                  ? "Layer.mergeAll(RoomLive, " +
                    dependencies.map((_, part) => "extra" + part).join(", ") +
                    ")"
                  : "RoomLive") +
                ".pipe(Layer.provide(history));",
              "type Remaining = Assert<Equal<Layer.Services<typeof composed>, Cloudflare.Worker" +
                (dependencies.some(Boolean) ? " | Stack" : "") +
                ">>;",
              "type Provided = Assert<Equal<Layer.Success<typeof composed>, Room" +
                dependencies.map((_, part) => " | Extra" + part).join("") +
                ">>;",
            ].join("\n");
            const file = "case-" + index + ".ts";
            writeFileSync(join(dir, file), source + "\n");
            return file;
          });
          writeFileSync(
            join(dir, "tsconfig.json"),
            JSON.stringify({
              extends: "../tsconfig.json",
              compilerOptions: {
                rootDir: root,
                noEmit: true,
                composite: false,
                incremental: false,
              },
              files: ["../composition.types.ts", ...files],
              include: [],
              exclude: [],
            }),
          );
          const compile = () =>
            spawnSync(
              join(root, "node_modules/.bin/vibelang"),
              ["-p", join(dir, "tsconfig.json"), "--noEmit", "--pretty", "false"],
              {
                cwd: root,
                encoding: "utf8",
                timeout: 180000,
                maxBuffer: 32000000,
              },
            );
          const positive = compile();
          assert.equal(
            positive.status,
            0,
            (positive.stdout ?? "") + (positive.stderr ?? "") + String(positive.error ?? ""),
          );
          // A Worker dependency must not disappear when only History was supplied.
          writeFileSync(
            join(dir, files[0]),
            readFileSync(join(dir, files[0]), "utf8") +
              "\ntype WronglyErasedWorker = Assert<Equal<Layer.Services<typeof composed>, never>>;\n",
          );
          const negative = compile();
          assert.notEqual(negative.status, 0, "the changed dependency contract must be rejected");
          assert.match((negative.stdout ?? "") + (negative.stderr ?? ""), /TS2344/);
          console.log("64 chat layer graphs and the erased-Worker negative control passed");
        } finally {
          rmSync(dir, { recursive: true, force: true });
        }
      },
    ),
    { numRuns: 1, seed: 267, endOnFailure: true },
  );
});
