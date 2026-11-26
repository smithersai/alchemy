import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
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
  createRequire(new URL("../packages/kubernetes/package.json", import.meta.url)).resolve(
    "effect/package.json",
  ),
);
const corpus = JSON.parse(
  readFileSync(
    new URL("./corpus/alchemy-kubernetes-deployment-environment.json", import.meta.url),
    "utf8",
  ),
);

function diagnostics(text) {
  const dir = mkdtempSync(join(root, ".vibelang-toolchain/kubernetes-environment-"));
  const fixture = join(dir, "consumer.mts");
  try {
    writeFileSync(fixture, text);
    const program = ts.createProgram([fixture], {
      strict: true,
      noEmit: true,
      skipLibCheck: true,
      allowImportingTsExtensions: true,
      allowArbitraryExtensions: true,
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.Preserve,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      types: [],
      baseUrl: root,
      paths: {
        deployment: [join(root, "packages/kubernetes/lib/Deployment.d.ts")],
        "effect/*": [join(effectTypes, "dist/*.d.ts")],
        alchemy: [join(root, "packages/alchemy/lib/index.d.ts")],
        "@alchemy.run/docker": [join(root, "packages/docker/lib/index.d.ts")],
        "@alchemy.run/kubernetes": [join(root, "packages/kubernetes/lib/index.d.ts")],
        "alchemy/*": [join(root, "packages/alchemy/lib/*")],
        "@alchemy.run/docker/*": [join(root, "packages/docker/lib/*")],
      },
    });
    return ts.getPreEmitDiagnostics(program).map((d) => ({
      file: d.file?.fileName,
      code: d.code,
      message: ts.flattenDiagnosticMessageText(d.messageText, " "),
    }));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

void test("deployment consumers retain the stock environment through generic containers", () => {
  const rows = fc.sample(
    fc.array(fc.constantFrom("tuple", "array", "promise", "function", "object"), {
      minLength: 0,
      maxLength: 5,
    }),
    { seed: corpus.seed, numRuns: corpus.runs },
  );
  const checks = rows
    .map((wrappers, index) => {
      let wrapped = "ReturnType<typeof DeploymentProvider>";
      const extracts = [];
      for (const wrapper of wrappers) {
        const shapes = {
          tuple: ["readonly [" + wrapped + "]", "readonly [infer T]"],
          array: ["ReadonlyArray<" + wrapped + ">", "ReadonlyArray<infer T>"],
          promise: ["Promise<" + wrapped + ">", "Promise<infer T>"],
          function: ["() => " + wrapped, "() => infer T"],
          object: ["{ readonly value: " + wrapped + " }", "{ readonly value: infer T }"],
        };
        wrapped = shapes[wrapper][0];
        extracts.unshift(shapes[wrapper][1]);
      }
      let body = "X";
      for (const shape of extracts) body = "(" + body + ") extends " + shape + " ? T : never";
      return (
        "type Wrapped" +
        index +
        " = " +
        wrapped +
        ";\n" +
        "type Unwrap" +
        index +
        "<X> = " +
        body +
        ";\n" +
        "const check" +
        index +
        ": Equal<Environment<Unwrap" +
        index +
        "<Wrapped" +
        index +
        ">>, Expected> = true;\n"
      );
    })
    .join("\n");
  const prelude =
    'import type * as Layer from "effect/Layer";\nimport type { DeploymentProvider } from "deployment";\n' +
    "type Environment<L> = L extends Layer.Layer<any, any, infer R> ? R : never;\n" +
    "type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;\n" +
    "type Expected = " +
    corpus.expectedEnvironment +
    ";\n";
  assert.deepEqual(
    diagnostics(prelude + checks),
    [],
    "the actual emitted API retains every stock service requirement",
  );
  const negative = diagnostics(
    prelude +
      "const widened: Equal<Environment<Layer.Layer<never, never, unknown>>, Expected> = true;\n",
  );
  assert.equal(negative.length, 1, JSON.stringify(negative));
  assert.equal(negative[0].code, 2322, "the oracle rejects an unknown environment");
});

void test("deleted services complete without swallowing unrelated failures or defects", () => {
  const probe = fileURLToPath(
    new URL("./corpus/alchemy-kubernetes-service-gone.probe.mjs", import.meta.url),
  );
  const result = spawnSync("bun", ["--preload", "vibelang/bun", probe], {
    cwd: root,
    encoding: "utf8",
    timeout: 120000,
  });
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.equal(JSON.parse(result.stdout.trim()).passed, true);
});
