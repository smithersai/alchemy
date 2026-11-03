import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = process.env.ALCHEMY_DOC_SOURCE_ROOT ?? fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(new URL("../packages/alchemy-test/package.json", import.meta.url));
const fc = createRequire(require.resolve("@effect/vitest"))("fast-check");
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-doc-comments.json", import.meta.url), "utf8"),
);
const normalize = (text) =>
  text
    .replace(/^\/\*\*|\*\/$/g, "")
    .replace(/^\s*\* ?/gm, "")
    .replace(/\s+/g, " ")
    .trim();

void test("converted documentation keeps the stock oracle's words and links", () => {
  const wrong = corpus.filter(({ file, oracle }) => {
    const source = readFileSync(join(root, file), "utf8");
    return !(source.match(/\/\*\*[\s\S]*?\*\//g) ?? []).some(
      (comment) => normalize(comment) === oracle,
    );
  });
  assert.deepEqual(
    wrong.map(({ file }) => file),
    [],
  );
});

void test("declaration emission preserves prose across Effect names and TypeScript links", () => {
  const dir = mkdtempSync(join(tmpdir(), "alchemy-doc-comments-"));
  try {
    mkdirSync(join(dir, "src"));
    const tick = String.fromCharCode(96);
    const comments = fc.sample(
      fc
        .array(
          fc.constantFrom(
            "Effect",
            "Redacted",
            "Stream",
            "Sink",
            "Layer",
            "Context",
            tick + "Effect<string>" + tick,
            tick + "Redacted<string>" + tick,
            '{@link import("./Child.ts").Child}',
          ),
          { minLength: 1, maxLength: 8 },
        )
        .map((words) => "/** " + words.join(" ") + " */"),
      { seed: 561115, numRuns: 40 },
    );
    comments.forEach((comment, index) =>
      writeFileSync(
        join(dir, "src", "witness" + index + ".vibe"),
        comment + "\nexport const value" + index + " = 1\n",
      ),
    );
    writeFileSync(
      join(dir, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: {
          target: "ES2022",
          module: "ESNext",
          types: [],
          skipLibCheck: true,
          declaration: true,
          emitDeclarationOnly: true,
          outDir: "./out",
          rootDir: "./src",
        },
        include: ["src/**/*.vibe"],
      }),
    );
    const result = spawnSync(
      join(root, "node_modules/vibelang/native/vibelang"),
      ["-p", join(dir, "tsconfig.json")],
      { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 },
    );
    assert.equal(result.status, 0, result.stdout + result.stderr);
    comments.forEach((comment, index) =>
      assert.ok(
        readFileSync(join(dir, "out", "witness" + index + ".d.ts"), "utf8").includes(comment),
        comment,
      ),
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
