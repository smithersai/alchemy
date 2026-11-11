import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(new URL("../packages/alchemy-test/package.json", import.meta.url));
const fc = createRequire(require.resolve("@effect/vitest"))("fast-check");
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-generated-sidecars.json", import.meta.url), "utf8"),
);

void test("generated sidecars restore stock TypeScript resolution from a clean source tree", () => {
  const directory = mkdtempSync(join(tmpdir(), "alchemy-generated-sidecars-"));
  try {
    mkdirSync(join(directory, "src"));
    symlinkSync(join(root, "node_modules"), join(directory, "node_modules"), "dir");
    const samples = fc.sample(
      fc.tuple(
        fc.stringMatching(/^[A-Z][A-Za-z0-9]{0,14}$/),
        fc.constantFrom("literal", "record", "tuple"),
      ),
      { seed: corpus.seed, numRuns: corpus.samples },
    );
    const consumers = [];
    for (const [index, [name, form]] of samples.entries()) {
      const module = name + index;
      const source =
        form === "record"
          ? "export interface Model { readonly value: 1 }\nexport const value: Model = { value: 1 }\n"
          : form === "tuple"
            ? "export const value = [1] as const\n"
            : "export const value = 1 as const\n";
      writeFileSync(join(directory, "src", module + ".vibe"), source.replaceAll("\\n", "\n"));
      const expression =
        form === "record" ? "value.value" : form === "tuple" ? "value[0]" : "value";
      consumers.push(`import { value as value${index} } from "./${module}.vibe";`);
      consumers.push(
        `export const result${index}: 1 = ${expression.replace("value", "value" + index)};`,
      );
    }
    writeFileSync(join(directory, "src/Consumer.ts"), consumers.join("\n").replaceAll("\\n", "\n"));
    writeFileSync(
      join(directory, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: {
          target: "ES2022",
          module: "ESNext",
          moduleResolution: "Bundler",
          allowArbitraryExtensions: true,
          allowImportingTsExtensions: true,
          strict: true,
          skipLibCheck: true,
          noEmit: true,
          composite: true,
          declaration: true,
          rootDir: "src",
          types: [],
        },
        include: ["src/**/*.ts", "src/**/*.vibe"],
      }),
    );
    const check = () =>
      spawnSync(
        join(root, "node_modules/.bin/tsc"),
        ["-p", join(directory, "tsconfig.json"), "--pretty", "false"],
        { encoding: "utf8" },
      );
    const before = check();
    assert.notEqual(before.status, 0);
    assert.match(before.stdout + before.stderr, /TS2307/);
    for (let pass = 0; pass < 3; pass++) {
      const generated = spawnSync(
        process.execPath,
        [join(root, "scripts/generate-sidecars.mjs"), join(directory, "tsconfig.json")],
        { encoding: "utf8" },
      );
      assert.equal(generated.status, 0, generated.stdout + generated.stderr);
      for (const [index, [name]] of samples.entries()) {
        assert.ok(existsSync(join(directory, "src", name + index + ".d.vibe.ts")));
      }
      const after = check();
      assert.equal(after.status, 0, after.stdout + after.stderr);
      if (pass === 1)
        for (const [index, [name]] of samples.entries())
          rmSync(join(directory, "src", name + index + ".d.vibe.ts"));
    }
    const invalid = "export const invalid: string = 1;\n";
    writeFileSync(join(directory, "src/Invalid.ts"), invalid);
    const twin = check();
    assert.notEqual(twin.status, 0);
    assert.match(twin.stdout + twin.stderr, /TS2322/);
    rmSync(join(directory, "src/Invalid.ts"));
    writeFileSync(join(directory, "src/Invalid.vibe"), invalid);
    const generated = spawnSync(
      process.execPath,
      [join(root, "scripts/generate-sidecars.mjs"), join(directory, "tsconfig.json")],
      { encoding: "utf8" },
    );
    assert.equal(generated.status, 0, generated.stdout + generated.stderr);
    const checked = spawnSync(
      process.execPath,
      [
        join(root, "node_modules/vibelang/bin/vibelang"),
        "-b",
        join(directory, "tsconfig.json"),
        "--pretty",
        "false",
      ],
      { encoding: "utf8" },
    );
    assert.notEqual(checked.status, 0, "generation must not mark invalid source as checked");
    assert.match(checked.stdout + checked.stderr, /TS2322/);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
