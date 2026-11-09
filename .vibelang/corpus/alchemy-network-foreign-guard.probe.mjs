import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import * as Provider from "../../packages/alchemy/src/Provider.ts";
import { Docker } from "../../packages/docker/src/Docker.ts";
import { Network, NetworkProvider } from "../../packages/docker/src/Network.vibe";
const scriptRequire = createRequire(new URL("../../scripts/package.json", import.meta.url));
const fc = scriptRequire("fast-check");
const require = createRequire(new URL("../../packages/docker/package.json", import.meta.url));
const Cause = await import(pathToFileURL(require.resolve("effect/Cause")).href);
const Effect = await import(pathToFileURL(require.resolve("effect/Effect")).href);
const Exit = await import(pathToFileURL(require.resolve("effect/Exit")).href);
const corpus = JSON.parse(
  readFileSync(new URL("./alchemy-network-foreign-guard.json", import.meta.url), "utf8"),
);
const provider = await Effect.runPromise(
  Provider.findProvider(Network).pipe(
    Effect.provide(NetworkProvider()),
    Effect.provideService(Docker, {}),
  ),
);
const output = {
  id: "network",
  name: "network",
  driver: "bridge",
  enableIPv6: false,
  labels: {},
  createdAt: 0,
};
const input = (news, present) => ({
  id: "network",
  fqn: "network",
  instanceId: "instance",
  olds: { context: "old" },
  news,
  output: present ? output : undefined,
  oldBindings: [],
  newBindings: [],
});
async function check({ state, present, name = "network", replay = false }) {
  const marker = new Error("network input getter");
  let reads = 0;
  const base = { name, context: "new" };
  Object.defineProperty(base, "labels", {
    enumerable: true,
    get() {
      reads++;
      if (state === "getter-throws") throw marker;
      return { VALUE: state === "unresolved" ? Effect.succeed("later") : "now" };
    },
  });
  const news =
    state === "proxy-throws"
      ? new Proxy(base, {
          ownKeys() {
            reads++;
            throw marker;
          },
        })
      : base;
  const program = provider.diff(input(news, present));
  assert.equal(reads, 0, "constructing the diff remains cold");
  for (let n = 1; n <= (replay ? 2 : 1); n++) {
    const result = await Effect.runPromiseExit(program);
    assert.equal(reads, n, "the predicate precedes the output guard on every run");
    if (state === "getter-throws" || state === "proxy-throws") {
      assert.ok(Exit.isFailure(result));
      assert.equal(Cause.squash(result.cause), marker);
    } else {
      assert.ok(Exit.isSuccess(result));
      assert.deepEqual(
        result.value,
        state === "unresolved" || !present ? undefined : { action: "replace", deleteFirst: true },
      );
    }
  }
}
const mode = process.argv[2];
let cases = 0;
if (mode === "order") {
  for (const state of ["getter-throws", "proxy-throws", "resolved"]) {
    await check({ state, present: false });
    cases++;
  }
} else if (mode === "states") {
  await check({ state: "unresolved", present: true, replay: true });
  await check({ state: "resolved", present: true, replay: true });
  cases = 2;
} else if (mode === "primitive") {
  for (const news of [false, 0, "", null, undefined]) {
    assert.deepEqual(await Effect.runPromise(provider.diff(input(news, true))), {
      action: "replace",
      deleteFirst: true,
    });
    cases++;
  }
} else if (mode === "property") {
  await fc.assert(
    fc.asyncProperty(
      fc.record({
        state: fc.constantFrom(...corpus.states),
        present: fc.boolean(),
        name: fc.string({ maxLength: 40 }),
        replay: fc.boolean(),
      }),
      async (value) => {
        await check(value);
        cases++;
      },
    ),
    { seed: corpus.seed, numRuns: corpus.runs },
  );
} else throw new Error("Unknown guard probe mode: " + mode);
console.log(JSON.stringify({ mode, cases, passed: true }));
