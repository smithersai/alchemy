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
  readFileSync(new URL("./corpus/alchemy-neon-sidecar-import.json", import.meta.url)),
);
const compiler = join(root, "node_modules/.bin/tsc");

function put(dir, file, text) {
  const target = join(dir, file);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, text);
}
function check(dir, files) {
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
function fixture(dir, name, peer, route, form) {
  put(dir, name + "/CredentialScope.vibe", "");
  put(
    dir,
    name + "/CredentialScope.d.vibe.ts",
    "import type { AIGatewayProps } from " +
      JSON.stringify("./" + peer + "." + route) +
      ';\nexport type CredentialScope = Pick<AIGatewayProps, "branch" | "project">;\n',
  );
  const declaration = "export interface AIGatewayProps { branch?: string; project?: string }\n";
  if (form === "ts") put(dir, name + "/" + peer + ".ts", declaration);
  else {
    put(dir, name + "/" + peer + ".vibe", "");
    put(dir, name + "/" + peer + ".d.vibe.ts", declaration);
  }
  put(
    dir,
    name + "/Consumer.ts",
    'import type { CredentialScope } from "./CredentialScope.vibe";\nexport const value: CredentialScope = { branch: "main" };\n',
  );
  return name + "/Consumer.ts";
}

void test("committed Neon type imports resolve the peer's current source form", () => {
  const dir = mkdtempSync(join(tmpdir(), "alchemy-neon-sidecar-"));
  try {
    const metadata = readFileSync(join(root, corpus.sidecar), "utf8");
    const match = metadata.match(
      /import type \{ AIGatewayProps \} from "(\.\/AIGateway\.(ts|vibe))"/,
    );
    assert.ok(match, "the generated public type import is present");
    const source = readFileSync(join(root, corpus.source), "utf8");
    const form = existsSync(join(root, dirname(corpus.source), "AIGateway.ts")) ? "ts" : "vibe";
    const result = check(dir, [fixture(dir, "actual", "AIGateway", match[2], form)]);
    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.ok(
      source.includes('from "' + match[1] + '"'),
      "metadata follows the authored peer route",
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

void test("stock resolution distinguishes imported native and preserved TypeScript peers", () => {
  const dir = mkdtempSync(join(tmpdir(), "alchemy-neon-import-neighborhood-"));
  try {
    const names = fc.sample(
      fc.tuple(fc.constantFrom("Gateway", "Scope", "résumé", "quoted peer"), fc.nat(9999)),
      { seed: corpus.seed, numRuns: 32 },
    );
    const good = [],
      bad = [];
    for (const [index, [stem, number]] of names.entries()) {
      const peer = stem + number;
      for (const form of ["ts", "vibe"]) {
        good.push(fixture(dir, "good-" + form + index, peer, form, form));
        bad.push(fixture(dir, "stale-" + form + index, peer, form === "ts" ? "vibe" : "ts", form));
      }
    }
    const positive = check(dir, good);
    assert.equal(positive.status, 0, positive.stdout + positive.stderr);
    const negative = check(dir, bad);
    assert.notEqual(negative.status, 0);
    assert.equal(
      (negative.stdout.match(/error TS2307:/g) ?? []).length,
      bad.length,
      negative.stdout + negative.stderr,
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
