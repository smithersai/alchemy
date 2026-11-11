import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(dirname(dirname(fileURLToPath(import.meta.url)))));
const require = createRequire(import.meta.url);
const testRequire = createRequire(require.resolve("@alchemy.run/test/package.json"));
const fc = createRequire(testRequire.resolve("@effect/vitest"))("fast-check");

test(
  "generated Cache API consumers retain both default and named caches",
  { timeout: 120000 },
  () => {
    const parent = join(root, "examples/cloudflare-dev/.vibelang-toolchain");
    mkdirSync(parent, { recursive: true });
    const dir = mkdtempSync(join(parent, "cache-types-"));
    try {
      const samples = fc.sample(
        fc.tuple(fc.string(), fc.constantFrom("match", "put", "delete"), fc.boolean()),
        { seed: 77135, numRuns: 128 },
      );
      const lines = [
        "const storage: CacheStorage = caches;",
        "const defaultCache: Cache = storage.default;",
        'const namedCache: Cache = await storage.open("named");',
      ];
      for (const [key, operation, flag] of samples) {
        const argument = JSON.stringify("https://example.com/" + key);
        lines.push(
          operation === "put"
            ? "await defaultCache.put(" + argument + ', new Response("body"));'
            : "await defaultCache." +
                operation +
                "(" +
                argument +
                ", { ignoreSearch: " +
                flag +
                " });",
        );
      }
      writeFileSync(join(dir, "consumer.ts"), lines.join("\n") + "\nexport {};\n");
      writeFileSync(
        join(dir, "tsconfig.json"),
        JSON.stringify({
          extends: join(root, "examples/cloudflare-dev/tsconfig.json"),
          compilerOptions: { rootDir: root, noEmit: true },
          include: [],
          files: [
            ...(existsSync(join(root, "examples/cloudflare-dev/src/cloudflare.d.ts"))
              ? [join(root, "examples/cloudflare-dev/src/cloudflare.d.ts")]
              : []),
            join(dir, "consumer.ts"),
          ],
          references: [],
        }),
      );
      const result = spawnSync(
        join(root, "node_modules/.bin/vibelang"),
        ["-p", join(dir, "tsconfig.json"), "--pretty", "false"],
        { cwd: root, encoding: "utf8", timeout: 110000 },
      );
      assert.ifError(result.error);
      assert.equal(result.status, 0, (result.stdout ?? "") + (result.stderr ?? ""));
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  },
);
