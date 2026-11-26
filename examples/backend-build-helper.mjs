import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  cpSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { fc, root } from "./type-consumers-helper.mjs";

export function checkBackendBuild(project) {
  const directory = join(root, "examples", project, "backend");
  const manifest = JSON.parse(readFileSync(join(directory, "package.json")));
  const parent = join(root, ".vibelang-toolchain");
  mkdirSync(parent, { recursive: true });
  const fixture = mkdtempSync(join(parent, "native-backend-"));
  try {
    mkdirSync(join(fixture, "src"));
    symlinkSync(join(directory, "node_modules"), join(fixture, "node_modules"), "dir");
    writeFileSync(
      join(fixture, "package.json"),
      JSON.stringify({
        name: "native-backend-fixture",
        private: true,
        type: "module",
        scripts: { build: manifest.scripts.build },
      }),
    );
    writeFileSync(
      join(fixture, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: {
          target: "ESNext",
          module: "NodeNext",
          moduleResolution: "NodeNext",
          rootDir: "src",
          outDir: "lib",
          composite: true,
          strict: true,
          skipLibCheck: true,
          allowArbitraryExtensions: true,
          allowImportingTsExtensions: true,
          rewriteRelativeImportExtensions: true,
        },
        include: ["src"],
      }),
    );
    cpSync(
      join(root, "examples/corpus/alchemy-monorepo-client.ts"),
      join(fixture, "src/alchemy-monorepo-client.ts"),
    );
    cpSync(
      join(root, "examples/corpus/alchemy-monorepo-spec.vibe"),
      join(fixture, "src/alchemy-monorepo-spec.vibe"),
    );
    const checks = [{ file: "./lib/alchemy-monorepo-client.js", expected: "hello" }];
    const samples = fc.sample(fc.string(), { seed: 77142, numRuns: 128 });
    for (const [index, value] of samples.entries()) {
      writeFileSync(
        join(fixture, "src/Spec" + index + ".vibe"),
        "export effect function value() { return " + JSON.stringify(value) + " }\n",
      );
      writeFileSync(
        join(fixture, "src/Client" + index + ".ts"),
        'export { value } from "./Spec' + index + '.vibe";\n',
      );
      checks.push({ file: "./lib/Client" + index + ".js", expected: value });
    }
    const result = spawnSync("npm", ["run", "--silent", "build"], {
      cwd: fixture,
      encoding: "utf8",
      timeout: 120000,
      maxBuffer: 16 * 1024 * 1024,
    });
    assert.ifError(result.error);
    assert.equal(result.status, 0, (result.stdout ?? "") + (result.stderr ?? ""));
    writeFileSync(
      join(fixture, "verify.mjs"),
      [
        'import assert from "node:assert/strict";',
        'import * as Effect from "effect/Effect";',
        "import { fc } from " +
          JSON.stringify(join(root, "examples/type-consumers-helper.mjs")) +
          ";",
        "const checks = " + JSON.stringify(checks) + ";",
        "const values = await Promise.all(checks.map(async ({ file, expected }) => ({ value: (await import(file)).value, expected })));",
        "for (const { value, expected } of values) assert.equal(Effect.runSync(value()), expected);",
        "fc.assert(fc.property(fc.array(fc.integer({ min: 0, max: values.length - 1 }), { minLength: 1, maxLength: 12 }), (indices) => {",
        "for (const index of indices) assert.equal(Effect.runSync(values[index].value()), values[index].expected);",
        "}), { seed: 77143, numRuns: 128 });",
      ].join("\n"),
    );
    const runtime = spawnSync(process.execPath, ["verify.mjs"], {
      cwd: fixture,
      encoding: "utf8",
      timeout: 60000,
    });
    assert.ifError(runtime.error);
    assert.equal(runtime.status, 0, (runtime.stdout ?? "") + (runtime.stderr ?? ""));
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
}
