import assert from "node:assert/strict";
import { readFileSync, mkdtempSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { AlchemyContext } from "alchemy/AlchemyContext";
import * as Provider from "alchemy/Provider";
import { Stack } from "alchemy/Stack";
const require = createRequire(new URL("../../packages/railway/package.json", import.meta.url));
const coreRequire = createRequire(new URL("../../packages/alchemy/package.json", import.meta.url));
const fc = createRequire(new URL("../../scripts/package.json", import.meta.url))("fast-check");
const Effect = await import(pathToFileURL(require.resolve("effect/Effect")).href);
const Cause = await import(pathToFileURL(require.resolve("effect/Cause")).href);
const Exit = await import(pathToFileURL(require.resolve("effect/Exit")).href);
const [name, mode] = process.argv.slice(2);
const loads = {
  CloudAgent: () => import("../../packages/railway/src/CloudAgent.vibe"),
  CustomDomain: () => import("../../packages/railway/src/CustomDomain.vibe"),
  Group: () => import("../../packages/railway/src/Group.vibe"),
  ProjectEnvironment: () => import("../../packages/railway/src/ProjectEnvironment.vibe"),
  SandboxCheckpoint: () => import("../../packages/railway/src/SandboxCheckpoint.vibe"),
  ServiceProvider: () => import("../../packages/railway/src/ServiceProvider.vibe"),
  TcpProxy: () => import("../../packages/railway/src/TcpProxy.vibe"),
  "Website/Cdn": () => import("../../packages/railway/src/Website/Cdn.vibe"),
};
assert.ok(Object.hasOwn(loads, name));
const module = await loads[name]();
let provider;
let scratch;
if (name === "ServiceProvider") {
  scratch = mkdtempSync(join(tmpdir(), "railway-guard-"));
  const { Service } = await import(
    pathToFileURL(require.resolve("@alchemy.run/railway/Service")).href
  );
  const NodeServices = await import(
    pathToFileURL(coreRequire.resolve("@effect/platform-node/NodeServices")).href
  );
  provider = await Effect.runPromise(
    Provider.findProvider(Service).pipe(
      Effect.provide(module.ServiceProvider()),
      Effect.provideService(Stack, { name: "guard", stage: "test" }),
      Effect.provideService(AlchemyContext, { dotAlchemy: scratch, dev: false, adopt: false }),
      Effect.provide(NodeServices.layer),
    ),
  );
} else {
  const resource =
    name === "ProjectEnvironment" ? "Environment" : name === "Website/Cdn" ? "Cdn" : name;
  provider = await Effect.runPromise(
    Provider.findProvider(module[resource]).pipe(Effect.provide(module[resource + "Provider"]())),
  );
}
const corpus = JSON.parse(
  readFileSync(new URL("./alchemy-railway-foreign-guard.json", import.meta.url), "utf8"),
);
const output = {
  projectId: "old",
  environmentId: "old",
  serviceId: "old",
  sandboxId: "old",
  name: "old",
  domain: "old.example",
  applicationPort: 80,
};
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
  const marker = new Error("Railway input getter");
  let reads = 0;
  const base = {
    project: { projectId: "new" },
    environment: { environmentId: "new" },
    service: { serviceId: "new" },
    sandbox: { sandboxId: "new", environmentId: "new" },
    name: "new",
    domain: "new.example",
    applicationPort: 81,
  };
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
  assert.equal(reads, 0);
  for (let n = 1; n <= (replay ? 2 : 1); n++) {
    const result = await Effect.runPromiseExit(program);
    assert.equal(reads, n);
    if (state.endsWith("throws")) {
      assert.ok(Exit.isFailure(result));
      assert.equal(Cause.squash(result.cause), marker);
    } else {
      assert.ok(Exit.isSuccess(result));
      const ready = present && (state === "resolved" || name === "ServiceProvider");
      const expected = ready
        ? name === "Website/Cdn"
          ? { action: "replace", deleteFirst: true }
          : name === "CustomDomain" || name === "SandboxCheckpoint"
            ? { action: "replace", deleteFirst: false }
            : { action: "replace" }
        : undefined;
      assert.deepEqual(result.value, expected);
    }
  }
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
          label: fc.string({ maxLength: 32 }),
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
} finally {
  if (scratch) rmSync(scratch, { recursive: true, force: true });
}
