import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(new URL("../packages/gcp/package.json", import.meta.url));
const Effect = require("effect/Effect");
const fc = createRequire(new URL("../scripts/package.json", import.meta.url))("fast-check");
const binary = (
  await import(pathToFileURL(join(root, "node_modules/vibelang/binary.mjs")))
).findBinary();
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-run-service-diff.json", import.meta.url), "utf8"),
);
function fragment(text, native, predicate) {
  const parsed = spawnSync(binary, ["--estree", native ? "Service.vibe" : "Service.ts"], {
    input: text,
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
  assert.equal(parsed.status, 0, parsed.stderr);
  const nodes = [];
  function visit(value) {
    if (Array.isArray(value)) value.forEach(visit);
    else if (value && typeof value === "object") {
      if (value.type) nodes.push(value);
      Object.values(value).forEach(visit);
    }
  }
  visit(JSON.parse(parsed.stdout).ast);
  const node = nodes.find(predicate);
  assert.ok(node);
  return Array.from(text)
    .slice(...node.range)
    .join("");
}
void test("Run service diff preserves replacement, code hashes, short circuits and coldness", async () => {
  const native = existsSync(join(root, corpus.module));
  const text = readFileSync(
    join(root, native ? corpus.module : corpus.module.replace(/\.vibe$/, ".ts")),
    "utf8",
  );
  const diff = fragment(
    text,
    native,
    (node) => node.type === "Property" && node.key.name === "diff",
  );
  const lastSegment = fragment(
    text,
    native,
    (node) =>
      node.type === "VariableDeclaration" &&
      node.declarations.some((item) => item.id.name === "lastSegment"),
  );
  const normalize = fragment(
    text,
    native,
    (node) =>
      node.type === "VariableDeclaration" &&
      node.declarations.some((item) => item.id.name === "normalizeLocation"),
  );
  const temporary = mkdtempSync(join(root, ".vibelang-toolchain/run-diff-"));
  try {
    symlinkSync(join(root, "packages/gcp/node_modules"), join(temporary, "node_modules"), "dir");
    writeFileSync(join(temporary, "package.json"), '{"type":"module"}');
    writeFileSync(
      join(temporary, "predicate.ts"),
      `
export const isResolved = (value: unknown) => {
  if (typeof value === "object" && value !== null) (value as {probeResolved?: unknown}).probeResolved;
  return value !== "unresolved";
};
`,
    );
    writeFileSync(
      join(temporary, "main.vibe"),
      `
import * as Effect from "effect/Effect";
let environmentReads = 0;
let imageReads = 0;
let hashValue: string | undefined = undefined;
export const configure = (value: string | undefined) => {
  hashValue = value; environmentReads = 0; imageReads = 0;
};
export const observed = () => ({ environmentReads, imageReads });
import { isResolved } from "./predicate.ts";
const GcpEnvironment = { current: Effect.sync(() => {
  environmentReads++; return { region: "us-central1" };
}) };
const makeImageSource = Effect.sync(() => ({
  hash: (_options: unknown) => Effect.sync(() => { imageReads++; return hashValue; }),
}));
const sourceOf = (_news: unknown, _main: unknown) => ({});
const bootstrapFor = (_news: unknown) => ({});
${lastSegment}
${normalize}
const provider = { ${diff} };
export const probe = (args: any) => provider.diff(args);
`,
    );
    writeFileSync(
      join(temporary, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: {
          target: "ESNext",
          module: "Preserve",
          moduleResolution: "Bundler",
          strict: false,
          skipLibCheck: true,
          types: ["bun"],
          noEmit: false,
          outDir: "out",
          rewriteRelativeImportExtensions: true,
          allowArbitraryExtensions: true,
        },
        files: ["main.vibe"],
      }),
    );
    const compiled = spawnSync(
      binary,
      ["-p", join(temporary, "tsconfig.json"), "--pretty", "false"],
      {
        cwd: root,
        encoding: "utf8",
        maxBuffer: 16 * 1024 * 1024,
        timeout: 120000,
      },
    );
    assert.ifError(compiled.error);
    assert.equal(compiled.status, 0, compiled.stdout + compiled.stderr);
    const module = await import(pathToFileURL(join(temporary, "out/main.js")));
    const id = fc.option(fc.constantFrom(...corpus.identifiers), { nil: undefined });
    const location = fc.option(fc.constantFrom(...corpus.regions), { nil: undefined });
    await fc.assert(
      fc.asyncProperty(
        id,
        id,
        location,
        location,
        fc.boolean(),
        id,
        async (beforeId, afterId, beforeLocation, afterLocation, hasMain, codeHash) => {
          module.configure(codeHash);
          const output = { serviceId: beforeId, location: beforeLocation, codeHash: "old" };
          const program = module.probe({
            news: {
              serviceId: afterId,
              location: afterLocation,
              main: hasMain ? "entry.ts" : undefined,
            },
            olds: { serviceId: beforeId, location: beforeLocation },
            output,
          });
          assert.deepEqual(module.observed(), { environmentReads: 0, imageReads: 0 });
          const changedId = beforeId !== undefined && afterId !== undefined && beforeId !== afterId;
          const changedLocation =
            (beforeLocation ?? "us-central1") !==
            (afterLocation ?? beforeLocation ?? "us-central1");
          const replacement = changedId || changedLocation;
          const expected = replacement
            ? { action: "replace", deleteFirst: false }
            : hasMain && codeHash !== undefined && codeHash !== "old"
              ? { action: "update" }
              : undefined;
          assert.deepEqual(await Effect.runPromise(program), expected);
          assert.deepEqual(module.observed(), {
            environmentReads: 1,
            imageReads: !replacement && hasMain ? 1 : 0,
          });
          assert.deepEqual(await Effect.runPromise(program), expected);
          assert.deepEqual(module.observed(), {
            environmentReads: 2,
            imageReads: !replacement && hasMain ? 2 : 0,
          });
        },
      ),
      { seed: corpus.seed, numRuns: corpus.runs },
    );
    const marker = { sentinel: true };
    module.configure(undefined);
    const throwing = module.probe({
      news: {
        get probeResolved() {
          throw marker;
        },
      },
      olds: undefined,
      output: undefined,
    });
    assert.deepEqual(module.observed(), { environmentReads: 0, imageReads: 0 });
    const failed = await Effect.runPromiseExit(throwing);
    assert.equal(failed._tag, "Failure");
    assert.equal(failed.cause.reasons[0].defect, marker);
    assert.deepEqual(module.observed(), { environmentReads: 0, imageReads: 0 });
    module.configure("different");
    const unresolved = module.probe({ news: "unresolved", olds: undefined, output: undefined });
    assert.equal(await Effect.runPromise(unresolved), undefined);
    assert.deepEqual(module.observed(), { environmentReads: 0, imageReads: 0 });
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});
