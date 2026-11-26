import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, relative, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(dirname(dirname(fileURLToPath(import.meta.url)))));
const project = join(root, "examples/cloudflare-microvm-shell");
const testRequire = createRequire(join(root, "packages/alchemy-test/package.json"));
const fc = createRequire(testRequire.resolve("@effect/vitest"))("fast-check");
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-durable-object-rpc-init.json", import.meta.url)),
);

test(
  "generated RPC callers require the Worker context without server state",
  { timeout: 120000 },
  () => {
    const parent = join(project, ".vibelang-toolchain");
    mkdirSync(parent, { recursive: true });
    const dir = mkdtempSync(join(parent, "rpc-requirements-"));
    try {
      const samples = [
        ...corpus,
        ...fc.sample(
          fc.record({
            id: fc.string(),
            endpoint: fc.string(),
            headers: fc.dictionary(fc.string(), fc.string()),
          }),
          { seed: 77136, numRuns: 128 },
        ),
      ];
      const lines = [
        'import * as Effect from "effect/Effect";',
        'import type * as Cloudflare from "@alchemy.run/cloudflare";',
        'import type { RuntimeContext } from "alchemy/RuntimeContext";',
        "import ShellSession from " +
          JSON.stringify(relative(dir, join(project, "src/shell-session.vibe"))) +
          ";",
      ];
      for (const [index, sample] of samples.entries()) {
        lines.push(
          "const caller" +
            index +
            ": Effect.Effect<void, unknown, Cloudflare.Worker | RuntimeContext> = Effect.gen(function* () {",
          "const sessions = yield* ShellSession;",
          "yield* sessions.getByName(" +
            JSON.stringify(sample.id) +
            ").init(" +
            JSON.stringify({ endpoint: sample.endpoint, headers: sample.headers }) +
            ");",
          "});",
        );
      }
      writeFileSync(join(dir, "consumer.ts"), lines.join("\n") + "\n");
      const config = JSON.parse(readFileSync(join(project, "tsconfig.json")));
      writeFileSync(
        join(dir, "tsconfig.json"),
        JSON.stringify({
          extends: join(project, "tsconfig.json"),
          compilerOptions: { rootDir: root, noEmit: true },
          include: [],
          files: [join(dir, "consumer.ts")],
          references: (config.references ?? []).map(({ path }) => ({
            path: resolve(project, path),
          })),
        }),
      );
      const result = spawnSync(
        join(root, "node_modules/.bin/vibelang"),
        ["-p", join(dir, "tsconfig.json"), "--pretty", "false"],
        { cwd: root, encoding: "utf8", timeout: 110000, maxBuffer: 8 * 1024 * 1024 },
      );
      assert.ifError(result.error);
      assert.equal(result.status, 0, (result.stdout ?? "") + (result.stderr ?? ""));
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  },
);
