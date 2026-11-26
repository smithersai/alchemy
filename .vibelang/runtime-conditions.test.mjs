import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { createRequire, stripTypeScriptTypes } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, test } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(new URL("../scripts/package-build.ts", import.meta.url));
const testRequire = createRequire(
  new URL("../packages/alchemy-test/package.json", import.meta.url),
);
const fc = createRequire(testRequire.resolve("@effect/vitest"))("fast-check");
const temp = mkdtempSync(join(tmpdir(), "alchemy-runtime-conditions-"));
after(() => rmSync(temp, { recursive: true, force: true }));
symlinkSync(join(root, "scripts/node_modules"), join(temp, "node_modules"), "dir");
const source = readFileSync(
  process.env.ALCHEMY_PACKAGE_BUILD_SOURCE ?? join(root, "scripts/package-build.ts"),
  "utf8",
);
writeFileSync(
  join(temp, "builder.mjs"),
  stripTypeScriptTypes(source) + "\nexport { syncPublishExports };\n",
);
const { syncPublishExports } = await import(pathToFileURL(join(temp, "builder.mjs")).href);
const Effect = await import(pathToFileURL(require.resolve("effect/Effect")).href);
const NodeServices = await import(
  pathToFileURL(require.resolve("@effect/platform-node/NodeServices")).href
);
let n = 0;
async function publish(exports, runtimeConditions) {
  const dir = join(temp, "case" + n++);
  mkdirSync(join(dir, "src"), { recursive: true });
  writeFileSync(join(dir, "tsconfig.json"), JSON.stringify({ compilerOptions: { outDir: "lib" } }));
  writeFileSync(
    join(dir, "package.json"),
    JSON.stringify({ name: "condition-fixture", type: "module", exports }),
  );
  await Effect.runPromise(
    Effect.provide(syncPublishExports(dir, { runtimeConditions }), NodeServices.layer),
  );
  const map = JSON.parse(readFileSync(join(dir, "package.json"), "utf8")).publishConfig.exports;
  return { dir, map };
}

void test("a per-entry runtime target precedes default without changing Node or types", async () => {
  const { map } = await publish(
    { "./*": "./src/*.ts" },
    {
      "./Value": { bun: "./lib-bun/Value.js", worker: "./src/Value.ts" },
    },
  );
  assert.deepEqual(map["./Value"], {
    types: "./lib/Value.d.ts",
    bun: "./lib-bun/Value.js",
    worker: "./src/Value.ts",
    default: "./lib/Value.js",
  });
});
void test("runtime conditions cannot create a new module or bypass a null block", async () => {
  await assert.rejects(
    publish({ "./Allowed": "./src/Allowed.ts" }, { "./Hidden": { bun: "./src/Hidden.ts" } }),
    /existing module export/,
  );
  await assert.rejects(
    publish(
      { "./Secret/*": null, "./*": "./src/*.ts" },
      { "./Secret/Value": { bun: "./src/Secret/Value.ts" } },
    ),
    /existing module export/,
  );
});
void test("an explicit source condition survives wildcard compaction", async () => {
  const { map } = await publish(
    { "./Value": "./src/Value.vibe", "./*": "./src/*.vibe" },
    {
      "./Value": { bun: "./src/Value.ts" },
    },
  );
  assert.equal(map["./Value"].bun, "./src/Value.ts");
  assert.equal(map["./Value"].default, "./lib/Value.js");
});
void test("actual Node, Bun and worker resolution retain their selected targets", async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.constantFrom("Value", "space name", "quote'name", "café", "Nested/Value"),
      async (name) => {
        const { dir, map } = await publish(
          { "./*": "./src/*.ts" },
          {
            ["./" + name]: { bun: "./lib-bun/" + name + ".js", worker: "./src/" + name + ".ts" },
          },
        );
        for (const file of [
          "src/" + name + ".ts",
          "lib/" + name + ".js",
          "lib/" + name + ".d.ts",
          "lib-bun/" + name + ".js",
        ]) {
          const target = join(dir, file);
          mkdirSync(join(target, ".."), { recursive: true });
          writeFileSync(target, "export {};\n");
        }
        writeFileSync(
          join(dir, "package.json"),
          JSON.stringify({ name: "condition-fixture", type: "module", exports: map }),
        );
        const resolver = join(dir, "resolve.mjs");
        writeFileSync(
          resolver,
          'console.log(import.meta.resolve("condition-fixture/"+process.argv[2]));',
        );
        for (const { args, expected } of [
          { args: ["node"], expected: "lib/" + name + ".js" },
          { args: ["node", "--conditions=types"], expected: "lib/" + name + ".d.ts" },
          { args: ["node", "--conditions=worker"], expected: "src/" + name + ".ts" },
          { args: ["bun"], expected: "lib-bun/" + name + ".js" },
        ]) {
          const result = spawnSync(args[0], [...args.slice(1), resolver, name], {
            cwd: dir,
            encoding: "utf8",
          });
          assert.equal(result.status, 0, result.stderr);
          assert.equal(result.stdout.trim(), pathToFileURL(join(dir, expected)).href);
        }
      },
    ),
    { seed: 561118, numRuns: 40 },
  );
});
