import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import * as Provider from "../../packages/alchemy/src/Provider.ts";
const require = createRequire(new URL("../../packages/neon/package.json", import.meta.url));
const fc = createRequire(new URL("../../scripts/package.json", import.meta.url))("fast-check");
const Effect = await import(pathToFileURL(require.resolve("effect/Effect")).href);
const Exit = await import(pathToFileURL(require.resolve("effect/Exit")).href);
const Cause = await import(pathToFileURL(require.resolve("effect/Cause")).href);
const [name, mode] = process.argv.slice(2);
const modules = {
  Auth: () => import("../../packages/neon/src/Auth.vibe"),
  CustomDomain: () => import("../../packages/neon/src/CustomDomain.vibe"),
  FunctionTrigger: () => import("../../packages/neon/src/FunctionTrigger.vibe"),
  ProjectVPCEndpoint: () => import("../../packages/neon/src/ProjectVPCEndpoint.vibe"),
  Role: () => import("../../packages/neon/src/Role.vibe"),
};
assert.ok(Object.hasOwn(modules, name));
const module = await modules[name]();
const corpus = JSON.parse(
  readFileSync(new URL("./alchemy-neon-foreign-guard.json", import.meta.url), "utf8"),
);
const provider =
  name === "Auth"
    ? null
    : await Effect.runPromise(
        Provider.findProvider(module[name]).pipe(Effect.provide(module[name + "Provider"]())),
      );
const output = {
  projectId: "old",
  branchId: "branch",
  roleName: "old",
  noLogin: false,
  hostname: "old.example",
  type: "old",
  orgId: "org",
  regionId: "region",
  vpcEndpointId: "endpoint",
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
async function check({ state, present = true, replay = false, label = "input" }) {
  const marker = new Error("Neon input getter");
  let reads = 0;
  const base =
    name === "ProjectVPCEndpoint"
      ? { projectId: "new" }
      : name === "Role"
        ? { branch: { projectId: "new", branchId: "branch" }, name: "new" }
        : {
            hostname: "new.example",
            type: "new",
            function: { projectId: "new", branchId: "branch", slug: "new" },
          };
  Object.defineProperty(base, "probe", {
    enumerable: true,
    get() {
      reads++;
      if (state === "getter-throws") throw marker;
      return state === "unresolved" ? Effect.succeed(label) : label;
    },
  });
  const guarded =
    state === "proxy-throws"
      ? new Proxy(base, {
          ownKeys() {
            reads++;
            throw marker;
          },
        })
      : base;
  const news =
    name === "ProjectVPCEndpoint"
      ? {
          project: guarded,
          endpoint: { orgId: "org", regionId: "region", vpcEndpointId: "endpoint" },
          label,
        }
      : guarded;
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
      const expected =
        name === "ProjectVPCEndpoint" || (present && state === "resolved")
          ? { action: "replace", deleteFirst: name === "Role" ? false : true }
          : undefined;
      assert.deepEqual(result.value, expected);
    }
  }
}
async function checkAuth({ state, replay = false, label = "project" }) {
  const marker = new Error("Neon branch getter");
  let reads = 0;
  const branch = { branchId: "branch" };
  Object.defineProperty(branch, "projectId", {
    enumerable: true,
    get() {
      reads++;
      if (state === "getter-throws") throw marker;
      return state === "unresolved" ? Effect.succeed(label) : label;
    },
  });
  const program = module.authPlanScope({ branch });
  assert.equal(reads, 0);
  for (let n = 1; n <= (replay ? 2 : 1); n++) {
    const result = await Effect.runPromiseExit(program);
    assert.equal(reads, n * (state === "resolved" ? 2 : 1));
    if (state === "getter-throws") {
      assert.ok(Exit.isFailure(result));
      assert.equal(Cause.squash(result.cause), marker);
    } else {
      assert.ok(Exit.isSuccess(result));
      assert.deepEqual(
        result.value,
        state === "unresolved" ? undefined : { projectId: label, branchId: "branch" },
      );
    }
  }
}
let cases = 0;
if (mode === "order") {
  if (name === "Auth") {
    for (const state of ["resolved", "unresolved", "getter-throws"]) {
      await checkAuth({ state, replay: true });
      cases++;
    }
    const error = await Effect.runPromise(
      Effect.flip(module.authPlanScope({ branch: {}, project: {} })),
    );
    assert.equal(error._tag, "InvalidBranchScope");
    cases++;
  } else {
    for (const state of corpus.states) {
      await check({ state, present: name === "ProjectVPCEndpoint", replay: true });
      cases++;
    }
  }
} else if (mode === "property") {
  const states = name === "Auth" ? ["resolved", "unresolved", "getter-throws"] : corpus.states;
  await fc.assert(
    fc.asyncProperty(
      fc.record({
        state: fc.constantFrom(...states),
        present: name === "ProjectVPCEndpoint" ? fc.constant(true) : fc.boolean(),
        replay: fc.boolean(),
        label: fc.string({ minLength: 1, maxLength: 32 }),
      }),
      async (value) => {
        await (name === "Auth" ? checkAuth(value) : check(value));
        cases++;
      },
    ),
    { seed: corpus.seed, numRuns: corpus.runs },
  );
} else throw new Error("Unknown probe mode: " + mode);
console.log(JSON.stringify({ name, mode, cases, passed: true }));
