import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(new URL("../scripts/package.json", import.meta.url));
const fc = require("fast-check");
const ts = createRequire(new URL("../examples/fly-website-nextjs/package.json", import.meta.url))(
  "typescript",
);
assert.equal(ts.version, "5.9.3");
const effectTypes = dirname(
  createRequire(new URL("../packages/pkg/package.json", import.meta.url)).resolve(
    "effect/package.json",
  ),
);
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-pkg-sql-callback.json", import.meta.url), "utf8"),
);
void test("expired tarball rows keep the stock readonly contract through generic consumers", () => {
  const rows = fc.sample(
    fc.record({
      field: fc.constantFrom(...corpus.fields),
      index: fc.nat(500),
      bracket: fc.boolean(),
    }),
    { seed: corpus.seed, numRuns: corpus.runs },
  );
  const dir = mkdtempSync(join(root, ".vibelang-toolchain/tarball-readonly-"));
  const fixture = join(dir, "consumer.mts");
  try {
    const prelude =
      'import type * as Effect from "effect/Effect";\nimport type { deleteExpired } from "tags-under-test";\n' +
      "type Row = Effect.Success<ReturnType<typeof deleteExpired>>[number];\n";
    const text = rows
      .map(
        (row, n) =>
          "declare const rows" +
          n +
          ": ReadonlyArray<Row>;\nrows" +
          n +
          "[" +
          row.index +
          "]" +
          (row.bracket ? "[" + JSON.stringify(row.field) + "]" : "." + row.field) +
          ' = "changed";\n',
      )
      .join("");
    writeFileSync(fixture, prelude + text);
    const program = ts.createProgram([fixture], {
      strict: true,
      noEmit: true,
      skipLibCheck: true,
      allowImportingTsExtensions: true,
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.NodeNext,
      moduleResolution: ts.ModuleResolutionKind.NodeNext,
      types: [],
      baseUrl: root,
      paths: {
        "tags-under-test": [join(root, "packages/pkg/dist/Registry/Tags.d.ts")],
        "effect/*": [join(effectTypes, "dist/*.d.ts")],
      },
    });
    const errors = ts
      .getPreEmitDiagnostics(program)
      .map((d) => ({ code: d.code, message: ts.flattenDiagnosticMessageText(d.messageText, " ") }));
    assert.equal(errors.length, rows.length, JSON.stringify(errors));
    assert.ok(
      errors.every((error) => error.code === 2540),
      JSON.stringify(errors),
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
