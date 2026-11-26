import assert from "node:assert/strict";
import { readFileSync, mkdtempSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { AlchemyContext } from "alchemy/AlchemyContext";
import * as Provider from "alchemy/Provider";
import { Stack } from "alchemy/Stack";
const require = createRequire(new URL("../../packages/fly/package.json", import.meta.url));
const coreRequire = createRequire(new URL("../../packages/alchemy/package.json", import.meta.url));
const fc = createRequire(new URL("../../scripts/package.json", import.meta.url))("fast-check");
const Effect = await import(pathToFileURL(require.resolve("effect/Effect")).href);
const Cause = await import(pathToFileURL(require.resolve("effect/Cause")).href);
const Exit = await import(pathToFileURL(require.resolve("effect/Exit")).href);
const [name, mode] = process.argv.slice(2);
const loads = {
  App: () => import("../../packages/fly/src/App.vibe"),
  Certificate: () => import("../../packages/fly/src/Certificate.vibe"),
  IpAssignment: () => import("../../packages/fly/src/IpAssignment.vibe"),
  Machine: () => import("../../packages/fly/src/Machine.vibe"),
  Redis: () => import("../../packages/fly/src/Redis.vibe"),
  Service: () => import("../../packages/fly/src/Service.vibe"),
  Sprite: () => import("../../packages/fly/src/Sprite.vibe"),
  VolumeSnapshot: () => import("../../packages/fly/src/VolumeSnapshot.vibe"),
};
assert.ok(Object.hasOwn(loads, name));
const module = await loads[name]();
let program = Provider.findProvider(module[name]).pipe(Effect.provide(module[name + "Provider"]()));
let scratch;
if (name === "Service" || name === "Sprite") {
  scratch = mkdtempSync(join(tmpdir(), "fly-guard-"));
  const NodeServices = await import(
    pathToFileURL(coreRequire.resolve("@effect/platform-node/NodeServices")).href
  );
  program = program.pipe(
    Effect.provideService(Stack, { name: "guard", stage: "test" }),
    Effect.provideService(AlchemyContext, { dotAlchemy: scratch, dev: false, adopt: false }),
    Effect.provide(NodeServices.layer),
  );
}
const provider = await Effect.runPromise(program);
const corpus = JSON.parse(
  readFileSync(new URL("./alchemy-fly-lifecycle-guards.json", import.meta.url), "utf8"),
);
function output(owns = true) {
  return {
    appName: "old",
    name: "old",
    baseName: "old",
    orgSlug: "org",
    hostname: "old.example",
    source: "managed",
    type: "v6",
    volumeId: "old",
    primaryRegion: "ord",
    region: "ord",
    ownsApp: owns,
    urlAuth: "http",
    code: { hash: "old" },
    rolloutPending: false,
  };
}
function input(news, present, owns = true) {
  return {
    id: "resource",
    fqn: "resource",
    instanceId: "instance",
    news,
    olds: {},
    output: present ? output(owns) : undefined,
    newBindings: [],
    oldBindings: [],
  };
}
async function check({ state, present, replay = false, owns = true, label = "value" }) {
  const marker = new Error("Fly predicate getter");
  let reads = 0;
  const inspect = {};
  Object.defineProperty(inspect, "probe", {
    enumerable: true,
    get() {
      reads++;
      if (state === "getter-throws") throw marker;
      return state === "unresolved" ? Effect.succeed(label) : label;
    },
  });
  const guarded =
    state === "proxy-throws"
      ? new Proxy(inspect, {
          ownKeys() {
            reads++;
            throw marker;
          },
        })
      : inspect;
  let news;
  if (name === "Machine") {
    Object.assign(inspect, { name: "main", image: "image:latest" });
    news = { app: { appName: "new" }, containers: [guarded], name: "new" };
  } else {
    Object.assign(inspect, { name: "new" });
    if (name === "Service") {
      if (!owns) inspect.app = { appName: "new" };
    } else if (name === "Sprite")
      inspect.main = state === "unresolved" ? Effect.succeed("unused-entry.ts") : "unused-entry.ts";
    else
      Object.assign(inspect, {
        app: { appName: "new" },
        hostname: "new.example",
        kind: "managed",
        type: "v4",
        volumeId: "new",
        orgSlug: "org",
      });
    news = guarded;
  }
  const effect = provider.diff(input(news, present, owns));
  assert.equal(reads, 0);
  const gated = (name === "Service" || name === "Sprite") && !present;
  const throws = state === "getter-throws" || state === "proxy-throws";
  const perRun = gated
    ? 0
    : throws
      ? 1
      : name === "Machine"
        ? state === "resolved"
          ? 3
          : 2
        : name === "App" && !present
          ? 2
          : 1;
  for (let n = 1; n <= (replay ? 2 : 1); n++) {
    const result = await Effect.runPromiseExit(effect);
    assert.equal(reads, n * perRun, name + " retains predicate order and replay");
    if (throws && !gated) {
      assert.ok(Exit.isFailure(result));
      assert.equal(Cause.squash(result.cause), marker);
    } else {
      assert.ok(
        Exit.isSuccess(result),
        Exit.isFailure(result) ? String(Cause.squash(result.cause)) : "",
      );
      const replace = present && state === "resolved";
      const expected = replace
        ? ["App", "Certificate", "Machine", "Redis", "Service"].includes(name)
          ? { action: "replace", deleteFirst: false }
          : { action: "replace" }
        : undefined;
      assert.deepEqual(result.value, expected);
    }
  }
}
async function precreate() {
  assert.equal(name, "Service");
  let cases = 0;
  for (const state of ["shared", "unresolved", "getter-throws", "ready"]) {
    const marker = new Error("precreate property getter");
    let names = 0;
    let networks = 0;
    const news = {};
    if (state === "shared") news.app = { appName: "shared" };
    Object.defineProperty(news, "name", {
      enumerable: true,
      get() {
        names++;
        if (state === "getter-throws" || (state === "ready" && names === 2)) throw marker;
        return state === "unresolved" ? Effect.succeed("later") : "new";
      },
    });
    Object.defineProperty(news, "network", {
      enumerable: true,
      get() {
        networks++;
        return undefined;
      },
    });
    const effect = provider.precreate(input(news, false));
    assert.equal(names, 0);
    const result = await Effect.runPromiseExit(effect);
    if (state === "shared") {
      assert.ok(Exit.isSuccess(result));
      assert.equal(names, 0);
      assert.equal(networks, 0);
    } else if (state === "unresolved") {
      assert.ok(Exit.isSuccess(result));
      assert.equal(names, 1);
      assert.equal(networks, 0);
    } else {
      assert.ok(Exit.isFailure(result));
      assert.equal(Cause.squash(result.cause), marker);
      assert.equal(names, state === "ready" ? 2 : 1);
    }
    cases++;
  }
  return cases;
}
let cases = 0;
try {
  if (mode === "order") {
    for (const state of corpus.states) {
      await check({ state, present: false, replay: true });
      cases++;
    }
  } else if (mode === "property") {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          state: fc.constantFrom(...corpus.states),
          present: fc.boolean(),
          replay: fc.boolean(),
          owns: fc.boolean(),
          label: fc.string({ maxLength: 32 }),
        }),
        async (value) => {
          await check(value);
          cases++;
        },
      ),
      { seed: corpus.seed, numRuns: corpus.runs },
    );
  } else if (mode === "precreate") cases = await precreate();
  else throw new Error("Unknown lifecycle guard mode");
  console.log(JSON.stringify({ name, mode, cases, passed: true }));
} finally {
  if (scratch) rmSync(scratch, { recursive: true, force: true });
}
