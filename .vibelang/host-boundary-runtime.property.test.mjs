import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { join } from "node:path";
import { test } from "node:test";
import { pathToFileURL, fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(new URL("../packages/alchemy/package.json", import.meta.url));
const Effect = require("effect/Effect");
const Cause = require("effect/Cause");
const fc = createRequire(new URL("../scripts/package.json", import.meta.url))("fast-check");
const { generateInstanceId } = await import(
  pathToFileURL(join(root, "packages/alchemy/lib/InstanceId.js"))
);
const { md5 } = await import(pathToFileURL(join(root, "packages/alchemy/lib/Util/md5.js")));
const { writeFileAtomic } = await import(
  pathToFileURL(join(root, "packages/alchemy/lib/Util/AtomicFile.js"))
);

void test("instance IDs read fresh random bytes only when run and preserve host defects", async () => {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, "crypto");
  try {
    await fc.assert(
      fc.asyncProperty(fc.uint8Array({ minLength: 16, maxLength: 16 }), async (bytes) => {
        let calls = 0;
        Object.defineProperty(globalThis, "crypto", {
          configurable: true,
          value: {
            getRandomValues(target) {
              calls++;
              target.set(bytes);
              return target;
            },
          },
        });
        const program = generateInstanceId();
        assert.equal(calls, 0);
        const expected = Buffer.from(bytes).toString("hex");
        assert.equal(await Effect.runPromise(program), expected);
        assert.equal(await Effect.runPromise(program), expected);
        assert.equal(calls, 2);
      }),
      { seed: 33121, numRuns: 128 },
    );
    const sentinel = new Error("random source failed");
    Object.defineProperty(globalThis, "crypto", {
      configurable: true,
      value: {
        getRandomValues() {
          throw sentinel;
        },
      },
    });
    const failed = await Effect.runPromiseExit(generateInstanceId());
    assert.equal(failed._tag, "Failure");
    assert.equal(Cause.squash(failed.cause), sentinel);
  } finally {
    if (descriptor) Object.defineProperty(globalThis, "crypto", descriptor);
    else delete globalThis.crypto;
  }
});

void test("MD5 matches the host digest for generated strings and byte arrays", async () => {
  await fc.assert(
    fc.asyncProperty(fc.oneof(fc.string(), fc.uint8Array()), async (input) => {
      const expected = createHash("md5").update(input).digest("hex");
      const program = md5(input);
      assert.equal(await Effect.runPromise(program), expected);
      assert.equal(await Effect.runPromise(program), expected);
    }),
    { seed: 33122, numRuns: 128 },
  );
});

void test("atomic writes stay cold, preserve operation order and clean up typed failures", async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.string(),
      fc.string(),
      fc.option(fc.integer({ min: 0, max: 511 }), { nil: undefined }),
      fc.constantFrom("ok", "write", "chmod", "rename"),
      async (file, contents, mode, failure) => {
        const events = [];
        const error = { _tag: "PlatformError", operation: failure };
        const fs = {
          writeFileString: (path, text) =>
            Effect.suspend(() => {
              events.push(["write", path, text]);
              return failure === "write" ? Effect.fail(error) : Effect.void;
            }),
          chmod: (path, bits) =>
            Effect.suspend(() => {
              events.push(["chmod", path, bits]);
              return failure === "chmod" ? Effect.fail(error) : Effect.void;
            }),
          rename: (from, to) =>
            Effect.suspend(() => {
              events.push(["rename", from, to]);
              return failure === "rename" ? Effect.fail(error) : Effect.void;
            }),
          remove: (path) =>
            Effect.sync(() => {
              events.push(["remove", path]);
            }),
        };
        const program = writeFileAtomic(fs, file, contents, mode);
        assert.equal(events.length, 0);
        const result = await Effect.runPromiseExit(program);
        const failed =
          failure === "write" ||
          failure === "rename" ||
          (failure === "chmod" && mode !== undefined);
        assert.equal(result._tag, failed ? "Failure" : "Success");
        const temporary = events[0][1];
        assert.ok(temporary.startsWith(file + "."));
        assert.ok(temporary.endsWith(".tmp"));
        assert.deepEqual(events[0], ["write", temporary, contents]);
        const expected = ["write"];
        if (failure !== "write") {
          if (mode !== undefined) expected.push("chmod");
          if (failure !== "chmod" || mode === undefined) expected.push("rename");
        }
        if (failed) expected.push("remove");
        assert.deepEqual(
          events.map((entry) => entry[0]),
          expected,
        );
        if (mode !== undefined && failure !== "write")
          assert.deepEqual(events[1], ["chmod", temporary, mode]);
        if (expected.includes("rename"))
          assert.deepEqual(
            events.find((entry) => entry[0] === "rename"),
            ["rename", temporary, file],
          );
      },
    ),
    { seed: 33123, numRuns: 128 },
  );
});
