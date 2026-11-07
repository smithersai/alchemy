import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(new URL("../packages/alchemy-test/package.json", import.meta.url));
const fc = createRequire(require.resolve("@effect/vitest"))("fast-check");
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-sidecar-exports.json", import.meta.url), "utf8"),
);
const compiler = join(root, "node_modules/.bin/tsc");

function put(dir, file, value) {
  const target = join(dir, file);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, value);
}
function project(dir, files) {
  put(
    dir,
    "tsconfig.json",
    JSON.stringify({
      compilerOptions: {
        target: "ES2022",
        module: "ESNext",
        moduleResolution: "Bundler",
        allowArbitraryExtensions: true,
        allowImportingTsExtensions: true,
        strict: true,
        noEmit: true,
        skipLibCheck: false,
        types: [],
      },
      files,
    }),
  );
  return spawnSync(compiler, ["-p", join(dir, "tsconfig.json"), "--pretty", "false"], {
    encoding: "utf8",
  });
}
function fixture(dir, prefix, peer, declaration, sourceForm = "vibe") {
  put(dir, prefix + "/Provider.vibe", "");
  put(dir, prefix + "/Provider.d.vibe.ts", declaration + "\n");
  if (sourceForm === "ts")
    put(
      dir,
      prefix + "/" + peer + ".ts",
      "export class ServiceRegionNotApplied extends Error {}\n",
    );
  else {
    put(dir, prefix + "/" + peer + ".vibe", "");
    put(
      dir,
      prefix + "/" + peer + ".d.vibe.ts",
      "export declare class ServiceRegionNotApplied extends Error {}\n",
    );
  }
  put(
    dir,
    prefix + "/Consumer.ts",
    'import type { ServiceRegionNotApplied } from "./Provider.vibe";\nexport type Failure = ServiceRegionNotApplied;\n',
  );
  return prefix + "/Consumer.ts";
}
test("committed native re-export metadata resolves in the stock compiler", () => {
  const dir = mkdtempSync(join(tmpdir(), "alchemy-sidecar-export-"));
  try {
    const text = readFileSync(join(root, corpus.sidecar), "utf8");
    const declaration = text
      .split("\n")
      .find((line) => /^export\s*\{\s*ServiceRegionNotApplied\s*\}\s*from\s*["']/.test(line));
    assert.ok(declaration, "the original public re-export is present");
    const sourceForm = existsSync(join(root, dirname(corpus.sidecar), "ServiceRegion.ts"))
      ? "ts"
      : "vibe";
    const entry = fixture(dir, "actual", "ServiceRegion", declaration, sourceForm);
    const result = project(dir, [entry]);
    assert.equal(result.status, 0, result.stdout + result.stderr);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
test("native sidecar resolution distinguishes renamed and preserved TypeScript targets", () => {
  const dir = mkdtempSync(join(tmpdir(), "alchemy-sidecar-neighborhood-"));
  try {
    const names = fc.sample(
      fc.tuple(fc.constantFrom("Region", "Address", "résumé", "quoted name"), fc.nat(9999)),
      { seed: corpus.seed, numRuns: 24 },
    );
    const good = [],
      bad = [];
    for (const [i, [stem, number]] of names.entries()) {
      const peer = stem + number;
      good.push(
        fixture(
          dir,
          "native" + i,
          peer,
          "export { ServiceRegionNotApplied } from " + JSON.stringify("./" + peer + ".vibe") + ";",
        ),
      );
      bad.push(
        fixture(
          dir,
          "stale" + i,
          peer,
          "export { ServiceRegionNotApplied } from " + JSON.stringify("./" + peer + ".ts") + ";",
        ),
      );
      const held = "held" + i;
      put(dir, held + "/Provider.vibe", "");
      put(
        dir,
        held + "/Provider.d.vibe.ts",
        "export { ServiceRegionNotApplied } from " + JSON.stringify("./" + peer + ".ts") + ";\n",
      );
      put(
        dir,
        held + "/" + peer + ".ts",
        "export class ServiceRegionNotApplied extends Error {}\n",
      );
      put(
        dir,
        held + "/Consumer.ts",
        'import type { ServiceRegionNotApplied } from "./Provider.vibe";\nexport type Failure = ServiceRegionNotApplied;\n',
      );
      good.push(held + "/Consumer.ts");
    }
    const positive = project(dir, good);
    assert.equal(positive.status, 0, positive.stdout + positive.stderr);
    const negative = project(dir, bad);
    assert.notEqual(negative.status, 0);
    assert.equal(
      (negative.stdout.match(/error TS2307:/g) ?? []).length,
      names.length,
      negative.stdout + negative.stderr,
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
