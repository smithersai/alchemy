import { mock } from "bun:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
const require = createRequire(new URL("../../packages/docker/package.json", import.meta.url));
const fc = createRequire(new URL("../../scripts/package.json", import.meta.url))("fast-check");
const Effect = await import(pathToFileURL(require.resolve("effect/Effect")).href);
const Context = await import(pathToFileURL(require.resolve("effect/Context")).href);
const Exit = await import(pathToFileURL(require.resolve("effect/Exit")).href);
const Cause = await import(pathToFileURL(require.resolve("effect/Cause")).href);
const corpus = JSON.parse(
  readFileSync(new URL("./alchemy-service-image-factory.json", import.meta.url), "utf8"),
);
const mode = process.argv[2];
assert.ok(corpus.modes.includes(mode));
const Docker = Context.Service()("ServiceImageFactoryTest/Docker");
const AlchemyContext = Context.Service()("ServiceImageFactoryTest/AlchemyContext");
let current;
const factory = (content) => {
  current.factory++;
  current.order.push("factory");
  assert.equal(typeof content, "function");
  if (mode !== "normal") throw current.marker;
  assert.ok(content("./main.ts").includes("import { " + current.handler + " as entrypoint }"));
  return current.plugin;
};
const bundle = {
  virtualEntryPlugin: Effect.succeed(factory),
  BUN_CONDITION_NAMES: [],
  build: (input) =>
    Effect.sync(() => {
      current.bundles++;
      current.order.push("bundle");
      assert.equal(input.input, "resolved-main");
      assert.equal(input.plugins[0], current.existingPlugin);
      assert.equal(input.plugins[1], mode === "external" ? undefined : current.plugin);
      return {
        files: [{ path: "index.mjs", content: "export const value = 1;" }],
        hash: "bundle-hash",
      };
    }),
};
const roots = {
  resolveMainPath: () =>
    Effect.sync(() => {
      current.order.push("resolve");
      return "resolved-main";
    }),
  findCwdForBundle: () =>
    Effect.sync(() => {
      current.order.push("cwd");
      return "unit-cwd";
    }),
  getStableContextDir: () => Effect.die("hash must not materialize a Docker build context"),
};
const hash = {
  sha256Object: (value) =>
    Effect.sync(() => {
      current.order.push("hash");
      assert.equal(value.bundleHash, "bundle-hash");
      assert.ok(value.dockerfile.includes("FROM unit:image"));
      return "0123456789abcdef".repeat(4);
    }),
};
for (const [name, source, value] of [
  ["alchemy/AlchemyContext", "../../packages/alchemy/src/AlchemyContext.ts", { AlchemyContext }],
  ["alchemy/Bundle/Bundle", "../../packages/alchemy/src/Bundle/Bundle.ts", bundle],
  ["alchemy/Bundle/TempRoot", "../../packages/alchemy/src/Bundle/TempRoot.ts", roots],
  ["alchemy/Util/sha256", "../../packages/alchemy/src/Util/sha256.ts", hash],
]) {
  mock.module(name, () => value);
  mock.module(fileURLToPath(new URL(source, import.meta.url)), () => value);
}
mock.module(fileURLToPath(new URL("../../packages/docker/src/Docker.ts", import.meta.url)), () => ({
  Docker,
}));
const { makeServiceImage } = await import("../../packages/docker/src/ServiceImage.vibe");
const service = await Effect.runPromise(
  makeServiceImage.pipe(
    Effect.provideService(Docker, {}),
    Effect.provideService(AlchemyContext, { dotAlchemy: "unit-alchemy" }),
  ),
);
const rows = fc.sample(
  fc.record({
    handler: fc.constantFrom("default", "handler", "main"),
    port: fc.integer({ min: 1, max: 65535 }),
  }),
  { seed: corpus.seed, numRuns: corpus.runs },
);
for (const row of rows) {
  current = {
    ...row,
    marker: new Error("factory failure"),
    factory: 0,
    bundles: 0,
    order: [],
    plugin: { name: "unit-plugin" },
    existingPlugin: { name: "existing-plugin" },
  };
  const program = service.hash({
    source: {
      main: "source-main",
      image: "unit:image",
      handler: row.handler,
      port: row.port,
      build: { input: { plugins: current.existingPlugin } },
    },
    isExternal: mode === "external",
  });
  assert.deepEqual(current.order, [], "constructing a hash must stay cold");
  for (let replay = 1; replay <= 2; replay++) {
    const result = await Effect.runPromiseExit(program);
    if (mode === "factory-throws") {
      assert.ok(Exit.isFailure(result));
      assert.equal(Cause.squash(result.cause), current.marker);
      assert.equal(current.bundles, 0, "a failed factory prevents bundling");
      assert.equal(current.factory, replay);
      assert.deepEqual(current.order.slice(-3), ["resolve", "cwd", "factory"]);
    } else {
      assert.ok(Exit.isSuccess(result));
      assert.equal(result.value, "0123456789abcdef");
      assert.equal(current.bundles, replay);
      assert.equal(current.factory, mode === "external" ? 0 : replay);
      assert.deepEqual(
        current.order.slice(mode === "external" ? -4 : -5),
        mode === "external"
          ? ["resolve", "cwd", "bundle", "hash"]
          : ["resolve", "cwd", "factory", "bundle", "hash"],
      );
    }
  }
}
console.log(
  JSON.stringify({
    mode,
    cases: rows.length,
    replays: rows.length * 2,
    noDockerOrNetwork: true,
    passed: true,
  }),
);
