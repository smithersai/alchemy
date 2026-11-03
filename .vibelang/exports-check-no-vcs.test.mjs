import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  statSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { createRequire, stripTypeScriptTypes } from "node:module";
import { tmpdir } from "node:os";
import { delimiter, join } from "node:path";
import { after, test } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url)),
  require = createRequire(new URL("../scripts/package-build.ts", import.meta.url));
const fc = createRequire(
  createRequire(new URL("../packages/alchemy-test/package.json", import.meta.url)).resolve(
    "@effect/vitest",
  ),
)("fast-check");
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-exports-check-no-vcs.json", import.meta.url), "utf8"),
);
const temp = mkdtempSync(join(tmpdir(), "alchemy-exports-check-"));
after(() => rmSync(temp, { recursive: true, force: true }));
symlinkSync(join(root, "scripts/node_modules"), join(temp, "node_modules"), "dir");
const builderSource = readFileSync(
  process.env.ALCHEMY_EXPORTS_BUILDER_SOURCE ?? join(root, "scripts/package-build.ts"),
  "utf8",
);
writeFileSync(
  join(temp, "builder.mjs"),
  stripTypeScriptTypes(builderSource) + "\nexport{syncPublishExports};\n",
);
const { syncPublishExports } = await import(pathToFileURL(join(temp, "builder.mjs")).href);
const Effect = await import(pathToFileURL(require.resolve("effect/Effect")).href),
  NodeServices = await import(
    pathToFileURL(require.resolve("@effect/platform-node/NodeServices")).href
  );
let serial = 0;
async function check({
  dirty = true,
  stale = false,
  forbidden = false,
  example = false,
  extension = ".vibe",
  quote = '"',
  name = "@fixture.run/provider",
  text = "draft",
} = {}) {
  const directory = join(temp, "case-" + serial++),
    pkg = join(directory, "packages/fixture"),
    scripts = join(directory, "scripts"),
    bin = join(directory, "bin");
  for (const dir of [scripts, bin, join(pkg, "src"), join(pkg, "scripts")])
    mkdirSync(dir, { recursive: true });
  symlinkSync(join(root, "scripts/node_modules"), join(directory, "node_modules"), "dir");
  symlinkSync(join(root, "scripts/node_modules"), join(scripts, "node_modules"), "dir");
  writeFileSync(
    join(scripts, "builder.mjs"),
    stripTypeScriptTypes(builderSource) + "\nexport{syncPublishExports};\n",
  );
  writeFileSync(
    join(scripts, "sync-exports.ts"),
    readFileSync(
      process.env.ALCHEMY_EXPORTS_CLI_SOURCE ?? join(root, "scripts/sync-exports.ts"),
      "utf8",
    ),
  );
  writeFileSync(
    join(scripts, "exports-check.ts"),
    readFileSync(join(root, "scripts/exports-check.ts"), "utf8"),
  );
  writeFileSync(join(directory, "package.json"), '{"private":true,"type":"module"}');
  writeFileSync(join(pkg, "package.json"), JSON.stringify({ name, type: "module", exports: {} }));
  writeFileSync(join(pkg, "tsconfig.json"), '{"compilerOptions":{"outDir":"./lib"}}');
  writeFileSync(join(pkg, "src/index.ts"), "export{}");
  writeFileSync(join(pkg, "src/Entry.vibe"), "export const value=1");
  writeFileSync(
    join(pkg, "scripts/build.ts"),
    'import * as Effect from "effect/Effect";import * as NodeServices from "@effect/platform-node/NodeServices";import{syncPublishExports}from"../../../scripts/builder.mjs";await Effect.runPromise(Effect.provide(syncPublishExports(process.cwd(),{generate:true}),NodeServices.layer));',
  );
  const sourceFile = example
    ? join(directory, "examples/demo/Client" + extension)
    : join(pkg, "src/Client" + extension);
  mkdirSync(join(sourceFile, ".."), { recursive: true });
  const specifier = forbidden
    ? name + "/Feature/internal/item"
    : name + "-public/Feature/internal/item";
  writeFileSync(sourceFile, "import {} from " + quote + specifier + quote + ";\nexport {}\n");
  // Ignored dependency trees and generated Vibe sidecars are not authored source.
  mkdirSync(join(directory, "examples/node_modules/dependency"), { recursive: true });
  writeFileSync(
    join(directory, "examples/node_modules/dependency/ignored.vibe"),
    'import {} from "' + name + '/internal";',
  );
  writeFileSync(join(pkg, "src/ignored.d.vibe.ts"), 'import {} from "' + name + '/internal";');
  await Effect.runPromise(
    Effect.provide(syncPublishExports(pkg, { generate: true }), NodeServices.layer),
  );
  const manifestFile = join(pkg, "package.json"),
    manifest = JSON.parse(readFileSync(manifestFile, "utf8"));
  if (dirty) manifest.description = text;
  if (stale) delete manifest.exports["./Entry"];
  writeFileSync(manifestFile, JSON.stringify(manifest, null, 2) + "\n");
  const before = readFileSync(manifestFile, "utf8"),
    mtime = statSync(manifestFile).mtimeMs;
  // A test tripwire, not a Git invocation: the check must never ask for VCS.
  const calls = join(directory, "vcs-called");
  writeFileSync(join(bin, "git"), '#!/bin/sh\n: > "' + calls + '"\nexit 99\n', { mode: 0o755 });
  const result = spawnSync(process.execPath, [join(scripts, "sync-exports.ts"), "--check"], {
    cwd: directory,
    encoding: "utf8",
    timeout: 30000,
    maxBuffer: 8 * 1024 * 1024,
    env: { ...process.env, PATH: bin + delimiter + process.env.PATH },
  });
  const output = result.stdout + result.stderr;
  assert.equal(result.error, undefined, output);
  assert.equal(result.status === 0, !stale && !forbidden, output);
  assert.equal(
    readFileSync(manifestFile, "utf8"),
    before,
    "--check preserves manifest bytes on every outcome",
  );
  assert.equal(statSync(manifestFile).mtimeMs, mtime, "--check never rewrites a manifest");
  assert.throws(() => readFileSync(calls), "no VCS command is consulted");
  if (stale) assert.match(output, /exports are out of date/);
  else if (forbidden)
    assert.ok(
      output.includes(
        (example ? "examples/demo" : "packages/fixture/src") +
          "/Client" +
          extension +
          ":1: " +
          specifier,
      ),
      output,
    );
}
void test("exports check accepts an uncommitted description without VCS metadata", () => check());
void test("stale exports fail without rewriting the user's manifest", () => check({ stale: true }));
void test("boundary check covers Vibe source and examples", async () => {
  await check({ forbidden: true });
  await check({ forbidden: true, example: true, quote: "'" });
});
void test("check outcomes preserve manifests across source kinds and package names", async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.record({
        dirty: fc.boolean(),
        stale: fc.boolean(),
        forbidden: fc.boolean(),
        example: fc.boolean(),
        extension: fc.constantFrom(...corpus.extensions),
        quote: fc.constantFrom('"', "'"),
        name: fc.constantFrom("fixture", "@fixture.run/provider", "@scope/with-dashes"),
        text: fc.string({ maxLength: 30 }),
      }),
      check,
    ),
    { seed: corpus.seed, numRuns: corpus.samples },
  );
});
