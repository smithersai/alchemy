import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { isAbsolute, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const project = join(root, "packages/frontend-frameworks");
const require = createRequire(new URL("../packages/alchemy-test/package.json", import.meta.url));
const fc = createRequire(require.resolve("@effect/vitest"))("fast-check");
const frontend = createRequire(
  new URL("../packages/frontend-frameworks/package.json", import.meta.url),
);
const vite = await import(pathToFileURL(frontend.resolve("vite")).href);
const build = vite.build ?? vite.default?.build;
assert.equal(typeof build, "function", "Vite public build API is available");
const corpus = JSON.parse(
  await readFile(new URL("./corpus/alchemy-redis-node-bundle.json", import.meta.url), "utf8"),
);

async function bundle(modules) {
  await mkdir(join(project, ".cache"), { recursive: true });
  const dir = await mkdtemp(join(project, ".cache", "redis-node-"));
  try {
    const entry = join(dir, "entry.ts");
    await writeFile(
      entry,
      modules
        .map(
          (name, i) =>
            "export * as Redis" + i + " from " + JSON.stringify("@alchemy.run/redis/" + name) + ";",
        )
        .join("\n"),
    );
    const result = await build({
      root: project,
      configFile: false,
      logLevel: "silent",
      resolve: { conditions: corpus.conditions },
      ssr: {
        noExternal: [/^@alchemy\.run\/redis(?:\/|$)/],
        resolve: { conditions: corpus.conditions },
      },
      build: {
        ssr: true,
        write: false,
        minify: false,
        rollupOptions: {
          input: entry,
          external: (id) =>
            !id.startsWith("\0") &&
            !isAbsolute(id) &&
            !id.startsWith(".") &&
            id !== "@alchemy.run/redis" &&
            !id.startsWith("@alchemy.run/redis/"),
        },
      },
    });
    const chunks = (Array.isArray(result) ? result : [result])
      .flatMap((result) => result.output ?? [])
      .filter((chunk) => chunk.type === "chunk");
    assert.ok(chunks.length > 0);
    const exports = new Set(chunks.flatMap((chunk) => chunk.exports));
    for (let i = 0; i < modules.length; i++)
      assert.ok(exports.has("Redis" + i), "requested namespace is retained");
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

void test("Redis public entries bundle under ordinary Node SSR conditions", async () => {
  await bundle(corpus.modules);
});
void test("generated Redis import graphs retain every requested namespace without a native plugin", async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.array(fc.constantFrom(...corpus.modules), { minLength: 1, maxLength: 6 }),
      async (modules) => bundle(modules),
    ),
    { seed: corpus.seed, numRuns: 64 },
  );
});
