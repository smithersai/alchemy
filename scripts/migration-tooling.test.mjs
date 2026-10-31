import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  mkdtempSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
  copyFileSync,
  rmSync,
  symlinkSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";
import * as NodeServices from "@effect/platform-node/NodeServices";
import * as Effect from "effect/Effect";
import * as fc from "fast-check";
import { vibeFiles, vibeProjects } from "./check-vibe.mjs";

const scripts = dirname(fileURLToPath(import.meta.url));
const root = dirname(scripts);
const buildCorpus = JSON.parse(
  readFileSync(join(scripts, "testdata/alchemy-mixed-source-build.json"), "utf8"),
);
const errorCorpus = JSON.parse(
  readFileSync(join(scripts, "testdata/alchemy-vibe-type-error.json"), "utf8"),
);
const buildModule = process.env.MIGRATION_BUILD_MODULE || join(scripts, "package-build.ts");
const { typescript } = await import(pathToFileURL(buildModule));
const typecheck =
  process.env.MIGRATION_TYPECHECK_COMMAND ||
  JSON.parse(readFileSync(join(root, "package.json"), "utf8")).scripts.typecheck;

function fixture() {
  const path = mkdtempSync(join(tmpdir(), "alchemy-vibe-tooling-"));
  mkdirSync(join(path, "src"));
  return path;
}

function fakeBinary(directory, name, body) {
  const path = join(directory, name);
  writeFileSync(path, "#!/bin/sh\n" + body + "\n", { mode: 0o755 });
}

async function buildChoice(extensions) {
  const path = fixture();
  const bin = join(path, "bin");
  mkdirSync(bin);
  const marker = join(path, "compiler.txt");
  const savedPath = process.env.PATH;
  const savedMarker = process.env.MIGRATION_MARKER;
  try {
    for (const extension of extensions) writeFileSync(join(path, "src", "input" + extension), "");
    for (const name of ["vibelang", "tsrs", "tsc"]) {
      fakeBinary(bin, name, 'printf "%s\\n" "' + name + '" >> "$MIGRATION_MARKER"');
    }
    process.env.PATH = bin + ":" + savedPath;
    process.env.MIGRATION_MARKER = marker;
    await Effect.runPromise(Effect.provide(typescript("-b").run(path), NodeServices.layer));
    return readFileSync(marker, "utf8").trim();
  } finally {
    process.env.PATH = savedPath;
    if (savedMarker === undefined) delete process.env.MIGRATION_MARKER;
    else process.env.MIGRATION_MARKER = savedMarker;
    rmSync(path, { recursive: true, force: true });
  }
}

test("a package build compiles .vibe sources with VibeLang", async () => {
  assert.equal(await buildChoice(buildCorpus.extensions), buildCorpus.compiler);
});

test("declaration sidecars alone do not switch a TypeScript package's compiler", async () => {
  assert.ok(["tsrs", "tsc"].includes(await buildChoice([".ts", ".d.vibe.ts"])));
});

test("package build compiler selection covers extension combinations", async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.array(fc.constantFrom(".ts", ".tsx", ".vibe", ".d.vibe.ts", ".js"), {
        minLength: 1,
        maxLength: 6,
      }),
      async (extensions) => {
        const actual = await buildChoice([...new Set(extensions)]);
        assert.equal(actual === "vibelang", extensions.includes(".vibe"));
      },
    ),
    { seed: 814325, numRuns: 12 },
  );
});

function typecheckStatus(nativeStatus) {
  const path = fixture();
  try {
    const bin = join(path, "bin");
    mkdirSync(bin);
    mkdirSync(join(path, "scripts"));
    copyFileSync(join(scripts, "check-vibe.mjs"), join(path, "scripts", "check-vibe.mjs"));
    writeFileSync(join(path, "src", "input.vibe"), errorCorpus.source);
    writeFileSync(join(path, "tsconfig.json"), '{"include":["src/**/*.vibe"]}');
    fakeBinary(bin, "pnpm", "exit 0");
    fakeBinary(bin, "tsrs", "exit 0");
    fakeBinary(
      bin,
      "vibelang",
      'case "$*" in *--showConfig*) printf \'%s\\n\' \'{"files":["./src/input.vibe"]}\';; *) exit "$VIBE_TEST_STATUS";; esac',
    );
    return spawnSync("bash", ["-c", typecheck], {
      cwd: path,
      encoding: "utf8",
      env: {
        ...process.env,
        PATH: bin + ":" + process.env.PATH,
        VIBELANG_BINARY: join(bin, "vibelang"),
        VIBE_TEST_STATUS: String(nativeStatus),
      },
    });
  } finally {
    rmSync(path, { recursive: true, force: true });
  }
}

test("root typecheck propagates a VibeLang error even when the TypeScript consumer check passes", () => {
  const result = typecheckStatus(errorCorpus.status);
  assert.equal(result.status, errorCorpus.status, result.stdout + result.stderr);
});

test("root typecheck succeeds when both compilers succeed", () => {
  const result = typecheckStatus(0);
  assert.equal(result.status, 0, result.stdout + result.stderr);
});

test("the VibeLang status cannot be hidden by successful downstream consumers", () => {
  fc.assert(
    fc.property(fc.integer({ min: 0, max: 7 }), (status) => {
      const result = typecheckStatus(status);
      assert.equal(result.status, status, result.stdout + result.stderr);
    }),
    { seed: 92105, numRuns: 12 },
  );
});

test("source discovery covers src/lib and skips vendor and output directories", () => {
  const path = fixture();
  try {
    for (const file of [
      "src/lib/real.vibe",
      "submodules/vendor.vibe",
      ".repos/vendor.vibe",
      "lib/output.vibe",
      "node_modules/vendor.vibe",
    ]) {
      mkdirSync(dirname(join(path, file)), { recursive: true });
      writeFileSync(join(path, file), "");
    }
    assert.deepEqual(vibeFiles(path), [join(path, "src/lib/real.vibe")]);
  } finally {
    rmSync(path, { recursive: true, force: true });
  }
});

test("solution-style project references cover their .vibe source", () => {
  const path = fixture();
  try {
    writeFileSync(join(path, "src", "input.vibe"), "export const value = 1;");
    writeFileSync(
      join(path, "tsconfig.json"),
      '{"files":[],"references":[{"path":"./tsconfig.child.json"}]}',
    );
    writeFileSync(
      join(path, "tsconfig.child.json"),
      '{"compilerOptions":{"strict":true,"target":"ESNext","module":"Preserve","moduleResolution":"Bundler","types":[]},"include":["src/**/*.vibe"]}',
    );
    const result = vibeProjects(path, null);
    assert.deepEqual(result.files, [join(path, "src/input.vibe")]);
    assert.deepEqual(result.projects, [join(path, "tsconfig.child.json")]);
  } finally {
    rmSync(path, { recursive: true, force: true });
  }
});

test("a .vibe file excluded by every project is an error", () => {
  const path = fixture();
  try {
    writeFileSync(join(path, "src", "input.vibe"), "export const value = 1;");
    writeFileSync(join(path, "src", "other.ts"), "export const other = 1;");
    writeFileSync(
      join(path, "tsconfig.json"),
      '{"compilerOptions":{"types":[]},"include":["src/**/*.ts"]}',
    );
    assert.throws(() => vibeProjects(path), /No TypeScript project includes .*input.vibe/);
  } finally {
    rmSync(path, { recursive: true, force: true });
  }
});

const providerLint =
  process.env.MIGRATION_PROVIDER_LINT_MODULE || join(scripts, "lint-providers.ts");
const providerCorpus = JSON.parse(
  readFileSync(join(scripts, "testdata/alchemy-vibe-provider-lint.json"), "utf8"),
);

function providerLintResult({
  extension = ".vibe",
  requirement = "unknown",
  nested = false,
  sidecar = true,
  includeSidecars = true,
}) {
  const path = fixture();
  try {
    mkdirSync(join(path, "scripts"));
    copyFileSync(providerLint, join(path, "scripts/lint-providers.ts"));
    symlinkSync(join(scripts, "node_modules"), join(path, "node_modules"), "dir");
    const pkg = join(path, "packages/probe");
    const src = join(pkg, "src", ...(nested ? ["nested"] : []));
    mkdirSync(src, { recursive: true });
    const contract = "Layer.Layer<never, never, Input>";
    const source =
      'import type * as Layer from "effect/Layer";\n' +
      "type Input = " +
      requirement +
      ";\n" +
      "declare const value: " +
      contract +
      ";\n" +
      "export const providers = (): " +
      contract +
      " => value;\n";
    writeFileSync(join(src, "Providers" + extension), source);
    writeFileSync(
      join(pkg, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: {
          strict: true,
          target: "ESNext",
          module: "Preserve",
          moduleResolution: "Bundler",
          skipLibCheck: true,
          types: [],
          declaration: true,
          emitDeclarationOnly: true,
          outDir: "lib",
          rootDir: "src",
        },
        include: includeSidecars ? ["src/**/*.ts", "src/**/*.vibe"] : ["src/**/*.vibe"],
        vibelang: { declarationSidecars: true },
      }),
    );
    if (extension === ".vibe" && sidecar) {
      const emit = spawnSync(
        process.env.VIBELANG_BINARY || join(root, "node_modules/.bin/vibelang"),
        ["-p", join(pkg, "tsconfig.json")],
        { encoding: "utf8", timeout: 30000 },
      );
      assert.equal(emit.status, 0, emit.stdout + emit.stderr);
      assert.ok(readFileSync(join(src, "Providers.d.vibe.ts"), "utf8").includes("providers"));
    }
    return spawnSync(process.execPath, [join(path, "scripts/lint-providers.ts")], {
      cwd: path,
      encoding: "utf8",
      timeout: 30000,
      env: { ...process.env, GOMAXPROCS: "8" },
    });
  } finally {
    rmSync(path, { recursive: true, force: true });
  }
}

test("provider lint rejects an unknown requirement in a migrated provider factory", () => {
  const result = providerLintResult(providerCorpus);
  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stdout + result.stderr, /Providers\.vibe/);
  assert.match(result.stdout + result.stderr, /RIn includes/);
});

test("provider lint preserves its existing TypeScript checks", () => {
  const result = providerLintResult({ extension: ".ts", requirement: "unknown" });
  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stdout + result.stderr, /RIn includes/);
});

test("provider lint refuses a migrated factory without a declaration sidecar", () => {
  const result = providerLintResult({ sidecar: false });
  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stdout + result.stderr, /sidecar/i);
  assert.match(result.stdout + result.stderr, /Providers\.vibe/);
});

test("provider lint covers nested factories and leaked or resolved requirements", () => {
  fc.assert(
    fc.property(
      fc.constantFrom("unknown", "any", "never", "{ readonly service: unique symbol }"),
      fc.boolean(),
      (requirement, nested) => {
        const result = providerLintResult({ requirement, nested });
        const leaking = requirement === "unknown" || requirement === "any";
        assert.equal(result.status, leaking ? 1 : 0, result.stdout + result.stderr);
        assert.match(result.stdout + result.stderr, /Providers\.vibe/);
        assert.equal((result.stdout + result.stderr).includes("RIn includes"), leaking);
      },
    ),
    { seed: 309551, numRuns: 12 },
  );
});

test("provider lint refuses a sidecar excluded by the owning project", () => {
  const result = providerLintResult({ includeSidecars: false });
  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stdout + result.stderr, /excluded by its tsconfig/);
});
