import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(new URL("../packages/alchemy-test/package.json", import.meta.url));
const fc = createRequire(require.resolve("@effect/vitest"))("fast-check");
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-module-header-ownership.json", import.meta.url), "utf8"),
);

void test("authored module headers remain attached to imports", () => {
  for (const file of corpus.files) {
    const source = readFileSync(join(root, file), "utf8");
    const header = source.match(/\/\*\*[\s\S]*?\*\//);
    assert.ok(header, file);
    const following = source.slice(header.index + header[0].length).trimStart();
    assert.match(
      following,
      /^import(?:\s|{)/,
      file + ": the module header became declaration documentation",
    );
  }
});

void test("module header placement preserves the written public contract", () => {
  const dir = mkdtempSync(join(tmpdir(), "alchemy-header-ownership-"));
  const contract = "/** The public interface contract. */";
  try {
    mkdirSync(join(dir, "src"));
    writeFileSync(
      join(dir, "src/Stub.ts"),
      "export interface A { readonly a: 1 }; export interface B { readonly b: 2 }; export interface C { readonly c: 3 }\n",
    );
    const samples = fc.sample(
      fc.record({
        slot: fc.integer({ min: 0, max: 2 }),
        words: fc.array(
          fc.constantFrom("Effect", "Context", "module", "source.ts", "helpers", "types"),
          { minLength: 1, maxLength: 8 },
        ),
      }),
      { seed: corpus.seed, numRuns: 40 },
    );
    const imports = ["A", "B", "C"].map((name) => "import type { " + name + ' } from "./Stub.ts";');
    const declaration =
      "export interface Public extends A { readonly second: B; readonly third: C }\n";
    for (const [i, sample] of samples.entries()) {
      const header = "/** " + sample.words.join(" ") + " */";
      const good = [
        ...imports.slice(0, sample.slot),
        header,
        ...imports.slice(sample.slot),
        contract,
        declaration,
      ];
      const bad = [...imports, header, contract, declaration];
      for (const [kind, parts] of [
        ["good", good],
        ["bad", bad],
      ])
        writeFileSync(join(dir, "src", kind + i + ".vibe"), parts.join("\n"));
    }
    writeFileSync(
      join(dir, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: {
          target: "ES2022",
          module: "ESNext",
          types: [],
          strict: true,
          skipLibCheck: true,
          declaration: true,
          rootDir: "./src",
          outDir: "./out",
        },
        include: ["src/**/*"],
      }),
    );
    const result = spawnSync(
      join(root, "node_modules/vibelang/native/vibelang"),
      ["-p", join(dir, "tsconfig.json")],
      { encoding: "utf8" },
    );
    assert.equal(result.status, 0, result.stdout + result.stderr);
    const documentFor = (kind, i) => {
      const emitted = readFileSync(join(dir, "out", kind + i + ".d.ts"), "utf8");
      const prefix = emitted.slice(0, emitted.indexOf("export interface Public"));
      return prefix.slice(prefix.lastIndexOf(";") + 1).trim();
    };
    for (let i = 0; i < samples.length; i++) {
      assert.equal(documentFor("good", i), contract);
      assert.notEqual(documentFor("bad", i), contract);
      assert.ok(documentFor("bad", i).includes(sampleHeader(samples[i])));
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
function sampleHeader(sample) {
  return "/** " + sample.words.join(" ") + " */";
}
