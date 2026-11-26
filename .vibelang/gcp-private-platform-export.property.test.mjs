import assert from "node:assert/strict";
import { readFileSync, mkdtempSync, writeFileSync, mkdirSync, symlinkSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const pkg = join(root, "packages/gcp");
const manifest = JSON.parse(readFileSync(join(pkg, "package.json"), "utf8"));
const corpus = JSON.parse(
  readFileSync(
    new URL("./corpus/alchemy-gcp-private-platform-export.json", import.meta.url),
    "utf8",
  ),
);
const fc = createRequire(new URL("../scripts/package.json", import.meta.url))("fast-check");
function check(mode, directory, reverse) {
  const base = mkdtempSync(join(tmpdir(), "gcp-export-"));
  try {
    const target = join(base, directory);
    mkdirSync(target, { recursive: true });
    const map = mode === "source" ? manifest.exports : manifest.publishConfig.exports;
    const entries = Object.entries(map);
    writeFileSync(
      join(target, "package.json"),
      JSON.stringify({
        name: manifest.name,
        type: "module",
        exports: Object.fromEntries(reverse ? entries.reverse() : entries),
      }),
    );
    // Only source and emit trees are linked; repository metadata is never copied.
    for (const name of ["src", "lib"]) symlinkSync(join(pkg, name), join(target, name), "dir");
    const consumer = createRequire(join(target, "package.json"));
    assert.throws(
      () => consumer.resolve(manifest.name + corpus.privateSubpath.slice(1)),
      (e) => e?.code === "ERR_PACKAGE_PATH_NOT_EXPORTED",
    );
    assert.ok(consumer.resolve(manifest.name + corpus.publicSubpath.slice(1)));
  } finally {
    rmSync(base, { recursive: true, force: true });
  }
}
void test("generated key helper is private in source and published export maps", () => {
  assert.equal(manifest.exports[corpus.privateSubpath], null);
  assert.equal(manifest.publishConfig.exports[corpus.privateSubpath], null);
  check("source", "consumer", false);
  check("published", "consumer", false);
});
void test("private exact export wins over wildcard regardless of layout and key order", () => {
  fc.assert(
    fc.property(
      fc.record({
        mode: fc.constantFrom("source", "published"),
        directory: fc.constantFrom("consumer", "with spaces", "nested/consumer", "unicode-é"),
        reverse: fc.boolean(),
      }),
      ({ mode, directory, reverse }) => check(mode, directory, reverse),
    ),
    { seed: 20261109, numRuns: 128 },
  );
});
