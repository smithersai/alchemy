import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import * as Provider from "../../packages/alchemy/src/Provider.ts";
const require = createRequire(new URL("../../packages/acme/package.json", import.meta.url));
const scriptRequire = createRequire(new URL("../../scripts/package.json", import.meta.url));
const fc = scriptRequire("fast-check");
const Effect = await import(pathToFileURL(require.resolve("effect/Effect")).href);
const Cause = await import(pathToFileURL(require.resolve("effect/Cause")).href);
const Exit = await import(pathToFileURL(require.resolve("effect/Exit")).href);
const corpus = JSON.parse(
  readFileSync(new URL("./alchemy-acme-foreign-guard.json", import.meta.url), "utf8"),
);
const [name, mode] = process.argv.slice(2);
assert.ok(name === "Account" || name === "Certificate");
const module =
  name === "Account"
    ? await import("../../packages/acme/src/Account.vibe")
    : await import("../../packages/acme/src/Certificate.vibe");
const provider = await Effect.runPromise(
  Provider.findProvider(module[name]).pipe(Effect.provide(module[name + "Provider"]())),
);
const output =
  name === "Account" ? { directoryUrl: "old", keyAlgorithm: "ES256" } : { accountUrl: "old" };
const input = (news, present) => ({
  id: "resource",
  fqn: "resource",
  instanceId: "instance",
  news,
  olds: {},
  output: present ? output : undefined,
  oldBindings: [],
  newBindings: [],
});
async function check({ state, present, replay = false, label = "input" }) {
  const marker = new Error("ACME input getter");
  let reads = 0;
  const base =
    name === "Account" ? { ca: { directoryUrl: "new" } } : { account: { accountUrl: "new" } };
  Object.defineProperty(base, "probe", {
    enumerable: true,
    get() {
      reads++;
      if (state === "getter-throws") throw marker;
      return state === "unresolved" ? Effect.succeed(label) : label;
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
    assert.equal(reads, n, "props are inspected before the output guard on every run");
    if (state === "getter-throws" || state === "proxy-throws") {
      assert.ok(Exit.isFailure(result));
      assert.equal(Cause.squash(result.cause), marker);
    } else {
      assert.ok(Exit.isSuccess(result));
      assert.deepEqual(
        result.value,
        state === "unresolved" || !present ? undefined : { action: "replace" },
      );
    }
  }
}
let cases = 0;
if (mode === "order") {
  for (const state of corpus.states) {
    await check({ state, present: false, replay: true });
    cases++;
  }
  assert.equal(await Effect.runPromise(provider.diff(input(undefined, true))), undefined);
  cases++;
} else if (mode === "primitive") {
  for (const news of [false, 0, "", null]) {
    assert.equal(await Effect.runPromise(provider.diff(input(news, false))), undefined);
    const result = await Effect.runPromiseExit(provider.diff(input(news, true)));
    assert.ok(Exit.isFailure(result));
    assert.ok(Cause.squash(result.cause) instanceof TypeError);
    cases++;
  }
} else if (mode === "property") {
  await fc.assert(
    fc.asyncProperty(
      fc.record({
        state: fc.constantFrom(...corpus.states),
        present: fc.boolean(),
        replay: fc.boolean(),
        label: fc.string({ maxLength: 48 }),
      }),
      async (value) => {
        await check(value);
        cases++;
      },
    ),
    { seed: corpus.seed, numRuns: corpus.runs },
  );
} else throw new Error("Unknown probe mode: " + mode);
console.log(JSON.stringify({ name, mode, cases, passed: true }));
