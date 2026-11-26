import { mock, test } from "bun:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import * as Effect from "effect/Effect";
import type { IamPolicy } from "../src/IamPolicy.vibe";

const require = createRequire(new URL("../../../scripts/package.json", import.meta.url));
const fc = require("fast-check");
let policy: IamPolicy;
let writes = 0;
let missing = false;
const sdk = await import("@distilled.cloud/gcp/cloudresourcemanager_v3");
mock.module("@distilled.cloud/gcp/cloudresourcemanager_v3", () => ({
  ...sdk,
  getIamPolicyProjects: (request: { resource: string }) =>
    Effect.suspend(() => {
      assert.equal(request.resource, "projects/test");
      return missing ? Effect.fail({ _tag: "NotFound" }) : Effect.succeed(structuredClone(policy));
    }),
  setIamPolicyProjects: (request: { resource: string; body: { policy: IamPolicy } }) =>
    Effect.sync(() => {
      assert.equal(request.resource, "projects/test");
      writes++;
      policy = structuredClone(request.body.policy);
      return policy;
    }),
}));
const { updateIamMembership, revokeIamMembership, projectRolesOf, hasIamMembership } =
  await import("../src/IamPolicy.vibe");
const run = <A>(value: Effect.Effect<A, unknown, unknown>) =>
  Effect.runPromise(value as Effect.Effect<A, unknown>);
const condition = { title: "test", expression: "true" };
const members = [
  "serviceAccount:member@example.invalid",
  "user:user@example.invalid",
  "group:team@example.invalid",
  "allUsers",
];
const member = fc.constantFrom(...members, "bare@example.invalid");
const principal = (value: string) =>
  value.includes(":") || value === "allUsers" ? value : "serviceAccount:" + value;
const roles = ["roles/viewer", "roles/editor", "roles/owner", "roles/custom.a", "roles/custom.b"];
const role = fc.constantFrom(...roles);
const bindings = fc.uniqueArray(
  fc.record({
    role,
    members: fc.uniqueArray(fc.constantFrom(...members), { minLength: 1, maxLength: 4 }),
    conditional: fc.boolean(),
  }),
  {
    selector: (binding: { role: string; conditional: boolean }) =>
      binding.role + binding.conditional,
    maxLength: 6,
  },
);

test("membership updates preserve unrelated grants and are idempotent", async () => {
  await fc.assert(
    fc.asyncProperty(
      bindings,
      member,
      fc.array(role),
      fc.array(role),
      async (
        input: Array<{ role: string; members: string[]; conditional: boolean }>,
        target: string,
        add: string[],
        remove: string[],
      ) => {
        missing = false;
        writes = 0;
        policy = {
          version: 3,
          etag: "etag",
          bindings: input.map(({ conditional, ...binding }) => ({
            ...binding,
            ...(conditional ? { condition } : {}),
          })),
        };
        const original = structuredClone(policy);
        const id = principal(target);
        const had = new Set(
          original
            .bindings!.filter((b) => !b.condition && b.members!.includes(id))
            .map((b) => b.role),
        );
        await run(
          updateIamMembership({ kind: "project", name: "test", member: target, add, remove }),
        );
        const wanted = new Set(
          roles.filter((r) => add.includes(r) || (!remove.includes(r) && had.has(r))),
        );
        assert.deepEqual(new Set(await run(projectRolesOf("test", target))), wanted);
        assert.deepEqual(
          policy.bindings!.filter((b) => b.condition),
          original.bindings!.filter((b) => b.condition),
        );
        assert.equal(policy.etag, original.etag);
        assert.equal(policy.version, original.version);
        for (const r of roles) {
          assert.equal(
            await run(hasIamMembership({ kind: "project", name: "test", member: target, role: r })),
            wanted.has(r),
          );
          const otherBefore = original
            .bindings!.filter((b) => b.role === r && !b.condition)
            .flatMap((b) => b.members!)
            .filter((m) => m !== id);
          const otherAfter = policy
            .bindings!.filter((b) => b.role === r && !b.condition)
            .flatMap((b) => b.members!)
            .filter((m) => m !== id);
          assert.deepEqual(otherAfter, otherBefore);
        }
        const beforeRepeat = writes;
        await run(
          updateIamMembership({ kind: "project", name: "test", member: target, add, remove }),
        );
        assert.equal(writes, beforeRepeat);
      },
    ),
    { numRuns: 200, seed: 73625 },
  );
});

test("conditional grants remain separate from unconditional membership", async () => {
  await fc.assert(
    fc.asyncProperty(member, role, async (target: string, role: string) => {
      missing = false;
      const id = principal(target);
      policy = {
        version: 3,
        etag: "etag",
        bindings: [
          { role, members: ["user:unrelated@example.invalid"], condition },
          { role, members: [id] },
        ],
      };
      await run(
        updateIamMembership({
          kind: "project",
          name: "test",
          member: target,
          add: [role],
          condition,
        }),
      );
      assert.deepEqual(policy.bindings!.find((b) => b.condition)!.members, [
        "user:unrelated@example.invalid",
        id,
      ]);
      await run(
        revokeIamMembership({
          kind: "project",
          name: "test",
          member: target,
          roles: [role],
          condition,
        }),
      );
      assert.deepEqual(policy.bindings!.find((b) => b.condition)!.members, [
        "user:unrelated@example.invalid",
      ]);
      assert.deepEqual(policy.bindings!.find((b) => !b.condition)!.members, [id]);
    }),
    { numRuns: 100, seed: 73626 },
  );
});

test("missing resources are absent for membership checks and revocation", async () => {
  await fc.assert(
    fc.asyncProperty(member, role, async (target: string, role: string) => {
      missing = true;
      try {
        assert.equal(
          await run(hasIamMembership({ kind: "project", name: "test", member: target, role })),
          false,
        );
        await run(
          revokeIamMembership({ kind: "project", name: "test", member: target, roles: [role] }),
        );
      } finally {
        missing = false;
      }
    }),
    { numRuns: 100, seed: 73627 },
  );
});
