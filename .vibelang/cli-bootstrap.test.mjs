import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(new URL("../package.json", import.meta.url));
const testRequire = createRequire(
  new URL("../packages/alchemy-test/package.json", import.meta.url),
);
const fc = createRequire(testRequire.resolve("@effect/vitest"))("fast-check");
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-cli-bootstrap.json", import.meta.url), "utf8"),
);
const source = readFileSync(join(root, corpus.entry), "utf8");
function boot({ bun = true, preloaded = false, name = "fixture" }) {
  const temp = mkdtempSync(join(tmpdir(), "alchemy-cli-"));
  try {
    const project = join(temp, name);
    mkdirSync(project);
    symlinkSync(join(root, "node_modules"), join(project, "node_modules"), "dir");
    writeFileSync(
      join(project, "package.json"),
      JSON.stringify({
        name: "alchemy",
        type: "module",
        exports: {
          "./Cli/main": "./main." + (bun ? "vibe" : "mjs"),
          "./Util/PlatformServices": "./platform.mjs",
        },
      }),
    );
    writeFileSync(
      join(project, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: {
          strict: true,
          skipLibCheck: true,
          target: "ESNext",
          module: "ESNext",
          types: [],
          allowArbitraryExtensions: true,
          noEmit: true,
        },
        include: ["*.vibe"],
      }),
    );
    writeFileSync(
      join(project, "main." + (bun ? "vibe" : "mjs")),
      bun
        ? 'export const main = { pipe: (f: (value: string) => void): void => f("bootstrapped") };'
        : 'export const main = { pipe: (f) => f("bootstrapped") };',
    );
    writeFileSync(
      join(project, "platform.mjs"),
      "export const runMain = (value) => console.log(value);",
    );
    writeFileSync(join(project, "bin.mjs"), source);
    const args =
      bun && preloaded
        ? ["--preload", require.resolve("vibelang/bun"), "bin.mjs", "--help"]
        : ["bin.mjs", "--help"];
    const result = spawnSync(bun ? "bun" : process.execPath, args, {
      cwd: project,
      encoding: "utf8",
      maxBuffer: 4 * 1024 * 1024,
      env: { ...process.env, BUN_RUNTIME_TRANSPILER_CACHE_PATH: join(temp, "cache") },
    });
    assert.equal(result.status, 0, result.stderr + result.stdout);
    assert.ok(result.stdout.split("\n").includes("bootstrapped"));
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
}
void test("a bare Bun consumer loads VibeLang only after registering its loader", () => boot({}));
void test("Node compiled consumers and already-preloaded Bun consumers keep working", () => {
  boot({ bun: false });
  boot({ preloaded: true });
});
void test("CLI bootstrap tolerates existing loader registration and quoted install paths", () => {
  fc.assert(
    fc.property(
      fc.record({
        bun: fc.boolean(),
        preloaded: fc.boolean(),
        name: fc.constantFrom("fixture", "fixture with spaces", "quoted ' fixture", "unicode λ"),
      }),
      boot,
    ),
    { seed: 561110, numRuns: 40 },
  );
});
