import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(new URL("../scripts/package.json", import.meta.url));
const ts = createRequire(new URL("../examples/fly-website-nextjs/package.json", import.meta.url))(
  "typescript",
);
assert.equal(ts.version, "5.9.3", "use the existing classic TypeScript oracle");
const fc = require("fast-check");
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-fly-credential-factory.json", import.meta.url), "utf8"),
);
const caller = join(root, "packages/fly/src/Credentials.vibe");
const source = readFileSync(caller, "utf8");
const imported = source.match(/import\s*\{\s*lazyCredentials\s*\}\s*from\s*["']([^"']+)["']/)?.[1];
assert.ok(imported);
const direct = join(root, "packages/alchemy/lib/Auth/Resolve.d.ts");
const actual = imported.startsWith(".")
  ? resolve(dirname(caller), imported.replace(/\.js$/, ".ts"))
  : imported.startsWith("alchemy/")
    ? join(root, "packages/alchemy/lib", imported.slice("alchemy/".length) + ".d.ts")
    : null;
assert.ok(actual, "the imported factory must resolve to its actual declaration");
function diagnostics(factory, text) {
  const dir = mkdtempSync(join(root, ".vibelang-toolchain/fly-factory-"));
  const fixture = join(dir, "consumer.mts");
  try {
    writeFileSync(fixture, 'import { lazyCredentials } from "factory-under-test";\n' + text);
    const program = ts.createProgram([fixture], {
      strict: true,
      noEmit: true,
      allowImportingTsExtensions: true,
      skipLibCheck: true,
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.NodeNext,
      moduleResolution: ts.ModuleResolutionKind.NodeNext,
      baseUrl: root,
      types: [],
      paths: {
        "factory-under-test": [factory],
        "alchemy/*": [join(root, "packages/alchemy/lib/*")],
      },
    });
    return ts
      .getPreEmitDiagnostics(program)
      .map((d) => ({ code: d.code, message: ts.flattenDiagnosticMessageText(d.messageText, " ") }));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}
void test("the imported credential factory preserves contextual generic field types", () => {
  const rows = fc.sample(
    fc.record({
      field: fc.constantFrom(...corpus.fields),
      type: fc.constantFrom(...corpus.types),
      optional: fc.boolean(),
    }),
    { seed: corpus.seed, numRuns: corpus.runs },
  );
  const code = rows
    .map((row, n) => {
      const shape = "Shape" + n;
      return (
        "interface " +
        shape +
        " { readonly " +
        row.field +
        (row.optional ? "?" : "") +
        ": " +
        row.type +
        "; readonly expiresAt?: number }\n" +
        "lazyCredentials<" +
        shape +
        ", never>()('test', value => ({ result: value." +
        row.field +
        " }), { expiresAt: value => value.expiresAt });\n"
      );
    })
    .join("\n");
  assert.deepEqual(
    diagnostics(direct, code),
    [],
    "the original stock TypeScript factory is the control",
  );
  assert.deepEqual(
    diagnostics(actual, code),
    [],
    "the caller's imported factory retains those generic parameters",
  );
  const invalid = diagnostics(
    actual,
    "lazyCredentials<{ token: string }, never>()('test', value => value.missingToken);",
  );
  assert.equal(invalid.length, 1);
  assert.equal(invalid[0].code, 2339, JSON.stringify(invalid));
});
void test("the native Fly layer remains lazy without a configured profile", () => {
  const probe = fileURLToPath(
    new URL("./corpus/alchemy-fly-credential-factory.probe.mjs", import.meta.url),
  );
  const result = spawnSync("bun", ["--preload", "vibelang/bun", probe], {
    cwd: root,
    encoding: "utf8",
    timeout: 120000,
  });
  assert.ifError(result.error);
  assert.equal(result.signal, null, result.stderr);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.deepEqual(JSON.parse(result.stdout.trim().split("\n").at(-1)), {
    factories: 16,
    reads: 0,
    passed: true,
  });
});
