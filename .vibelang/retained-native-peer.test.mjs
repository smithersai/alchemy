import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(new URL("../packages/alchemy-test/package.json", import.meta.url));
const fc = createRequire(require.resolve("@effect/vitest"))("fast-check");
const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-retained-native-peer.json", import.meta.url), "utf8"),
);
const compiler = join(root, "node_modules/.bin/tsc");
function put(directory, file, text) {
  const destination = join(directory, file);
  mkdirSync(dirname(destination), { recursive: true });
  writeFileSync(destination, text);
}
function check(directory, files) {
  put(
    directory,
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
        types: [],
      },
      files,
    }),
  );
  return spawnSync(compiler, ["-p", join(directory, "tsconfig.json"), "--pretty", "false"], {
    encoding: "utf8",
  });
}
function fixture(directory, prefix, name, route, form) {
  const peer = prefix + "/peers/" + name;
  if (form === "ts") put(directory, peer + ".ts", "export const value = 1;\n");
  else {
    put(directory, peer + ".vibe", "export const value = 1\n");
    put(directory, peer + ".d.vibe.ts", "export declare const value: 1;\n");
  }
  const file = prefix + "/source/Consumer.ts";
  put(
    directory,
    file,
    'import { value } from "../peers/' +
      name +
      "." +
      route +
      '";\nexport const result: 1 = value;\n',
  );
  return file;
}
for (const pattern of corpus.patterns) {
  void test(
    pattern.file + " resolves its retained import through the peer's current source form",
    () => {
      const directory = mkdtempSync(join(tmpdir(), "alchemy-retained-peer-"));
      try {
        const source = readFileSync(join(root, pattern.file), "utf8");
        const route = [...source.matchAll(/from\s+["']([^"']+)["']/g)]
          .map((match) => match[1])
          .find((value) => value.startsWith(pattern.peer + "."));
        assert.ok(route, "the original peer import is present");
        const file = fixture(
          directory,
          "actual",
          "Peer",
          route.slice(route.lastIndexOf(".") + 1),
          "vibe",
        );
        const result = check(directory, [file]);
        assert.equal(result.status, 0, result.stdout + result.stderr);
      } finally {
        rmSync(directory, { recursive: true, force: true });
      }
    },
  );
}
void test("literal TypeScript imports never silently fall back to native peers", () => {
  const directory = mkdtempSync(join(tmpdir(), "alchemy-retained-peer-controls-"));
  try {
    const stale = check(directory, [fixture(directory, "stale", "Peer", "ts", "vibe")]);
    assert.notEqual(stale.status, 0, stale.stdout + stale.stderr);
    assert.match(stale.stdout + stale.stderr, /TS2307/);
    const samples = fc.sample(
      fc.tuple(fc.stringMatching(/^[A-Za-z][A-Za-z0-9]{0,16}$/), fc.constantFrom("ts", "vibe")),
      { seed: corpus.seed, numRuns: 128 },
    );
    const files = samples.map(([name, form], index) =>
      fixture(directory, "sample" + index, name, form, form),
    );
    const result = check(directory, files);
    assert.equal(result.status, 0, result.stdout + result.stderr);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
