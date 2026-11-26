import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const binary = (name) => join(root, "node_modules", ".bin", name);
const invoke = (name, args, env = process.env) =>
  spawnSync(binary(name), args, {
    cwd: join(root, "packages/alchemy"),
    env,
    encoding: "utf8",
    timeout: 120000,
    maxBuffer: 8 * 1024 * 1024,
  });
const phase = () =>
  [".vibe", ".ts"].map((ext) => join(root, "packages/alchemy/src/Phase" + ext)).find(existsSync);
const temporary = () => {
  const parent = join(root, ".vibelang-toolchain");
  mkdirSync(parent, { recursive: true });
  return mkdtempSync(join(parent, "phase-test-"));
};
const compilerOptions = {
  target: "ESNext",
  module: "NodeNext",
  moduleResolution: "NodeNext",
  strict: true,
  skipLibCheck: true,
  composite: false,
  incremental: false,
};
const diagnostics = (result) => (result.stdout ?? "") + (result.stderr ?? "");

void test("phase configuration builds with the installed compiler", { timeout: 120000 }, () => {
  const dir = temporary();
  try {
    assert.ok(phase(), "phase source must exist");
    const config = join(dir, "tsconfig.json");
    writeFileSync(
      config,
      JSON.stringify({ compilerOptions: { ...compilerOptions, noEmit: true }, files: [phase()] }),
    );
    const result = invoke("vibelang", ["-p", config, "--pretty", "false"]);
    assert.equal(result.status, 0, diagnostics(result));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

const phaseProgram =
  'import * as Effect from "effect/Effect"; import { ALCHEMY_PHASE } from "alchemy/Phase"; console.log(JSON.stringify(Effect.runSync(ALCHEMY_PHASE)))';
for (const [name, value, expected] of [
  ["defaults to plan", undefined, "plan"],
  ["accepts plan", "plan", "plan"],
  ["accepts runtime", "runtime", "runtime"],
]) {
  void test("phase configuration " + name, { timeout: 120000 }, () => {
    const env = { ...process.env };
    delete env.ALCHEMY_PHASE;
    if (value !== undefined) env.ALCHEMY_PHASE = value;
    const result = spawnSync("bun", ["--preload", "vibelang/bun", "--eval", phaseProgram], {
      cwd: join(root, "packages/alchemy"),
      env,
      encoding: "utf8",
      timeout: 120000,
      maxBuffer: 8 * 1024 * 1024,
    });
    assert.equal(result.status, 0, diagnostics(result));
    assert.equal(result.stdout.trim(), JSON.stringify(expected));
  });
}

void test("phase configuration rejects invalid values", { timeout: 120000 }, () => {
  const result = spawnSync("bun", ["--preload", "vibelang/bun", "--eval", phaseProgram], {
    cwd: join(root, "packages/alchemy"),
    env: { ...process.env, ALCHEMY_PHASE: "invalid" },
    encoding: "utf8",
    timeout: 120000,
    maxBuffer: 8 * 1024 * 1024,
  });
  assert.notEqual(result.status, 0);
  assert.match(diagnostics(result), /Invalid ALCHEMY_PHASE: invalid/);
});

void test("phase imports preserve existing runtime flags", { timeout: 120000 }, () => {
  const program =
    'globalThis.__ALCHEMY_RUNTIME__ = true; globalThis.__ALCHEMY_HOST_IDENTITY__ = "probe/identity"; await import("alchemy/Phase"); console.log(JSON.stringify([globalThis.__ALCHEMY_RUNTIME__, globalThis.__ALCHEMY_HOST_IDENTITY__]))';
  const result = spawnSync("bun", ["--preload", "vibelang/bun", "--eval", program], {
    cwd: join(root, "packages/alchemy"),
    env: process.env,
    encoding: "utf8",
    timeout: 120000,
    maxBuffer: 8 * 1024 * 1024,
  });
  assert.equal(result.status, 0, diagnostics(result));
  assert.deepEqual(JSON.parse(result.stdout.trim()), [true, "probe/identity"]);
});

void test(
  "ambient phase declarations match the stock compiler across keyed mutations",
  { timeout: 120000 },
  () => {
    const corpus = JSON.parse(
      readFileSync(join(root, ".vibelang/corpus/alchemy-phase-ambient-globals.json"), "utf8"),
    );
    const dir = temporary();
    try {
      const native = join(dir, "native");
      const stock = join(dir, "stock");
      mkdirSync(native);
      mkdirSync(stock);
      let seed = corpus.seed;
      const extension = phase().endsWith(".vibe") ? ".vibe" : ".ts";
      writeFileSync(join(native, "original" + extension), corpus.source);
      writeFileSync(join(stock, "original.ts"), corpus.source);
      for (let i = 0; i < corpus.mutations; i++) {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        const type = corpus.types[seed % corpus.types.length];
        const source =
          "declare global { var " +
          corpus.names[i % corpus.names.length] +
          "_PROBE_" +
          i +
          ": " +
          type +
          " }\nexport {}\n";
        writeFileSync(join(native, "case" + i + extension), source);
        writeFileSync(join(stock, "case" + i + ".ts"), source);
      }
      for (const folder of [native, stock]) {
        writeFileSync(
          join(folder, "tsconfig.json"),
          JSON.stringify({
            compilerOptions: {
              ...compilerOptions,
              declaration: true,
              emitDeclarationOnly: true,
              outDir: "lib",
            },
            include: ["*.ts", "*.vibe"],
          }),
        );
      }
      const before = invoke("vibelang", ["-p", join(native, "tsconfig.json"), "--pretty", "false"]);
      assert.equal(before.status, 0, diagnostics(before));
      const oracle = invoke("tsc", ["-p", join(stock, "tsconfig.json"), "--pretty", "false"]);
      assert.equal(oracle.status, 0, diagnostics(oracle));
      for (const stem of [
        "original",
        ...Array.from({ length: corpus.mutations }, (_, i) => "case" + i),
      ]) {
        const emitted = [
          join(native, "lib", stem + ".d.ts"),
          join(native, "lib", stem + ".d.vibe.ts"),
        ].find(existsSync);
        assert.ok(emitted, "declaration must be emitted for " + stem);
        assert.deepEqual(
          readFileSync(emitted),
          readFileSync(join(stock, "lib", stem + ".d.ts")),
          stem,
        );
      }
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  },
);
