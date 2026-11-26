import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const manifest = JSON.parse(readFileSync(join(root, "packages/alchemy/package.json"), "utf8"));
const fc = createRequire(new URL("../scripts/package.json", import.meta.url))("fast-check");
const helpers = ["InstanceId.platform", "Util/md5.platform", "Util/AtomicFile.platform"];
void test("platform implementations are private in source and published package maps", () => {
  fc.assert(
    fc.property(
      fc.constantFrom(...helpers),
      fc.boolean(),
      fc.boolean(),
      (helper, published, reverse) => {
        const temporary = mkdtempSync(join(tmpdir(), "alchemy-platform-package-"));
        try {
          const entries = Object.entries(
            published ? manifest.publishConfig.exports : manifest.exports,
          );
          writeFileSync(
            join(temporary, "package.json"),
            JSON.stringify({
              name: manifest.name,
              type: "module",
              exports: Object.fromEntries(reverse ? entries.reverse() : entries),
            }),
          );
          for (const directory of ["src", "lib"])
            symlinkSync(
              join(root, "packages/alchemy", directory),
              join(temporary, directory),
              "dir",
            );
          const consumer = createRequire(join(temporary, "package.json"));
          assert.throws(() => consumer.resolve("alchemy/" + helper), {
            code: "ERR_PACKAGE_PATH_NOT_EXPORTED",
          });
          assert.ok(consumer.resolve("alchemy/InstanceId"));
          assert.ok(manifest.files.includes("!lib/" + helper + ".d.ts"));
          assert.ok(manifest.files.includes("!lib/" + helper + ".d.ts.map"));
        } finally {
          rmSync(temporary, { recursive: true, force: true });
        }
      },
    ),
    { seed: 33124, numRuns: 128 },
  );
});
