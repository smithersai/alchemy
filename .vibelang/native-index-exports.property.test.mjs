import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { createRequire, stripTypeScriptTypes } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { after, test } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(new URL("../scripts/package-build.ts", import.meta.url));
const testRequire = createRequire(
  new URL("../packages/alchemy-test/package.json", import.meta.url),
);
const fc = createRequire(testRequire.resolve("@effect/vitest"))("fast-check");
const temporary = mkdtempSync(join(tmpdir(), "alchemy-raw-export-stability-"));
after(() => rmSync(temporary, { recursive: true, force: true }));
symlinkSync(join(root, "scripts/node_modules"), join(temporary, "node_modules"), "dir");
const source = stripTypeScriptTypes(
  readFileSync(
    process.env.ALCHEMY_PACKAGE_BUILD_SOURCE ?? join(root, "scripts/package-build.ts"),
    "utf8",
  ),
);
writeFileSync(join(temporary, "package-build.mjs"), source + "\nexport { syncPublishExports };\n");
const { syncPublishExports } = await import(
  pathToFileURL(join(temporary, "package-build.mjs")).href
);
const Effect = await import(pathToFileURL(require.resolve("effect/Effect")).href);
const NodeServices = await import(
  pathToFileURL(require.resolve("@effect/platform-node/NodeServices")).href
);

const corpus = JSON.parse(
  readFileSync(new URL("./corpus/alchemy-native-index-exports.json", import.meta.url), "utf8"),
);
let serial = 0;
function put(directory, file, source) {
  const path = join(directory, file);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, source);
}
async function fixture(rootExtension, directories, dual = false) {
  const directory = join(temporary, "native-index-" + serial++);
  put(directory, "src/index." + rootExtension, "export const root = 1;\n");
  if (dual) put(directory, "src/index.ts", "export const root = 1;\n");
  for (const name of directories) {
    put(directory, "src/" + name + ".vibe", "export const shadow = 2\n");
    put(directory, "src/" + name + "/index.vibe", "export const value = 1\n");
    if (dual) put(directory, "src/" + name + "/index.ts", "export const value = 1;\n");
  }
  put(directory, "src/Value.vibe", "export const value = 1\n");
  put(directory, "src/Bootstrap.vibe", "export const bootstrap = 1\n");
  put(directory, "tsconfig.json", JSON.stringify({ compilerOptions: { outDir: "./lib" } }));
  put(
    directory,
    "package.json",
    JSON.stringify({
      name: "native-index-fixture",
      exports: { "./Alias": "./src/Value.vibe", "./Hidden/*": null },
    }),
  );
  const sync = () =>
    Effect.runPromise(
      Effect.provide(
        syncPublishExports(directory, { generate: true, sourceOnly: ["./Bootstrap"] }),
        NodeServices.layer,
      ),
    );
  await sync();
  const first = readFileSync(join(directory, "package.json"), "utf8");
  const manifest = JSON.parse(first);
  const rootSuffix = dual ? "ts" : rootExtension;
  assert.equal(manifest.exports["."], "./src/index." + rootSuffix);
  assert.deepEqual(manifest.publishConfig.exports["."], {
    types: "./lib/index.d.ts",
    default: "./lib/index.js",
  });
  for (const name of directories) {
    const extension = dual ? "ts" : "vibe";
    assert.equal(manifest.exports["./" + name], "./src/" + name + "/index." + extension);
    assert.deepEqual(manifest.publishConfig.exports["./" + name], {
      types: "./lib/" + name + "/index.d.ts",
      default: "./lib/" + name + "/index.js",
    });
  }
  assert.equal(manifest.exports["./Alias"], "./src/Value.vibe");
  assert.equal(manifest.exports["./Bootstrap"], "./src/Bootstrap.vibe");
  const bootstrap =
    manifest.publishConfig.exports["./Bootstrap"] ??
    Object.fromEntries(
      Object.entries(manifest.publishConfig.exports["./*"]).map(([condition, target]) => [
        condition,
        target.replace("*", "Bootstrap"),
      ]),
    );
  assert.deepEqual(bootstrap, {
    types: "./lib/Bootstrap.d.ts",
    default: "./lib/Bootstrap.js",
  });
  assert.equal(manifest.exports["./Hidden/*"], null);
  await sync();
  assert.equal(readFileSync(join(directory, "package.json"), "utf8"), first);
  return { directory, manifest };
}
void test("native package and directory indexes keep their public subpaths", async () => {
  await fixture("vibe", corpus.directories);
});
void test("TypeScript entry shims take precedence when a native index also exists", async () => {
  await fixture("vibe", ["Alchemist"], true);
});
void test("native index export maps and aliases reach a byte-stable fixed point", async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.constantFrom("ts", "vibe"),
      fc.uniqueArray(fc.constantFrom(...corpus.directories), { minLength: 1 }),
      fc.boolean(),
      async (extension, directories, dual) => {
        await fixture(extension, directories, dual);
      },
    ),
    { seed: corpus.seed, numRuns: 128 },
  );
});

void test("published native bootstrap resolves to built code and declarations", async () => {
  const { directory, manifest } = await fixture("vibe", ["Alchemist"]);
  put(directory, "lib/Bootstrap.js", "export const bootstrap = 1;\n");
  put(directory, "lib/Bootstrap.d.ts", "export declare const bootstrap = 1;\n");
  put(
    directory,
    "package.json",
    JSON.stringify({ ...manifest, exports: manifest.publishConfig.exports }),
  );
  put(
    directory,
    "resolve.mjs",
    'console.log(import.meta.resolve("native-index-fixture/Bootstrap"));',
  );
  for (const { conditions, suffix } of [
    { conditions: [], suffix: ".js" },
    { conditions: ["--conditions=types"], suffix: ".d.ts" },
  ]) {
    const child = spawnSync(process.execPath, [...conditions, join(directory, "resolve.mjs")], {
      encoding: "utf8",
    });
    assert.equal(child.status, 0, child.stderr);
    assert.equal(
      child.stdout.trim(),
      pathToFileURL(join(directory, "lib/Bootstrap" + suffix)).href,
    );
  }
});
